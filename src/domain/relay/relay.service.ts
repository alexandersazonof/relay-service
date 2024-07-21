import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AbiItem, Contract, Transaction, utils } from 'web3';
import { Web3Service } from '../../domain/web3/web3.service';
import { abiHero, abiRelay } from './constants';
import { CallFromDelegatorDto } from './dto/call-from-delegator.dto';
import { CallFromOperatorDto } from './dto/call-from-operator.dto';
import { secp256k1 } from '@noble/curves/secp256k1';
import { bytesToHex } from 'web3-utils';
import { ChainEnum } from '../web3/constants/chain.enum';
import { ContractAddresses, ContractEnum } from './constants/contract-address';
import { LocalStorage } from 'node-localstorage';

@Injectable()
export class RelayService {
  public sacraRelayContract: Contract<AbiItem[]>;
  public sacraHeroContract: Contract<AbiItem[]>;
  public testContract: Contract<AbiItem[]>;

  private readonly storage = new LocalStorage('./storage');
  private nonce = this.storage.getItem('nonce') ?? 0;

  constructor(
    private readonly configService: ConfigService,
    public readonly web3Service: Web3Service,
  ) {}

  private initializeContracts(chain: ChainEnum) {
    this.sacraHeroContract = new (this.web3Service.get(chain).instance.eth.Contract)(
      abiHero,
      ContractAddresses[chain][ContractEnum.Hero],
    );

    this.sacraRelayContract = new (this.web3Service.get(chain).instance.eth.Contract)(
      abiRelay,
      ContractAddresses[chain][ContractEnum.Relay],
    );
  }

  public checkAllowedContractAddressWrapper(address: string, chain: ChainEnum): boolean {
    return this.checkAllowedContractAddress(address, chain);
  }

  private checkAllowedContractAddress(address: string, chain: ChainEnum) {
    const contracts = Object.values<string>(ContractAddresses[chain]);
    const isKnownContactAddress = contracts.includes(address);
    if (!isKnownContactAddress) {
      throw new InternalServerErrorException(`Contract address ${address} not allowed`);
    }
    return true;
  }

  async getHashedMessage(callInfo: CallFromOperatorDto, chain: ChainEnum) {
    this.initializeContracts(chain);

    const CALL_ERC2771_TYPEHASH: string = await this.sacraRelayContract.methods
      .CALL_ERC2771_TYPEHASH()
      .call();
    const DOMAIN_SEPARATOR: string = await this.sacraRelayContract.methods
      .DOMAIN_SEPARATOR()
      .call();

    const encodedParameters = this.web3Service
      .get(chain)
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
      value: encodedParameters,
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
    const signatureSigned = secp256k1.sign(hashMessage, privateKeyUint8Array); // sign
    const signatureBytes = signatureSigned.toCompactRawBytes();
    const r = (signatureSigned.recovery + 27).toString(16);

    return `${bytesToHex(signatureBytes)}${r}`;
  }

  private async signCallWithERC2771(
    callInfo: CallFromOperatorDto,
    privateKey: string,
    chain: ChainEnum,
  ) {
    const { hashedMessage } = await this.getHashedMessage(callInfo, chain);
    const messageHexWithoutPrefix = hashedMessage.substring(2);

    const privateKeyUint8Array = this.web3Service
      .get(chain)
      .instance.eth.accounts.parseAndValidatePrivateKey(privateKey);

    return this.createSignatureManually(messageHexWithoutPrefix, privateKeyUint8Array);
  }

  async callFromDelegator(callFromDelegatorDto: CallFromDelegatorDto, chain: ChainEnum) {
    this.initializeContracts(chain);

    this.checkAllowedContractAddress(callFromDelegatorDto.target, chain);

    const callInfo = {
      chainId: 250,
      target: callFromDelegatorDto.target,
      data: callFromDelegatorDto.data,
      user: callFromDelegatorDto.fromAddress,
      userNonce: 1,
      userDeadline: 0,
    };

    const transactionData = this.sacraRelayContract.methods.callFromDelegator(callInfo).encodeABI();
    const gas = await this.web3Service.get(chain).instance.eth.estimateGas({
      from: this.web3Service.masterAccountAddress,
      to: ContractAddresses[chain][ContractEnum.Relay],
      data: transactionData,
    });

    const gasPrice = await this.web3Service.get(chain).instance.eth.getGasPrice();
    const tx = {
      from: this.web3Service.masterAccountAddress,
      to: ContractAddresses[chain][ContractEnum.Relay],
      gas: gas,
      gasPrice: gasPrice,
      data: transactionData,
    };

    const signedTx = await this.web3Service
      .get(chain)
      .instance.eth.accounts.signTransaction(tx, this.web3Service.masterAccountPrivateKey);
    if (!signedTx.rawTransaction) {
      throw new InternalServerErrorException(`Signing failed`);
    }

    await this.web3Service.get(chain).instance.eth.sendSignedTransaction(signedTx.rawTransaction);
    return { success: true };
  }

  async callFromOperator(callFromOperatorDto: CallFromOperatorDto, chain: ChainEnum) {
    this.initializeContracts(chain);

    this.checkAllowedContractAddress(callFromOperatorDto.target, chain);

    const callInfo = {
      chainId: callFromOperatorDto.chainId,
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
      to: ContractAddresses[chain][ContractEnum.Relay],
      data: txData,
      nonce: this.nonce,
    };

    this.nonce++;
    this.storage.setItem('nonce', this.nonce.toString());

    const txHash = await this.web3Service
      .get(chain)
      .instance.eth.sendTransaction({
        ...tx,
      })
      .catch((error) => error);

    return txHash;
  }

  async userCallFromOperator(
    callFromOperatorDto: CallFromOperatorDto,
    chain: ChainEnum,
    userPrivateKey: string = this.web3Service.masterAccountPrivateKey,
  ) {
    const signature = await this.signCallWithERC2771(callFromOperatorDto, userPrivateKey, chain);

    const result = await this.callFromOperator(
      {
        chainId: callFromOperatorDto.chainId,

        fromAddress: this.web3Service.masterAccountAddress,

        target: callFromOperatorDto.target,
        data: callFromOperatorDto.data,

        userNonce: callFromOperatorDto.userNonce,
        userDeadline: callFromOperatorDto.userDeadline,

        signature: signature,
      },
      chain,
    ).catch((error) => error);

    return result;
  }
}
