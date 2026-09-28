import { json, Router } from "express"
import { authMiddleware, authenticateSeller } from "../middlewares/auth.mmiddleware.js"
import  {createProductsController, listAllProductrs, listAllProductsToSeller, listProduct, unlistProduct} from "../controller/products.controller.js"
import multer from "multer"
import {createProductValidator, listProductValidator, unlistProductValidator} from '../validator/product.validator.js'

const router = Router()

/**
 * @method POST
 * @route /api/products/
 * @description creates the product and save its data into the DB, images will be store on imagekit.
 * req.body=>{title,description:price:{amount,currency},sizes:[{size,stock},{size,stock}]}
 */

const upload = multer({storage: multer.memoryStorage(),
    limits:{
        files: 1,
        fileSize:1*1024*1024
    }
})

router.post('/', authMiddleware, authenticateSeller, upload.array("images"),
(req,res,next) => {
    req.body?.price && (req.body.price = JSON.parse(req.body.price))
    req.body?.sizes && (req.body.sizes = JSON.parse(req.body.sizes))

    next()
},createProductValidator,createProductsController)


router.get('/', authMiddleware, listAllProductrs)

router.get('/seller', authMiddleware, authenticateSeller, listAllProductsToSeller)

router.patch('/list/:id', authMiddleware, authenticateSeller, listProductValidator,listProduct)

router.patch('/unlist/:id', authMiddleware, authenticateSeller, unlistProductValidator,unlistProduct )



export default router