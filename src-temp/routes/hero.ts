import {Router} from 'express';
import {create} from '../controllers/hero';

const router = Router();

router.post('/create', create);

export default router;
