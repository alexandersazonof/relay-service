import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Web3 from 'web3';

@Injectable()
export class Web3ManagerService {
  public readonly defaultAccountAddress: string;
  public readonly chainId: number;
  public readonly web3: Web3;

  constructor(private readonly configService: ConfigService) {
    this.defaultAccountAddress = configService.get<string>('ACCOUNT_ADDRESS');
    const masterAccountPrivateKey = configService.get<string>('PRIVATE_KEY');

    const chainId = configService.get<string>('CHAIN_ID');
    const chainRpcUrl = configService.get<string>('CHAIN_RPC_URL');

    this.chainId = Number(chainId);
    this.web3 = new Web3(new Web3.providers.HttpProvider(chainRpcUrl));
    this.web3.eth.accounts.wallet.add(masterAccountPrivateKey);
    this.web3.eth.defaultAccount = this.defaultAccountAddress;
  }
}
