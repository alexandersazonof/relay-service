import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AbiErrorFragment, eth, Web3 } from 'web3';
import { keccak256 } from 'js-sha3';
import { IContractErrorData } from './interfaces/contract-error-data.interface';
import { GetContractErrorNameDto } from './dto/get-contract-error-name.dto';
import { chains } from './constants/chains';
import { abiErrors } from './constants/abi-errors';

interface ICachedWeb3Instances {
  [chainName: string]: Web3;
}

@Injectable()
export class Web3Service {
  public readonly masterAccountAddress: string;
  public readonly masterAccountPrivateKey: string;

  private readonly cachedWeb3Instances: ICachedWeb3Instances = {};
  private readonly providers = chains;

  constructor(private readonly configService: ConfigService) {
    this.masterAccountAddress = configService.get('ACCOUNT_ADDRESS');
    this.masterAccountPrivateKey = configService.get('PRIVATE_KEY');
  }

  getProvider(providerId: number) {
    const provider = this.providers.get(providerId);

    if (!provider) {
      throw new NotFoundException('Provider not found');
    }

    if (!this.cachedWeb3Instances[provider.name]) {
      const httpProvider = new Web3.providers.HttpProvider(provider.rpcUrl);
      this.cachedWeb3Instances[provider.name] = new Web3(httpProvider);
    }

    return {
      instance: this.cachedWeb3Instances[provider.name],
      provider: provider,
    };
  }

  async getContractErrorNameByHex(getContractErrorNameDto: GetContractErrorNameDto) {
    const errors = abiErrors
      .map((abiError) => {
        if (!abiError.inputs) return null;
        const result: IContractErrorData = {};

        const joinedInputTypes = abiError.inputs.map((input: any) => input.type).join(',');
        const signature = `${abiError.name}(${joinedInputTypes})`;
        const hash = '0x' + keccak256(signature).substring(0, 8);

        if (hash !== getContractErrorNameDto.code.substring(0, 10)) return null;
        result.error = abiError.name;

        if (getContractErrorNameDto.code.length > 10) return null;
        result.decoded = eth.abi.decodeParameters(
          abiError.inputs as AbiErrorFragment[],
          getContractErrorNameDto.code.slice(10),
        );

        return result;
      })
      .filter(Boolean) as IContractErrorData[];

    return { data: errors };
  }
}
