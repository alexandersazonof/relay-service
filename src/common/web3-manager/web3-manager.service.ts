import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Web3, { eth } from 'web3';
import { keccak256 } from 'js-sha3';
import { abiErrors } from './constants/abi-errors';

@Injectable()
export class Web3ManagerService {
  public readonly defaultAccountAddress: string;
  public readonly chainId: number;
  public readonly web3: Web3;

  constructor(private readonly configService: ConfigService) {
    const masterAccountPrivateKey = this.configService.get<string>('PRIVATE_KEY');
    const wallet = eth.accounts.privateKeyToAccount(masterAccountPrivateKey);
    this.defaultAccountAddress = wallet.address;

    const chainId = this.configService.get<string>('CHAIN_ID');
    const chainRpcUrl = this.configService.get<string>('CHAIN_RPC_URL');

    this.chainId = Number(chainId);
    this.web3 = new Web3(new Web3.providers.HttpProvider(chainRpcUrl));
    this.web3.eth.accounts.wallet.add(masterAccountPrivateKey);
    this.web3.eth.defaultAccount = this.defaultAccountAddress;
  }

  getContractErrorNameByHex(code: string) {
    const error = abiErrors.find((abiError) => {
      if (!abiError.inputs) return false;

      const joinedInputTypes = abiError.inputs.map((input: any) => input.type).join(',');
      const signature = `${abiError.name}(${joinedInputTypes})`;
      const hash = '0x' + keccak256(signature).substring(0, 8);

      return hash === code.substring(0, 10);
    });

    return error.name || 'Unknown error';
  }
}
