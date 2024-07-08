import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AbiItem, Contract, Transaction } from 'web3';
import { AbiErrorFragment } from 'web3-types/src/eth_abi_types';
import { keccak256 } from 'js-sha3';
import { Web3Service } from 'src/domain/web3/web3.service';
import { abiErrors, abiRelay, abiHero, ContractAddress } from './constants';
import { CallFromDelegatorDto } from './dto/call-from-delegator.dto';
import { GetContractErrorNameDto } from './dto/get-contract-error-name.dto';
import { CallFromOperatorDto } from './dto/call-from-operator.dto';
import { IContractErrorData } from './interfaces/contract-error-data.interface';
import { secp256k1 } from 'ethereum-cryptography/secp256k1.js';
import { bytesToHex } from 'web3-utils';

const testAbi = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'CALL_ERC2771_TYPEHASH',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'NAME',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'VERSION',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'chainId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'target',
            type: 'address',
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes',
          },
          {
            internalType: 'address',
            name: 'user',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'userNonce',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'userDeadline',
            type: 'uint256',
          },
        ],
        internalType: 'struct Test.CallWithERC2771',
        name: 'callInfo',
        type: 'tuple',
      },
    ],
    name: '_abiEncodeCallERC2771',
    outputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'chainId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'target',
            type: 'address',
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes',
          },
          {
            internalType: 'address',
            name: 'user',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'userNonce',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'userDeadline',
            type: 'uint256',
          },
        ],
        internalType: 'struct Test.CallWithERC2771',
        name: 'callInfo',
        type: 'tuple',
      },
    ],
    name: '_requireCallERC2771Signature',
    outputs: [
      {
        internalType: 'bytes32',
        name: 'digest',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getText',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'chainId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'target',
            type: 'address',
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes',
          },
          {
            internalType: 'address',
            name: 'user',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'userNonce',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'userDeadline',
            type: 'uint256',
          },
        ],
        internalType: 'struct Test.CallWithERC2771',
        name: 'callInfo',
        type: 'tuple',
      },
    ],
    name: 'packed',
    outputs: [
      {
        internalType: 'bytes',
        name: 'packed',
        type: 'bytes',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'hash',
        type: 'bytes32',
      },
      {
        internalType: 'bytes',
        name: 'signature',
        type: 'bytes',
      },
    ],
    name: 'recover',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'chainId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'target',
            type: 'address',
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes',
          },
          {
            internalType: 'address',
            name: 'user',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'userNonce',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'userDeadline',
            type: 'uint256',
          },
        ],
        internalType: 'struct Test.CallWithERC2771',
        name: 'callInfo',
        type: 'tuple',
      },
      {
        internalType: 'bytes',
        name: 'signature_',
        type: 'bytes',
      },
    ],
    name: 'recover2',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

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

    const signed = this.web3Service.instance.eth.accounts.sign(
      'data',
      '0x062061649fc782ee1fcfde3e589a0519a8b2b70c5c6394b491cfbcd4d07a5481',
    );
    console.log(signed);

    const recover = this.web3Service.instance.eth.accounts.recover('data', signed.signature);
    console.log(recover);
  }

  async recover() {
    const contractAddress = '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9';

    const testContract = new this.web3Service.instance.eth.Contract(testAbi, contractAddress);

    const message = 'text';
    console.log('message', message);
    const privateKey = '0x062061649fc782ee1fcfde3e589a0519a8b2b70c5c6394b491cfbcd4d07a5481';

    const signed = this.web3Service.instance.eth.accounts.sign(message, privateKey);
    console.log(signed);

    const privateKeyUint8Array =
      this.web3Service.instance.eth.accounts.parseAndValidatePrivateKey(privateKey);

    const hash = this.web3Service.instance.eth.accounts.hashMessage(message);
    const signatureSigned = secp256k1.sign(hash.substring(2), privateKeyUint8Array);
    const signatureBytes = signatureSigned.toCompactRawBytes();
    const v = signatureSigned.recovery! + 27;
    const signature = `${bytesToHex(signatureBytes)}${v.toString(16)}`;
    console.log('signature', signature);

    const messageHash = this.web3Service.instance.eth.accounts.hashMessage(message);
    console.log('messageHash', messageHash);

    const recoveredAddress = await testContract.methods.recover(messageHash, signature).call();

    console.log('recoveredAddress', recoveredAddress);

    return recoveredAddress;
  }

  async recover2() {
    const callInfo = {
      chainId: 251,
      target: '0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0',
      data: '0x00',
      user: '0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0',
      userNonce: 0,
      userDeadline: 0,
    };

    const contractAddress = '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9';

    const testContract = new this.web3Service.instance.eth.Contract(testAbi, contractAddress);

    const hashed = await this.getHashMessage(callInfo);
    console.log('message', hashed);

    const privateKey = '0x062061649fc782ee1fcfde3e589a0519a8b2b70c5c6394b491cfbcd4d07a5481';

    const signed = this.web3Service.instance.eth.accounts.sign(hashed.message, privateKey);
    console.log(signed);

    const privateKeyUint8Array =
      this.web3Service.instance.eth.accounts.parseAndValidatePrivateKey(privateKey);

    const messageHash = hashed.hashMessage; // const messageHash = this.web3Service.instance.eth.accounts.hashMessage(hashed.packed); // const messageHash = keccak256('\x19Ethereum Signed Message:\n' + message.length + message);
    const signatureSigned = secp256k1.sign(messageHash.substring(2), privateKeyUint8Array);
    const signatureBytes = signatureSigned.toCompactRawBytes();
    const v = signatureSigned.recovery! + 27;
    const signature = `${bytesToHex(signatureBytes)}${v.toString(16)}`;
    console.log('signature', signature);

    console.log('messageHash', messageHash);

    const recoveredAddress = await testContract.methods.recover2(callInfo, signature).call();

    console.log('recoveredAddress', recoveredAddress);

    return recoveredAddress;
  }

  async getHashMessage(
    callInfo = {
      chainId: 251,
      target: '0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0',
      data: '0x00',
      user: '0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0',
      userNonce: 0,
      userDeadline: 0,
    },
  ) {
    const contractAddress = '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9';

    const testContract = new this.web3Service.instance.eth.Contract(testAbi, contractAddress);

    const CALL_ERC2771_TYPEHASH = await testContract.methods.CALL_ERC2771_TYPEHASH().call();
    const DOMAIN_SEPARATOR = await testContract.methods.DOMAIN_SEPARATOR().call();

    console.log(`CALL_ERC2771_TYPEHASH\n${CALL_ERC2771_TYPEHASH}\n`);
    console.log(`DOMAIN_SEPARATOR\n${DOMAIN_SEPARATOR}\n`);

    const _abiEncodeCallERC2771 = this.web3Service.instance.eth.abi.encodeParameters(
      ['bytes32', 'uint256', 'address', 'bytes32', 'address', 'uint256', 'uint256'],
      [
        CALL_ERC2771_TYPEHASH,
        callInfo.chainId,
        callInfo.target,
        this.web3Service.instance.utils.soliditySha3({ type: 'bytes', value: callInfo.data }),
        callInfo.user,
        0,
        0,
      ],
    );
    console.log(`emulation _abiEncodeCallERC2771\n${_abiEncodeCallERC2771}\n`);

    const message = this.web3Service.instance.utils.soliditySha3({
      type: 'bytes',
      value: _abiEncodeCallERC2771,
    });

    const packed = this.web3Service.instance.utils.encodePacked(
      { type: 'bytes', value: ['0x19', '0x01'] }, // \x19\x01
      {
        type: 'bytes', // bytes32
        value: DOMAIN_SEPARATOR,
      },
      {
        type: 'bytes', // bytes32
        value: message,
      },
    );

    const hashMessage = this.web3Service.instance.utils.soliditySha3({
      type: 'bytes',
      value: packed,
    });
    console.log(`emulation _requireCallERC2771Signature\n${hashMessage}\n`);

    const contractSignature = await testContract.methods
      ._requireCallERC2771Signature([
        callInfo.chainId,
        callInfo.target,
        callInfo.data,
        callInfo.user,
        callInfo.userNonce,
        callInfo.userDeadline,
      ])
      .call();
    console.log(`contract _requireCallERC2771Signature\n${contractSignature}\n`);

    return { _abiEncodeCallERC2771, packed, hashMessage, message };
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
    this.checkKnownContractAddress(callFromDelegatorDto.target);

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

    const signedTx = await this.web3Service.instance.eth.accounts.signTransaction(
      tx,
      this.web3Service.masterAccountPrivateKey,
    );
    if (!signedTx.rawTransaction) {
      throw new InternalServerErrorException(`Signing failed`);
    }

    await this.web3Service.instance.eth.sendSignedTransaction(signedTx.rawTransaction);
    return { success: true };
  }

  async callFromOperator(callFromOperatorDto: CallFromOperatorDto) {
    this.checkKnownContractAddress(callFromOperatorDto.target);

    const callInfo = {
      chainId: 250,
      target: callFromOperatorDto.target,
      data: callFromOperatorDto.data,
      user: callFromOperatorDto.fromAddress,
      userNonce: 1,
      userDeadline: 0,
    };

    const transactionData = this.sacraRelayContract.methods
      .callFromOperator(callInfo, callFromOperatorDto.signature)
      .encodeABI();
    // const gas = await this.web3Service.instance.eth.estimateGas({
    //   from: this.web3Service.masterAccountAddress,
    //   to: ContractAddress.Relay,
    //   data: transactionData,
    // });

    const gasPrice = await this.web3Service.instance.eth.getGasPrice();
    const tx: Transaction = {
      from: this.web3Service.masterAccountAddress,
      to: ContractAddress.Relay,
      gasLimit: 5000000,
      gasPrice: gasPrice,
      data: transactionData,
    };

    console.log('tx', tx);

    const signedTx = await this.web3Service.instance.eth.accounts.signTransaction(
      tx,
      this.web3Service.masterAccountPrivateKey,
    );
    if (!signedTx.rawTransaction) {
      throw new InternalServerErrorException(`Signing failed`);
    }
    console.log('rawTransaction', signedTx.rawTransaction);

    const receipt = await this.web3Service.instance.eth.sendSignedTransaction(
      signedTx.rawTransaction,
    );
    console.log('receipt', receipt);

    return { success: true };
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

  private checkKnownContractAddress(address: string) {
    const contracts = Object.values<string>(ContractAddress);
    const isKnownContactAddress = contracts.includes(address);
    if (!isKnownContactAddress) {
      throw new InternalServerErrorException(`Contract address ${address} not allowed`);
    }
  }
}
