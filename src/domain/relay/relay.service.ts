import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AbiItem, Contract, Transaction, utils } from 'web3';
import { Web3Service } from '../../domain/web3/web3.service';
import { abiHero, abiRelay, ContractAddress } from './constants';
import { CallFromDelegatorDto } from './dto/call-from-delegator.dto';
import { CallFromOperatorDto } from './dto/call-from-operator.dto';
import { secp256k1 } from 'ethereum-cryptography/secp256k1.js';
import { bytesToHex } from 'web3-utils';
import { ChainEnum } from '../web3/constants/chain.enum';

@Injectable()
export class RelayService {
  public sacraRelayContract: Contract<AbiItem[]>;
  public sacraHeroContract: Contract<AbiItem[]>;
  public testContract: Contract<AbiItem[]>;

  constructor(
    private readonly configService: ConfigService,
    public readonly web3Service: Web3Service,
  ) {
    this.sacraHeroContract = new (this.web3Service.get(ChainEnum.Fantom).instance.eth.Contract)(
      abiHero,
      ContractAddress.Hero,
    );

    this.sacraRelayContract = new (this.web3Service.get(ChainEnum.Fantom).instance.eth.Contract)(
      abiRelay,
      ContractAddress.Relay,
    );

    // (async () => {
    //   const CALL_ERC2771_TYPEHASH: string = await this.sacraRelayContract.methods
    //     .CALL_ERC2771_TYPEHASH()
    //     .call();

    //   console.log(CALL_ERC2771_TYPEHASH);
    // })();
  }

  public checkAllowedContractAddressWrapper(address: string): boolean {
    return this.checkAllowedContractAddress(address);
  }

  private checkAllowedContractAddress(address: string) {
    const contracts = Object.values<string>(ContractAddress);
    const isKnownContactAddress = contracts.includes(address);
    if (!isKnownContactAddress) {
      throw new InternalServerErrorException(`Contract address ${address} not allowed`);
    }
    return true;
  }

  async getHashedMessage(callInfo: CallFromOperatorDto) {
    const CALL_ERC2771_TYPEHASH: string = await this.sacraRelayContract.methods
      .CALL_ERC2771_TYPEHASH()
      .call();
    const DOMAIN_SEPARATOR: string = await this.sacraRelayContract.methods
      .DOMAIN_SEPARATOR()
      .call();

    const encodedParametrs = this.web3Service
      .get(ChainEnum.Fantom)
      .instance.eth.abi.encodeParameters(
        ['bytes32', 'uint256', 'address', 'bytes32', 'address', 'uint256', 'uint256'],
        [
          CALL_ERC2771_TYPEHASH,
          callInfo.chainId,
          callInfo.target,
          utils.soliditySha3({ type: 'bytes', value: callInfo.data }),
          callInfo.fromAddress,
          callInfo.userNonce,
          callInfo.userDeadline,
        ],
      );

    const message = utils.soliditySha3({
      type: 'bytes',
      value: encodedParametrs,
    });

    const encodedMessage = utils.encodePacked(
      { type: 'bytes', value: ['0x19', '0x01'] },
      {
        type: 'bytes',
        value: DOMAIN_SEPARATOR,
      },
      {
        type: 'bytes',
        value: message,
      },
    );

    const hashedMessage = utils.soliditySha3({
      type: 'bytes',
      value: encodedMessage,
    });

    return { hashedMessage, message };
  }

  private async createSignatureManually(hashMessage: string, privateKeyUint8Array: Uint8Array) {
    const signatureSigned = secp256k1.sign(hashMessage, privateKeyUint8Array);
    const signatureBytes = signatureSigned.toCompactRawBytes();
    const r = (signatureSigned.recovery + 27).toString(16);

    return `${bytesToHex(signatureBytes)}${r}`;
  }

  private async signCallWithERC2771(callInfo: CallFromOperatorDto, privateKey: string) {
    const { hashedMessage } = await this.getHashedMessage(callInfo);
    const messageHexWithoutPrefix = hashedMessage.substring(2);

    const privateKeyUint8Array = this.web3Service
      .get(ChainEnum.Fantom)
      .instance.eth.accounts.parseAndValidatePrivateKey(privateKey);

    return this.createSignatureManually(messageHexWithoutPrefix, privateKeyUint8Array);
  }

  async callFromDelegator(callFromDelegatorDto: CallFromDelegatorDto) {
    this.checkAllowedContractAddress(callFromDelegatorDto.target);

    const callInfo = {
      chainId: 250,
      target: callFromDelegatorDto.target,
      data: callFromDelegatorDto.data,
      user: callFromDelegatorDto.fromAddress,
      userNonce: 1,
      userDeadline: 0,
    };

    const transactionData = this.sacraRelayContract.methods.callFromDelegator(callInfo).encodeABI();
    const gas = await this.web3Service.get(ChainEnum.Fantom).instance.eth.estimateGas({
      from: this.web3Service.masterAccountAddress,
      to: ContractAddress.Relay,
      data: transactionData,
    });

    const gasPrice = await this.web3Service.get(ChainEnum.Fantom).instance.eth.getGasPrice();
    const tx = {
      from: this.web3Service.masterAccountAddress,
      to: ContractAddress.Relay,
      gas: gas,
      gasPrice: gasPrice,
      data: transactionData,
    };

    const signedTx = await this.web3Service
      .get(ChainEnum.Fantom)
      .instance.eth.accounts.signTransaction(tx, this.web3Service.masterAccountPrivateKey);
    if (!signedTx.rawTransaction) {
      throw new InternalServerErrorException(`Signing failed`);
    }

    await this.web3Service
      .get(ChainEnum.Fantom)
      .instance.eth.sendSignedTransaction(signedTx.rawTransaction);
    return { success: true };
  }

  async callFromOperator(callFromOperatorDto: CallFromOperatorDto) {
    this.checkAllowedContractAddress(callFromOperatorDto.target);

    const callInfo = {
      chainId: 250,
      target: callFromOperatorDto.target,
      data: callFromOperatorDto.data,
      user: callFromOperatorDto.fromAddress,
      userNonce: 0,
      userDeadline: 0,
    };

    console.log('[callInfo, signature]', callInfo, callFromOperatorDto.signature);

    const txData = this.sacraRelayContract.methods
      .callFromOperator(callInfo, callFromOperatorDto.signature)
      .encodeABI();

    const tx: Transaction = {
      from: this.web3Service.masterAccountAddress,
      to: ContractAddress.Relay,
      data: txData,
    };

    const txHash = await this.web3Service
      .get(ChainEnum.Fantom)
      .instance.eth.sendTransaction({
        ...tx,
      })
      .catch((error) => error);

    return txHash;
  }

  async userCallFromOperator(
    callFromOperatorDto: CallFromOperatorDto,
    userPrivateKey: string = this.web3Service.masterAccountPrivateKey,
  ) {
    const signature = await this.signCallWithERC2771(callFromOperatorDto, userPrivateKey);

    const result = await this.callFromOperator({
      chainId: callFromOperatorDto.chainId,

      fromAddress: this.web3Service.masterAccountAddress,

      target: callFromOperatorDto.target,
      data: callFromOperatorDto.data,

      userNonce: callFromOperatorDto.userNonce,
      userDeadline: callFromOperatorDto.userDeadline,

      signature: signature,
    }).catch((error) => error);

    return result;
  }
}

// async create() {
//   try {
//     const gas = await this.web3Service.instance.eth.estimateGas({
//       from: '0x66cb9d55dfe4530d26c2cd060eb2ecb66a5c51a4',
//       to: ContractAddress.Hero,
//       data: this.sacraHeroContract.methods
//         .create('0x5b169bfd148175ba0bb1259b75978a847c75fe5b', 'test-name', false)
//         .encodeABI(),
//     });

//     const tx = {
//       from: '0x66cb9d55dfe4530d26c2cd060eb2ecb66a5c51a4',
//       to: ContractAddress.Hero,
//       gas: gas,
//       gasPrice: await this.web3Service.instance.eth.getGasPrice(),
//       data: this.sacraHeroContract.methods
//         .create('0x5b169bfd148175ba0bb1259b75978a847c75fe5b', 'test-name', false)
//         .encodeABI(),
//     };
//     const signedTx = await this.web3Service.instance.eth.accounts.signTransaction(
//       tx,
//       '455a3303a58926b697225f13b64ccddcc3d79fe3f24c4c20c3163107ece680ed',
//     );
//     if (signedTx.rawTransaction) {
//       const receipt = await this.web3Service.instance.eth.sendSignedTransaction(
//         signedTx.rawTransaction,
//       );
//       console.log(receipt);
//       return { success: true };
//     } else {
//       throw new InternalServerErrorException({ success: false, message: 'Signing failed' });
//     }
//   } catch (e) {
//     console.log(e);
//     throw new InternalServerErrorException({ success: false, message: e });
//   }
// }

// new this.web3Service.instance.eth.abi.encode
// const createHeroData = {
//   address: '0x5b169bfd148175ba0bb1259b75978a847c75fe5b',
//   name: 'RandomHeroName' + Math.floor(Math.random() * 1000),
//   options: false,
// };

// const createHeroEncoded = this.sacraHeroContract.methods
//   .create(createHeroData.address, createHeroData.name, createHeroData.options)
//   .encodeABI();

// const callInfo: ICallWithERC2771 = {
//   chainId: 250,
//   target: ContractAddress.Hero,
//   data: createHeroEncoded,
//   user: this.web3Service.masterAccountAddress,
//   userNonce: 0,
//   userDeadline: 0,
// };
