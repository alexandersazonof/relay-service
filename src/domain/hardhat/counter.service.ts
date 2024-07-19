import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AbiItem, Contract } from 'web3';
import { Web3Service } from '../web3/web3.service';
import { ContractAddress, abiTest } from './constants';
import { ChainEnum } from '../web3/constants/chain.enum';

@Injectable()
export class CounterService {
  public testContract: Contract<AbiItem[]>;

  constructor(
    private readonly configService: ConfigService,
    public readonly web3Service: Web3Service,
  ) {
    this.testContract = new (this.web3Service.get(ChainEnum.Hardhat).instance.eth.Contract)(
      abiTest,
      ContractAddress.Counter,
    );
  }

  async testCounterCall() {
    try {
      const data = await this.testContract.methods.getValue().call();
      return 'Current value: ' + data;
    } catch (e) {
      console.log(e);
    }
  }

  async testCounterPlus() {
    try {
      await this.testContract.methods
        .increment()
        .send({ from: this.web3Service.masterAccountAddress });
      const value = await this.testContract.methods.getValue().call();
      return 'Current value: ' + value;
    } catch (e) {
      console.log(e);
    }
  }

  async testCounterReset() {
    try {
      await this.testContract.methods.reset().send({ from: this.web3Service.masterAccountAddress });
      const value = await this.testContract.methods.getValue().call();
      return 'Current value: ' + value;
    } catch (e) {
      console.log(e);
    }
  }
}
