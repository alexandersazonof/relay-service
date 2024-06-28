import {AbiErrorFragment} from "web3-types/src/eth_abi_types";
import {keccak256} from "js-sha3";
import config from "../config";
import {abiErrors, heroContractAddress, sacraRelayAddress} from "../constants";
import { ISuccessResult, IErrorResult } from "../interfaces/service-default";
import web3 from "../web3/instance";
import {heroContract, sacraRelayContract} from "../web3/contracts";
import {getContractAbi} from "../utils/AbiUtils";

interface IContractErrorData {
    error?: string,
    decoded?: unknown,
}

export const delegate = async (fromAddress: string, delegatorAddress: string): Promise<ISuccessResult | IErrorResult> => {
    try {
        const contractData = sacraRelayContract.methods.delegate(delegatorAddress).encodeABI();
        const gas = await web3.eth.estimateGas({from: fromAddress, to: sacraRelayAddress, data: contractData});

        const gasPrice = await web3.eth.getGasPrice();
        const tx = {from: fromAddress, to: sacraRelayAddress, gas: gas, gasPrice: gasPrice, data: contractData,};

        const signedTx = await web3.eth.accounts.signTransaction(tx, config.PRIVATE_KEY);
        if (signedTx.rawTransaction) {
            const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
            return {success: true};
        } else {
            return {success: false, message: 'Signing failed'};
        }
    } catch (error) {
        return {success: false, message: 'Server internal error'};
    }
}

export const signTransaction = async (): Promise<ISuccessResult | IErrorResult> => {
    try {
        const contract = getContractAbi('Relay');
        const relayContract = new web3.eth.Contract(contract, config.RELAY_ADDRESS);
        return {success: true};
    } catch (error) {
        return {success: false, message: 'Server internal error'};
    }
}

export const getContractErrorNameByHex = async (code: string): Promise<ISuccessResult & {
    data: IContractErrorData[]
} | IErrorResult> => {
    try {
        const errors = abiErrors.map((abiError) => {
            if (!abiError.inputs) return null;
            const result: IContractErrorData = {};

            const joinedInputTypes = abiError.inputs.map((input: any) => input.type).join(',');
            const signature = `${abiError.name}(${joinedInputTypes})`;
            const hash = '0x' + keccak256(signature).substring(0, 8);

            if (hash !== code.substring(0, 10)) return null;
            result.error = abiError.name

            if (code.length > 10) return null;
            result.decoded = web3.eth.abi.decodeParameters((abiError.inputs) as AbiErrorFragment[], code.slice(10));

            return result;
        }).filter(Boolean) as IContractErrorData[];

        return {success: true, data: errors};
    } catch (error) {
        return {success: false, message: 'Server internal error'};
    }
}

export const callFromDelegator = async (fromAddress: string): Promise<ISuccessResult | IErrorResult> => {
    try {
        const callInfo = {
            chainId: 250,
            target: heroContractAddress,
            data: heroContract.methods.create('0x5b169bfd148175ba0bb1259b75978a847c75fe5b', '1ara1', false).encodeABI(),
            user: fromAddress,
            userNonce: 1,
            userDeadline: 0
        };

        const gas = await web3.eth.estimateGas({
            from: fromAddress,
            to: sacraRelayAddress,
            data: sacraRelayContract.methods.callFromDelegator(callInfo).encodeABI()
        });

        const tx = {
            from: fromAddress,
            to: sacraRelayAddress,
            gas: gas,
            gasPrice: await web3.eth.getGasPrice(),
            data: sacraRelayContract.methods.callFromDelegator(callInfo).encodeABI()
        };

        const signedTx = await web3.eth.accounts.signTransaction(tx, config.PRIVATE_KEY_2);
        if (signedTx.rawTransaction) {
            const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
            return {success: true};
        } else {
            return {success: false, message: 'Signing failed'}
        }
    } catch (error) {
        return {success: false, message: 'Server internal error'}
    }
}