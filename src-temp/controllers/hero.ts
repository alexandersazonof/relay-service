import {Request, Response} from "express";
import * as heroService from '../services/hero';

interface ICrate {
    fromAddress: string;
}

export const create = async (req: Request, res: Response) => {
    const {fromAddress} = req.body as ICrate;
    const createResult = await heroService.create(fromAddress);

    if (createResult.success) {
        res.json({success: true});
    } else {
        res.status(500).json({message: createResult.message});
    }
}
