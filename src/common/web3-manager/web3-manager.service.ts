import { Injectable } from '@nestjs/common';
import Web3 from 'web3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class Web3ManagerService {
  public readonly web3: Web3;
  public readonly defaultChainId: number;

  constructor(private readonly configService: ConfigService) {
    const masterAccountAddress = configService.get<string>('ACCOUNT_ADDRESS');
    const masterAccountPrivateKey = configService.get<string>('PRIVATE_KEY');
    const rpcUrl = this.configService.get<string>('RPC_URL');

    this.web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl));
    this.web3.eth.accounts.wallet.add(masterAccountPrivateKey);
    this.web3.eth.defaultAccount = masterAccountAddress;

    this.defaultChainId = Number(this.configService.get<string>('CHAIN_ID'));
  }

  public get defaultAccountAddress(): string {
    return this.web3.eth.defaultAccount;
  }
}
