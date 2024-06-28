import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Web3 from 'web3';

@Injectable()
export class Web3Service {
  public readonly instance: Web3;
  public readonly masterAccountAddress: string;
  public readonly masterAccountPrivateKey: string;

  constructor(private readonly configService: ConfigService) {
    this.instance = new Web3(new Web3.providers.HttpProvider(configService.get('RPC_PROVIDER')));
    this.masterAccountAddress = configService.get('ACCOUNT_ADDRESS');
    this.masterAccountPrivateKey = configService.get('PRIVATE_KEY');
  }
}
