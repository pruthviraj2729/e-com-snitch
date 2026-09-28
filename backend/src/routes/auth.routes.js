import {Router} from 'express'
import { loginValidator, registerValidator } from '../validator/auth.validator.js';
import { getMe, loginController, refreshTokenController, registerController } from '../controller/auth.controller.js';
import { authMiddleware } from '../middlewares/auth.mmiddleware.js';

const router = Router();

router.post('/register', registerValidator, registerController)
router.post('/login', loginValidator, loginController)
router.post('/refresh-token', refreshTokenController)
router.get('/getMe', authMiddleware, getMe)

export default router