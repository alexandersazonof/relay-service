import {Router} from 'express';
import {signTransaction, delegate, getContractErrorNameByHex} from "../controllers/relay";

const router = Router();

router.get('/', signTransaction);
router.get('/error', getContractErrorNameByHex);
router.post('/delegate', delegate);

export default router;