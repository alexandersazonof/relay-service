import { Injectable } from '@nestjs/common';
import { eth, AbiErrorFragment } from 'web3';
import { keccak256 } from 'js-sha3';
import { abiErrors } from './constants/abi-errors';
import { GetContractErrorNameDto } from './dto/get-contract-error-name.dto';
import { IContractErrorData } from './interfaces/contract-error-data.interface';

@Injectable()
export class Web3Service {
  getContractErrorNameByHex(getContractErrorNameDto: GetContractErrorNameDto) {
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
