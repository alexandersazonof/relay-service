import {Request, Response} from "express";
import * as relayService from "../services/relay";
import {ParsedQs} from "qs";

interface IDelegateBody {
    fromAddress: string;
    delegatorAddress: string;
}

interface IContractErrorNameByHex {
    code: string;
}

interface ICallFromDelegator {
    fromAddress: string;
}

export const delegate = async (req: Request, res: Response) => {
    const {fromAddress, delegatorAddress} = req.body as IDelegateBody;
    const delegateResult = await relayService.delegate(fromAddress, delegatorAddress);

    if (delegateResult.success) {
        res.json({success: true});
    } else {
        res.status(500).json({message: delegateResult.message});
    }
}

export const signTransaction = async (req: Request, res: Response) => {
    const signTransactionResult = await relayService.signTransaction();

    if (signTransactionResult.success) {
        res.json({success: true});
    } else {
        res.status(500).json({message: signTransactionResult.message});
    }
}

export const getContractErrorNameByHex = async (req: Request, res: Response) => {
    const { code } = req.query as unknown as IContractErrorNameByHex;
    const getContractErrorNameByHexResult = await relayService.getContractErrorNameByHex(code);

    if (getContractErrorNameByHexResult.success) {
        res.json({success: true, data: getContractErrorNameByHexResult.data});
    } else {
        res.status(500).json({message: getContractErrorNameByHexResult.message});
    }
}

export const callFromDelegator = async (req: Request, res: Response) => {
    const { fromAddress } = req.body as ICallFromDelegator;
    const relayServiceResult = await relayService.callFromDelegator(fromAddress);

    if (relayServiceResult.success) {
        res.json({success: true});
    } else {
        res.status(500).json({message: relayServiceResult.message});
    }
}
