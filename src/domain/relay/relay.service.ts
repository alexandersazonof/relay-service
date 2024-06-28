import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AbiItem, Contract } from 'web3';
import { AbiErrorFragment } from 'web3-types/src/eth_abi_types';
import { keccak256 } from 'js-sha3';
import { Web3Service } from 'src/domain/web3/web3.service';
import { abiErrors, sacraRelayAddress, abiRelay } from './constants';
import { CallFromDelegatorDto } from './dto/call-from-delegator.dto';
import { GetContractErrorNameDto } from './dto/get-contract-error-name.dto';
import { IContractErrorData } from './interfaces/IContractErrorData';

@Injectable()
export class RelayService {
  public readonly sacraRelayContract: Contract<AbiItem[]>;

  constructor(
    private readonly configService: ConfigService,
    private readonly web3Service: Web3Service,
  ) {
    this.sacraRelayContract = new this.web3Service.instance.eth.Contract(
      abiRelay,
      sacraRelayAddress,
    );
  }

  async getContractErrorNameByHex(getContractErrorNameDto: GetContractErrorNameDto) {
    console.log(getContractErrorNameDto);

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
        result.decoded = this.web3Service.instance.eth.abi.decodeParameters(
          abiError.inputs as AbiErrorFragment[],
          getContractErrorNameDto.code.slice(10),
        );

        return result;
      })
      .filter(Boolean) as IContractErrorData[];

    return { data: errors };
  }

  async callFromDelegator(callFromDelegatorDto: CallFromDelegatorDto) {
    const callInfo = {
      chainId: 250,
      target: callFromDelegatorDto.target,
      data: callFromDelegatorDto.data,
      user: callFromDelegatorDto.fromAddress,
      userNonce: 1,
      userDeadline: 0,
    };

    const transactionData = this.sacraRelayContract.methods.callFromDelegator(callInfo).encodeABI();
    const gas = await this.web3Service.instance.eth.estimateGas({
      from: this.web3Service.masterAccountAddress,
      to: sacraRelayAddress,
      data: transactionData,
    });

    const gasPrice = await this.web3Service.instance.eth.getGasPrice();
    const tx = {
      from: this.web3Service.masterAccountAddress,
      to: sacraRelayAddress,
      gas: gas,
      gasPrice: gasPrice,
      data: transactionData,
    };

    const signedTx = await this.web3Service.instance.eth.accounts.signTransaction(
      tx,
      this.web3Service.masterAccountPrivateKey,
    );
    if (signedTx.rawTransaction) {
      const receipt = await this.web3Service.instance.eth.sendSignedTransaction(
        signedTx.rawTransaction,
      );
      return { success: true };
    } else {
      return { success: false, message: 'Signing failed' };
    }
  }
}
