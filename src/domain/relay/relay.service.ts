import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AbiItem, Contract, eth, Transaction, utils } from 'web3';
import { bytesToHex } from 'web3-utils';
import { secp256k1 } from '@noble/curves/secp256k1';
import { Counter } from 'src/common/utils/counter';
import { AsyncTaskManager } from 'src/common/utils/task-manager';
import { Web3ManagerService } from 'src/common/web3-manager/web3-manager.service';
import { abi as relayAbi } from './constants/abi';
import { CallFromDelegatorDto } from './dto/call-from-delegator.dto';
import { CallFromOperatorDto } from './dto/call-from-operator.dto';
import { ExecuteCallFromOperatorDto } from './dto/execute-call-from-operator.dto';
import { ICallInfo } from './interfaces/call-info.interface';

@Injectable()
export class RelayService implements OnModuleInit {
  private readonly contract: Contract<AbiItem[]>;
  private readonly transactionsManager: AsyncTaskManager<() => Promise<void>>;
  private nonceCounter: Counter;

  constructor(
    private readonly configService: ConfigService,
    public readonly web3Service: Web3ManagerService,
  ) {
    const sacraRelayContractAddress = this.configService.get<string>(
      'SACRA_RELAY_CONTRACT_ADDRESS',
    );
    this.contract = new this.web3Service.web3.eth.Contract(relayAbi, sacraRelayContractAddress);
    this.transactionsManager = new AsyncTaskManager();
  }

  async onModuleInit() {
    const contractTxNonce = await this.contract.methods
      .userTxNonce(this.web3Service.defaultAccountAddress)
      .call();
    this.nonceCounter = new Counter(Number(contractTxNonce));
  }

  callFromDelegator(callFromDelegatorDto: CallFromDelegatorDto) {
    const callInfo: ICallInfo = {
      chainId: this.web3Service.defaultChainId,
      target: callFromDelegatorDto.target,
      data: callFromDelegatorDto.data,
      user: callFromDelegatorDto.user,
      userNonce: 0,
      userDeadline: 0,
    };
    const transactionDataABI = this.contract.methods.callFromDelegator(callInfo).encodeABI();

    const transactionBody = {
      from: this.web3Service.defaultAccountAddress,
      to: this.contract.options.address,
      data: transactionDataABI,
    };

    return this.web3Service.web3.eth.sendTransaction(transactionBody);
  }

  callFromOperator(callFromOperatorDto: CallFromOperatorDto) {
    const callInfo: ICallInfo = {
      chainId: this.web3Service.defaultChainId,
      target: callFromOperatorDto.target,
      data: callFromOperatorDto.data,
      user: callFromOperatorDto.user,
      userNonce: this.nonceCounter.count,
      userDeadline: 0,
    };
    const transactionDataABI = this.contract.methods
      .callFromOperator(callInfo, callFromOperatorDto.signature)
      .encodeABI();

    const transactionBody: Transaction = {
      from: this.web3Service.defaultAccountAddress,
      to: this.contract.options.address,
      data: transactionDataABI,
    };

    return this.web3Service.web3.eth.sendTransaction(transactionBody);
  }

  async executeCallFromOperatorInQueue(executeCallFromOperatorDto: ExecuteCallFromOperatorDto) {
    const task = this.executeCallFromOperatorWrapper(executeCallFromOperatorDto);
    this.transactionsManager.addTask(task);

    return { status: 'success', message: 'Transaction is processing' };
  }

  async executeCallFromOperator(executeCallFromOperatorDto: ExecuteCallFromOperatorDto) {
    const callInfo: ICallInfo = {
      chainId: this.web3Service.defaultChainId,
      user: executeCallFromOperatorDto.user,
      target: executeCallFromOperatorDto.target,
      data: executeCallFromOperatorDto.data,
      userNonce: this.nonceCounter.count,
      userDeadline: 0,
    };

    const signature = await this.signCallWithERC2771(
      callInfo,
      executeCallFromOperatorDto.fromPrivateKey,
    );

    return this.callFromOperator({
      chainId: callInfo.chainId,
      user: callInfo.user,
      target: callInfo.target,
      data: callInfo.data,
      signature: signature,
    });
  }

  private createSignatureManually(hashMessage: string, privateKeyUint8Array: Uint8Array) {
    const signatureSigned = secp256k1.sign(hashMessage, privateKeyUint8Array); // sign
    const signatureBytes = signatureSigned.toCompactRawBytes();
    const r = (signatureSigned.recovery + 27).toString(16);

    return `${bytesToHex(signatureBytes)}${r}`;
  }

  private CALL_ERC2771_TYPEHASH() {
    return this.contract.methods.CALL_ERC2771_TYPEHASH().call();
  }

  private DOMAIN_SEPARATOR() {
    return this.contract.methods.DOMAIN_SEPARATOR().call();
  }

  private async getHashedMessage(callInfo: ICallInfo) {
    const CALL_ERC2771_TYPEHASH = await this.CALL_ERC2771_TYPEHASH();
    const DOMAIN_SEPARATOR = await this.DOMAIN_SEPARATOR();

    const encodedParameters = eth.abi.encodeParameters(
      ['bytes32', 'uint256', 'address', 'bytes32', 'address', 'uint256', 'uint256'],
      [
        CALL_ERC2771_TYPEHASH,
        callInfo.chainId,
        callInfo.target,
        utils.soliditySha3({ type: 'bytes', value: callInfo.data }),
        callInfo.user,
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

  private async signCallWithERC2771(callInfo: ICallInfo, privateKey: string) {
    const { hashedMessage } = await this.getHashedMessage(callInfo);
    const messageHexWithoutPrefix = hashedMessage.substring(2);
    const privateKeyUint8Array =
      this.web3Service.web3.eth.accounts.parseAndValidatePrivateKey(privateKey);

    return this.createSignatureManually(messageHexWithoutPrefix, privateKeyUint8Array);
  }

  private executeCallFromOperatorWrapper(executeCallFromOperatorDto: ExecuteCallFromOperatorDto) {
    return async () => {
      try {
        await this.executeCallFromOperator(executeCallFromOperatorDto);
        this.nonceCounter.increment();
        console.log('Execute call from operator finished successfully');
      } catch (error) {
        console.log('Execute call from operator crashed with error: ', error);
      }
    };
  }
}
