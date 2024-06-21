import { Router } from 'express';
import { RelayController } from '../controllers/RelayController';

const router = Router();
const relayController = new RelayController();

router.post('/relay', (req, res) => relayController.signTransaction(req, res));

export default router;