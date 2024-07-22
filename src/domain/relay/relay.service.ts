import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { eth, Transaction, utils } from 'web3';
import { Web3Service } from '../web3/web3.service';
import { CallFromDelegatorDto } from './dto/call-from-delegator.dto';
import { CallFromOperatorDto } from './dto/call-from-operator.dto';
import { secp256k1 } from '@noble/curves/secp256k1';
import { bytesToHex } from 'web3-utils';
import { LocalStorage } from 'node-localstorage';

@Injectable()
export class RelayService {
  private readonly storage = new LocalStorage('./storage');
  private nonce = Number(this.storage.getItem('nonce'));

  constructor(public readonly web3Service: Web3Service) {}

  async callFromDelegator(callFromDelegatorDto: CallFromDelegatorDto) {
    const chain = this.web3Service.getProvider(callFromDelegatorDto.chainId);
    const sacraRelayContract = this.getSacraRelayContract(callFromDelegatorDto.chainId);

    this.checkAllowedContractAddress(callFromDelegatorDto.chainId, callFromDelegatorDto.target);

    const callInfo = {
      chainId: callFromDelegatorDto.chainId,
      target: callFromDelegatorDto.target,
      data: callFromDelegatorDto.data,
      user: callFromDelegatorDto.fromAddress,
      userNonce: 1,
      userDeadline: 0,
    };

    const transactionDataABI = sacraRelayContract.methods.callFromDelegator(callInfo).encodeABI();
    const transactionBody = {
      from: this.web3Service.masterAccountAddress,
      to: chain.provider.contracts.sacraRelay.address,
      data: transactionDataABI,
    };

    const gas = await chain.instance.eth.estimateGas(transactionBody);
    const gasPrice = await chain.instance.eth.getGasPrice();
    const tx = {
      ...transactionBody,
      gas: gas,
      gasPrice: gasPrice,
    };

    const signedTx = await chain.instance.eth.accounts.signTransaction(
      tx,
      this.web3Service.masterAccountPrivateKey,
    );
    if (!signedTx.rawTransaction) {
      throw new InternalServerErrorException(`Signing failed`);
    }

    await chain.instance.eth.sendSignedTransaction(signedTx.rawTransaction);
    return { success: true };
  }

  async callFromOperator(callFromOperatorDto: CallFromOperatorDto) {
    const chain = this.web3Service.getProvider(callFromOperatorDto.chainId);
    const sacraRelayContract = this.getSacraRelayContract(callFromOperatorDto.chainId);

    this.checkAllowedContractAddress(callFromOperatorDto.chainId, callFromOperatorDto.target);

    const callInfo = {
      chainId: callFromOperatorDto.chainId,
      target: callFromOperatorDto.target,
      data: callFromOperatorDto.data,
      user: callFromOperatorDto.fromAddress,
      userNonce: 0,
      userDeadline: 0,
    };
    const transactionDataABI = sacraRelayContract.methods
      .callFromOperator(callInfo, callFromOperatorDto.signature)
      .encodeABI();

    const transactionBody: Transaction = {
      from: this.web3Service.masterAccountAddress,
      to: chain.provider.contracts.sacraRelay.address,
      data: transactionDataABI,
      nonce: this.nonce,
    };

    this.nonce++;
    this.storage.setItem('nonce', this.nonce.toString());

    return await chain.instance.eth.sendTransaction(transactionBody).catch((error) => error);
  }

  async userCallFromOperator(
    callFromOperatorDto: CallFromOperatorDto,
    userPrivateKey: string = this.web3Service.masterAccountPrivateKey,
  ) {
    const signature = await this.signCallWithERC2771(
      callFromOperatorDto,
      userPrivateKey,
      callFromOperatorDto.chainId,
    );

    return await this.callFromOperator({
      chainId: callFromOperatorDto.chainId,
      fromAddress: this.web3Service.masterAccountAddress,
      target: callFromOperatorDto.target,
      data: callFromOperatorDto.data,
      userNonce: callFromOperatorDto.userNonce,
      userDeadline: callFromOperatorDto.userDeadline,
      signature: signature,
    }).catch((error) => error);
  }

  private async createSignatureManually(hashMessage: string, privateKeyUint8Array: Uint8Array) {
    const signatureSigned = secp256k1.sign(hashMessage, privateKeyUint8Array); // sign
    const signatureBytes = signatureSigned.toCompactRawBytes();
    const r = (signatureSigned.recovery + 27).toString(16);

    return `${bytesToHex(signatureBytes)}${r}`;
  }

  private getSacraRelayContract(chainId: number) {
    const chain = this.web3Service.getProvider(chainId);
    return chain.provider.contracts.sacraRelay.contract;
  }

  private CALL_ERC2771_TYPEHASH(chainId: number) {
    const sacraRelayContract = this.getSacraRelayContract(chainId);
    return sacraRelayContract.methods.CALL_ERC2771_TYPEHASH().call();
  }

  private DOMAIN_SEPARATOR(chainId: number) {
    const sacraRelayContract = this.getSacraRelayContract(chainId);
    return sacraRelayContract.methods.DOMAIN_SEPARATOR().call();
  }

  private async getHashedMessage(chainId: number, callInfo: CallFromOperatorDto) {
    const CALL_ERC2771_TYPEHASH = await this.CALL_ERC2771_TYPEHASH(chainId);
    const DOMAIN_SEPARATOR = await this.DOMAIN_SEPARATOR(chainId);

    const encodedParameters = eth.abi.encodeParameters(
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

  private async signCallWithERC2771(
    callInfo: CallFromOperatorDto,
    privateKey: string,
    chainId: number,
  ) {
    const chain = this.web3Service.getProvider(chainId);

    const { hashedMessage } = await this.getHashedMessage(chainId, callInfo);
    const messageHexWithoutPrefix = hashedMessage.substring(2);
    const privateKeyUint8Array = chain.instance.eth.accounts.parseAndValidatePrivateKey(privateKey);

    return this.createSignatureManually(messageHexWithoutPrefix, privateKeyUint8Array);
  }

  private checkAllowedContractAddress(chainId: number, address: string) {
    const chain = this.web3Service.getProvider(chainId);
    const contractsAddress = Object.values(chain.provider.contracts).map(({ address }) => address);
    const isKnownContactAddress = contractsAddress.includes(address);
    if (!isKnownContactAddress) {
      throw new InternalServerErrorException(`Contract address ${address} not allowed`);
    }
    return true;
  }
}
