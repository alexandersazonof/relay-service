import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AbiItem, Contract, Transaction, TransactionReceipt } from 'web3';
import { Counter } from 'src/common/utils/counter';
import { AsyncTaskManager, IAsyncTask } from 'src/common/utils/task-manager';
import { Web3ManagerService } from 'src/common/web3-manager/web3-manager.service';
import { CallFromDelegatorDto } from './dto/call-from-delegator.dto';
import { CallFromOperatorDto } from './dto/call-from-operator.dto';
import { ICallInfo } from './interfaces/call-info.interface';
import { IUserToNonce } from './interfaces/user-to-nonce.interface';
import { IUserToTransactionQueue } from './interfaces/user-to-transaction-queue.interface';
import { abi } from './constants/abi';

@Injectable()
export class RelayService {
  private readonly contract: Contract<AbiItem[]>;
  private readonly userToNonce: IUserToNonce = {};
  private readonly userToTransactionQueue: IUserToTransactionQueue = {};

  constructor(
    public readonly configService: ConfigService,
    public readonly web3Service: Web3ManagerService,
  ) {
    const contractAddress = this.configService.get<string>('SACRA_RELAY_CONTRACT_ADDRESS');
    this.contract = new this.web3Service.web3.eth.Contract(abi, contractAddress);
  }

  public async callFromDelegator(callFromDelegatorDto: CallFromDelegatorDto) {
    const userNonce = await this.getUserNonce(callFromDelegatorDto.user);

    if (userNonce.toString() !== callFromDelegatorDto.userNonce.toString()) {
      throw new ForbiddenException(
        `Nonce is not correct. Should be ${userNonce}. You sent ${callFromDelegatorDto.userNonce}`,
      );
    }

    const callInfo: ICallInfo = {
      chainId: this.web3Service.chainId,
      target: callFromDelegatorDto.target,
      data: callFromDelegatorDto.data,
      user: callFromDelegatorDto.user,
      userNonce: callFromDelegatorDto.userNonce,
      userDeadline: callFromDelegatorDto.userDeadline,
    };
    const transactionDataABI = this.contract.methods.callFromDelegator(callInfo).encodeABI();

    const transactionBody = {
      from: this.web3Service.defaultAccountAddress,
      to: this.contract.options.address,
      data: transactionDataABI,
    };

    return this.web3Service.web3.eth.sendTransaction(transactionBody);
  }

  public async callFromOperator(callFromOperatorDto: CallFromOperatorDto) {
    const userNonce = await this.getUserNonce(callFromOperatorDto.user);

    if (userNonce.toString() !== callFromOperatorDto.userNonce.toString()) {
      throw new ForbiddenException(
        `Nonce is not correct. Should be ${userNonce}. You sent ${callFromOperatorDto.userNonce}`,
      );
    }

    const callInfo: ICallInfo = {
      chainId: this.web3Service.chainId,
      target: callFromOperatorDto.target,
      data: callFromOperatorDto.data,
      user: callFromOperatorDto.user,
      userNonce: callFromOperatorDto.userNonce,
      userDeadline: callFromOperatorDto.userDeadline,
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

  public async executeCallFromOperatorInQueue(callFromOperatorDto: CallFromOperatorDto) {
    const task = this.callFromOperatorWrapper(callFromOperatorDto);
    return this.addTaskToTransactionQueue(callFromOperatorDto.user, task).then(
      (transaction) => transaction.transactionHash,
    );
  }

  public CALL_ERC2771_TYPEHASH() {
    return this.contract.methods.CALL_ERC2771_TYPEHASH().call();
  }

  public DOMAIN_SEPARATOR() {
    return this.contract.methods.DOMAIN_SEPARATOR().call();
  }

  public async getUserNonce(address: string) {
    const userNonce = this.userToNonce[address];
    if (userNonce) return userNonce.count;

    const nonce = (await this.contract.methods.userTxNonce(address).call()) as number;
    this.userToNonce[address] = new Counter(nonce);
    return this.userToNonce[address].count;
  }

  private callFromOperatorWrapper(callFromOperatorDto: CallFromOperatorDto) {
    return async () => {
      const transaction = await this.callFromOperator(callFromOperatorDto);
      this.incrementUserNonce(callFromOperatorDto.user);
      console.log('Execute call from operator finished successfully');
      return transaction;
    };
  }

  private incrementUserNonce(address: string) {
    this.userToNonce[address].increment();
  }

  private addTaskToTransactionQueue(address: string, task: IAsyncTask<TransactionReceipt>) {
    const userTransactionQueue = this.userToTransactionQueue[address];
    if (!userTransactionQueue) this.userToTransactionQueue[address] = new AsyncTaskManager();

    return this.userToTransactionQueue[address].addTask(task);
  }
}
