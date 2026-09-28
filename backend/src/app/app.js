import express from "express"
import appRoutes from "../routes/auth.routes.js"
import cookieParser from 'cookie-parser'
import productesRoutes from '../routes/product.routes.js'
import cartRoutes from '../routes/cart.routes.js'

const app = express()

app.use(cookieParser())

app.use(express.json())

app.use('/api/auth', appRoutes)
app.use('/api/products', productesRoutes)
app.use('/api/cart', cartRoutes)


export default app