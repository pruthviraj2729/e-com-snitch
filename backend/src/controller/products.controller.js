import productModel from "../model/product.model.js";
import { sendFiles } from "../services/products.services.js";


export const createProductsController = async(req, res) => {
    console.log(req.body);
    console.log(req.files)

    const filesUrls = []

    for(let i=0; i<req.files.length; i++){
        const response= await sendFiles({
            buffer: req.files[i].buffer,
            fileName: req.files[i].originalname
        })

        filesUrls.push(response.url)
    }

    const product = await productModel.create({
        title: req.body.title,
        description: req.body.description,
        price: {
            amount: req.body.price.amount,
            currency: req.body.price.currency
        },
        sizes: req.body.sizes,
        images: filesUrls,
        seller: req.user.userId
    })
    res.status(201).json({
        message: "product created successfully",
        data: {
            product
        }
    })
}


export async function listAllProductrs(req,res) {
    const products = await productModel.find({published: true})

    res.status(200).json({
        message: "products created successfully",
        data: {
            products
        }
    })
}

export async function listAllProductsToSeller(req, res) {
    const products = await productModel.find({})

    return res.status(200).json({
        message: "All products featched successfully",
        data: {
            products
        }
    })
}

export async function unlistProduct(req, res) {
    const {id} = req.params

    const product = await productModel.findById(id)

    if(!product) {
        return res.status(404).json({
            message: "product not found by id"
        })
    }

    await productModel.findByIdAndUpdate(id, {
        published: false
    })

    return res.status(200).json({
        message: "product unpublished successfully"
    })
}


export async function listProduct(req, res) {
    const {id} = req.params

    const product = await productModel.findById(id)

    if (!product) {
        return res.status(404).json({
            message: "product not found by id"
        })
    }

    await productModel.findByIdAndUpdate(id, {
        published: true
    })

    return res.status(200).json({
        message: "product published successfully"
    })
}