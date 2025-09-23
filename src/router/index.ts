import { Router } from 'express';

import { publicController, userController } from '../controllers';

const router = Router();

router.use('/public', publicController);

router.use('/user', userController);

export default router;
