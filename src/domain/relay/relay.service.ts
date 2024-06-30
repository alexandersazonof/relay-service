import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AbiItem, Contract } from 'web3';
import { AbiErrorFragment } from 'web3-types/src/eth_abi_types';
import { keccak256 } from 'js-sha3';
import { Web3Service } from 'src/domain/web3/web3.service';
import { abiErrors, ContractAddress, abiRelay, abiHero } from './constants';
import { CallFromDelegatorDto } from './dto/call-from-delegator.dto';
import { GetContractErrorNameDto } from './dto/get-contract-error-name.dto';
import { IContractErrorData } from './interfaces/contract-error-data.interface';
import { CallFromOperatorDto } from './dto/call-from-operator.dto';

@Injectable()
export class RelayService {
  public readonly sacraRelayContract: Contract<AbiItem[]>;
  public readonly sacraHeroContract: Contract<AbiItem[]>;

  constructor(
    private readonly configService: ConfigService,
    private readonly web3Service: Web3Service,
  ) {
    this.sacraHeroContract = new this.web3Service.instance.eth.Contract(
      abiHero,
      ContractAddress.Hero,
    );

    this.sacraRelayContract = new this.web3Service.instance.eth.Contract(
      abiRelay,
      ContractAddress.Relay,
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
    if (!(<string[]>Object.values(ContractAddress)).includes(callFromDelegatorDto.target)) {
      throw new InternalServerErrorException(
        `Contract address ${callFromDelegatorDto.target} not allowed`,
      );
    }

    const callInfo = {
      chainId: 250,
      target: callFromDelegatorDto.target,
      data: callFromDelegatorDto.data,
      user: callFromDelegatorDto.fromAddress,
      userNonce: 1,
      userDeadline: 0,
    };
    console.log('callInfo:', callInfo);

    const transactionData = this.sacraRelayContract.methods.callFromDelegator(callInfo).encodeABI();
    console.log('transactionData:', transactionData);

    const gas = await this.web3Service.instance.eth.estimateGas({
      from: this.web3Service.masterAccountAddress,
      to: ContractAddress.Relay,
      data: transactionData,
    });

    const gasPrice = await this.web3Service.instance.eth.getGasPrice();

    const tx = {
      from: this.web3Service.masterAccountAddress,
      to: ContractAddress.Relay,
      gas: gas,
      gasPrice: gasPrice,
      data: transactionData,
    };
    console.log('tx:', tx);

    const signedTx = await this.web3Service.instance.eth.accounts.signTransaction(
      tx,
      this.web3Service.masterAccountPrivateKey,
    );
    console.log('signedTx:', signedTx);

    if (signedTx.rawTransaction) {
      const receipt = await this.web3Service.instance.eth.sendSignedTransaction(
        signedTx.rawTransaction,
      );

      return { success: true };
    } else {
      return { success: false, message: 'Signing failed' };
    }
  }

  async callFromOperator(callFromOperatorDto: CallFromOperatorDto) {
    if (!(<string[]>Object.values(ContractAddress)).includes(callFromOperatorDto.target)) {
      throw new InternalServerErrorException(
        `Contract address ${callFromOperatorDto.target} not allowed`,
      );
    }

    const callInfo = {
      chainId: 250,
      target: callFromOperatorDto.target,
      data: callFromOperatorDto.data,
      user: callFromOperatorDto.fromAddress,
      userNonce: 1,
      userDeadline: 0,
    };
    console.log('callInfo:', callInfo);

    const transactionData = this.sacraRelayContract.methods
      .callFromOperator(callInfo, callFromOperatorDto.signature)
      .encodeABI();
    console.log('transactionData:', transactionData);

    const gas = await this.web3Service.instance.eth.estimateGas({
      from: this.web3Service.masterAccountAddress,
      to: ContractAddress.Relay,
      data: transactionData,
    });

    const gasPrice = await this.web3Service.instance.eth.getGasPrice();

    const tx = {
      from: this.web3Service.masterAccountAddress,
      to: ContractAddress.Relay,
      gas: gas,
      gasPrice: gasPrice,
      data: transactionData,
    };
    console.log('tx:', tx);

    const signedTx = await this.web3Service.instance.eth.accounts.signTransaction(
      tx,
      this.web3Service.masterAccountPrivateKey,
    );
    console.log('signedTx:', signedTx);

    if (signedTx.rawTransaction) {
      const receipt = await this.web3Service.instance.eth.sendSignedTransaction(
        signedTx.rawTransaction,
      );

      return { success: true };
    } else {
      return { success: false, message: 'Signing failed' };
    }
  }

  // async create() {
  //   try {
  //     const gas = await this.web3Service.instance.eth.estimateGas({
  //       from: '0x66cb9d55dfe4530d26c2cd060eb2ecb66a5c51a4',
  //       to: ContractAddress.Hero,
  //       data: this.sacraHeroContract.methods
  //         .create('0x5b169bfd148175ba0bb1259b75978a847c75fe5b', 'test-name', false)
  //         .encodeABI(),
  //     });

  //     const tx = {
  //       from: '0x66cb9d55dfe4530d26c2cd060eb2ecb66a5c51a4',
  //       to: ContractAddress.Hero,
  //       gas: gas,
  //       gasPrice: await this.web3Service.instance.eth.getGasPrice(),
  //       data: this.sacraHeroContract.methods
  //         .create('0x5b169bfd148175ba0bb1259b75978a847c75fe5b', 'test-name', false)
  //         .encodeABI(),
  //     };
  //     const signedTx = await this.web3Service.instance.eth.accounts.signTransaction(
  //       tx,
  //       '455a3303a58926b697225f13b64ccddcc3d79fe3f24c4c20c3163107ece680ed',
  //     );
  //     if (signedTx.rawTransaction) {
  //       const receipt = await this.web3Service.instance.eth.sendSignedTransaction(
  //         signedTx.rawTransaction,
  //       );
  //       console.log(receipt);
  //       return { success: true };
  //     } else {
  //       throw new InternalServerErrorException({ success: false, message: 'Signing failed' });
  //     }
  //   } catch (e) {
  //     console.log(e);
  //     throw new InternalServerErrorException({ success: false, message: e });
  //   }
  // }

  // new this.web3Service.instance.eth.abi.encode
}
