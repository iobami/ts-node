import { Router } from 'express';
import { broadcast, create, remove } from './controllers';

const router = Router();

router.route('/')
  .post(create)
  .delete(remove);

router.route('/broadcast')
  .get(broadcast);

export default router;