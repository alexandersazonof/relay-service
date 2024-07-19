import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Contract, AbiItem } from 'web3';
import { ChainEnum } from '../web3/constants/chain.enum';
import { Web3Service } from '../web3/web3.service';
import { abiRelay, ContractAddress } from './constants';

@Injectable()
export class TestRelayService {
  public testContract: Contract<AbiItem[]>;

  constructor(
    private readonly configService: ConfigService,
    public readonly web3Service: Web3Service,
  ) {
    this.testContract = new (this.web3Service.get(ChainEnum.Hardhat).instance.eth.Contract)(
      abiRelay,
      ContractAddress.TestRelay,
    );
  }

  async getAllOperators() {
    try {
      const data = await this.testContract.methods.getAllOperators().call();
      return 'Current operators: ' + data;
    } catch (e) {
      console.log(e);
    }
  }
}
