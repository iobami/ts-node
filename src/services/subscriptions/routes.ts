import { Router } from 'express';
import { create } from './controllers';

const router = Router();

router.route('/subscribe')
  .post(create);

export default router;