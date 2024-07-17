import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AbiErrorFragment, eth } from 'web3';
import { GetContractErrorNameDto } from '../relay/dto/get-contract-error-name.dto';
import { abiErrors } from '../relay/constants';
import { IContractErrorData } from '../relay/interfaces/contract-error-data.interface';
import { keccak256 } from 'js-sha3';
import { Providers } from './constants/providers';
import { ChainEnum } from './constants/chain.enum';
import { Provider } from './providers/provider';

@Injectable()
export class Web3Service {
  public readonly providers: { [key in ChainEnum]: Provider };

  public readonly masterAccountAddress: string;
  public readonly masterAccountPrivateKey: string;

  constructor(private readonly configService: ConfigService) {
    this.masterAccountAddress = configService.get('ACCOUNT_ADDRESS');
    this.masterAccountPrivateKey = configService.get('PRIVATE_KEY');

    for (const chainId of Object.keys(Providers)) {
      this.providers[chainId] = new Providers[chainId]();
    }
  }

  get<T extends ChainEnum>(chainId: T) {
    return this.providers[chainId] as unknown as InstanceType<(typeof Providers)[T]>;
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
