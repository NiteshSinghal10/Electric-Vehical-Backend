import { Router } from 'express';

import { publicController, userController } from '../controllers';
import { authMiddleware } from '../middlewares';

const router = Router();

// Below this line are the public routes
router.use(publicController);

// Below this line are the protected routes
router.use(authMiddleware);

router.use('/user', userController);

export default router;
