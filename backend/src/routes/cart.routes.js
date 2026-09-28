import {Router} from 'express'
import { authMiddleware } from '../middlewares/auth.mmiddleware.js'
import { addToCartController, getCart } from '../controller/cart.controller.js'
import { addToCartValidator } from '../validator/cart.validator.js'

const router = Router()

router.post('/', authMiddleware, addToCartValidator, addToCartController )

router.get('/', authMiddleware, getCart)

export default router