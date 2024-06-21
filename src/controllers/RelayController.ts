import { Request, Response } from 'express';
import { RelayService } from '../services/RelayService';


export class RelayController {
  private relayService: RelayService = new RelayService();

  public async signTransaction(req: Request, res: Response): Promise<void> {
    try {
      const target = req.body.target;
      const data = req.body.data;
      const user = req.body.user;
      await this.relayService.signTransaction();
      res.status(200).json({ message: 'success' });
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: e });
    }
  }
}