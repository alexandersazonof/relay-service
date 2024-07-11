import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AbiItem, Contract, Transaction } from 'web3';
import { AbiErrorFragment } from 'web3-types/src/eth_abi_types';
import { keccak256 } from 'js-sha3';
import { Web3Service } from 'src/domain/web3/web3.service';
import { abiErrors, abiHero, abiRelay, ContractAddress } from './constants';
import { CallFromDelegatorDto } from './dto/call-from-delegator.dto';
import { GetContractErrorNameDto } from './dto/get-contract-error-name.dto';
import { CallFromOperatorDto } from './dto/call-from-operator.dto';
import { IContractErrorData } from './interfaces/contract-error-data.interface';
import { secp256k1 } from 'ethereum-cryptography/secp256k1.js';
import { bytesToHex } from 'web3-utils';

interface ICallWithERC2771 {
  chainId: number;
  target: string;
  data: string;
  user: string;
  userNonce: number;
  userDeadline: number;
}

@Injectable()
export class RelayService {
  public readonly sacraRelayContract: Contract<AbiItem[]>;
  public readonly sacraHeroContract: Contract<AbiItem[]>;

  constructor(
    private readonly configService: ConfigService,
    private readonly web3Service: Web3Service,
  ) {
    this.sacraHeroContract = new this.web3Service.instance.eth.Contract(
      abiHero,
      ContractAddress.Hero,
    );

    this.sacraRelayContract = new this.web3Service.instance.eth.Contract(
      abiRelay,
      ContractAddress.Relay,
    );
  }

  private async CALL_ERC2771_TYPEHASH(): Promise<string> {
    return await this.sacraRelayContract.methods.CALL_ERC2771_TYPEHASH().call();
  }

  private async DOMAIN_SEPARATOR(): Promise<string> {
    return await this.sacraRelayContract.methods.DOMAIN_SEPARATOR().call();
  }

  async getHashedMessage(callInfo: ICallWithERC2771) {
    const CALL_ERC2771_TYPEHASH = await this.CALL_ERC2771_TYPEHASH();
    const DOMAIN_SEPARATOR = await this.DOMAIN_SEPARATOR();

    const encodedParametrs = this.web3Service.instance.eth.abi.encodeParameters(
      ['bytes32', 'uint256', 'address', 'bytes32', 'address', 'uint256', 'uint256'],
      [
        CALL_ERC2771_TYPEHASH,
        callInfo.chainId,
        callInfo.target,
        this.web3Service.instance.utils.soliditySha3({ type: 'bytes', value: callInfo.data }),
        callInfo.user,
        callInfo.userNonce,
        callInfo.userDeadline,
      ],
    );

    const message = this.web3Service.instance.utils.soliditySha3({
      type: 'bytes',
      value: encodedParametrs,
    });

    const encodedMessage = this.web3Service.instance.utils.encodePacked(
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

    const hashedMessage = this.web3Service.instance.utils.soliditySha3({
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

  private async signCallWithERC2771(callInfo: ICallWithERC2771, privateKey: string) {
    const { hashedMessage } = await this.getHashedMessage(callInfo);
    const messageHexWithoutPrefix = hashedMessage.substring(2);

    const privateKeyUint8Array =
      this.web3Service.instance.eth.accounts.parseAndValidatePrivateKey(privateKey);

    return this.createSignatureManually(messageHexWithoutPrefix, privateKeyUint8Array);
  }

  async getContractErrorNameByHex(getContractErrorNameDto: GetContractErrorNameDto) {
    const errors = abiErrors
      .map((abiError) => {
        if (!abiError.inputs) return null;
        const result: IContractErrorData = {};

        const joinedInputTypes = abiError.inputs.map((input: any) => input.type).join(',');
        const signature = `${abiError.name}(${joinedInputTypes})`;
        const hash = '0x' + keccak256(signature).substring(0, 8);

        if (hash !== getContractErrorNameDto.code.substring(0, 10)) return null;
        result.error = abiError.name;

        if (getContractErrorNameDto.code.length > 10) return null;
        result.decoded = this.web3Service.instance.eth.abi.decodeParameters(
          abiError.inputs as AbiErrorFragment[],
          getContractErrorNameDto.code.slice(10),
        );

        return result;
      })
      .filter(Boolean) as IContractErrorData[];

    return { data: errors };
  }

  async callFromDelegator(callFromDelegatorDto: CallFromDelegatorDto) {
    this.checkKnownContractAddress(callFromDelegatorDto.target);

    const callInfo = {
      chainId: 250,
      target: callFromDelegatorDto.target,
      data: callFromDelegatorDto.data,
      user: callFromDelegatorDto.fromAddress,
      userNonce: 1,
      userDeadline: 0,
    };

    const transactionData = this.sacraRelayContract.methods.callFromDelegator(callInfo).encodeABI();
    const gas = await this.web3Service.instance.eth.estimateGas({
      from: this.web3Service.masterAccountAddress,
      to: ContractAddress.Relay,
      data: transactionData,
    });

    const gasPrice = await this.web3Service.instance.eth.getGasPrice();
    const tx = {
      from: this.web3Service.masterAccountAddress,
      to: ContractAddress.Relay,
      gas: gas,
      gasPrice: gasPrice,
      data: transactionData,
    };

    const signedTx = await this.web3Service.instance.eth.accounts.signTransaction(
      tx,
      this.web3Service.masterAccountPrivateKey,
    );
    if (!signedTx.rawTransaction) {
      throw new InternalServerErrorException(`Signing failed`);
    }

    await this.web3Service.instance.eth.sendSignedTransaction(signedTx.rawTransaction);
    return { success: true };
  }

  async callFromOperator(callFromOperatorDto: CallFromOperatorDto) {
    this.checkKnownContractAddress(callFromOperatorDto.target);

    const callInfo = {
      chainId: 250,
      target: callFromOperatorDto.target,
      data: callFromOperatorDto.data,
      user: callFromOperatorDto.fromAddress,
      userNonce: 0,
      userDeadline: 0,
    };

    console.log('[callInfo, signature]', callInfo, callFromOperatorDto.signature);

    // const txData = this.sacraRelayContract.methods
    //   .callFromOperator(callInfo, callFromOperatorDto.signature)
    //   .encodeABI();

    // const tx: Transaction = {
    //   from: this.web3Service.masterAccountAddress,
    //   to: ContractAddress.Relay,
    //   data: txData,
    // };

    // const gasPrice = await this.web3Service.instance.eth.getGasPrice();
    // const gas = await this.web3Service.instance.eth.estimateGas(tx).catch((error) => {
    //   console.log(error);
    //   return '100000';
    // });

    // const txHash = await this.web3Service.instance.eth
    //   .sendTransaction({
    //     ...tx,
    //     // gasPrice,
    //     // gas,
    //   })
    //   .catch((error) => error);

    // return txHash;
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

  async testCallFromOperator(userPrivateKey: string = this.web3Service.masterAccountPrivateKey) {
    const createHeroData = {
      address: '0x5b169bfd148175ba0bb1259b75978a847c75fe5b',
      name: 'RandomHeroName' + Math.floor(Math.random() * 1000),
      options: false,
    };

    const createHeroEncoded = this.sacraHeroContract.methods
      .create(createHeroData.address, createHeroData.name, createHeroData.options)
      .encodeABI();

    const callInfo: ICallWithERC2771 = {
      chainId: 250,
      target: ContractAddress.Hero,
      data: createHeroEncoded,
      user: this.web3Service.masterAccountAddress,
      userNonce: 0,
      userDeadline: 0,
    };

    const signature = await this.signCallWithERC2771(callInfo, userPrivateKey);

    const result = await this.callFromOperator({
      fromAddress: callInfo.user,
      target: callInfo.target,
      data: callInfo.data,
      signature: signature,
    }).catch((error) => error);

    return result;
  }

  private checkKnownContractAddress(address: string) {
    const contracts = Object.values<string>(ContractAddress);
    const isKnownContactAddress = contracts.includes(address);
    if (!isKnownContactAddress) {
      throw new InternalServerErrorException(`Contract address ${address} not allowed`);
    }
  }
}
