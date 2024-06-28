import config from "../config";
import {heroContractAddress} from "../constants";
import {ISuccessResult, IErrorResult} from "../interfaces/service-default";
import web3 from "../web3/instance";
import {heroContract} from "../web3/contracts";

export const create = async (fromAddress: string): Promise<ISuccessResult | IErrorResult> => {
    try {
        const gas = await web3.eth.estimateGas({
            from: fromAddress,
            to: heroContractAddress,
            data: heroContract.methods.create('0x5b169bfd148175ba0bb1259b75978a847c75fe5b', '1ara1', false).encodeABI()
        });

        const tx = {
            from: fromAddress,
            to: heroContractAddress,
            gas: gas,
            gasPrice: await web3.eth.getGasPrice(),
            data: heroContract.methods.create('0x5b169bfd148175ba0bb1259b75978a847c75fe5b', '1ara1', false).encodeABI()
        }
        const signedTx = await web3.eth.accounts.signTransaction(tx, config.PRIVATE_KEY_2);
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
