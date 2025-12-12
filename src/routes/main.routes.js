
const express = require ('express')
const swaggerRouter = require('./swagger.routes')
const categoryRouter = require('./category.routes')
const productRouter = require('./product.routes')
const partyRoutes = require('./party.routes')
const userRouter = require('./user.routes')
const mainRouter = express.Router()

mainRouter
    .use('/api-docs', swaggerRouter)
    .use('/category',categoryRouter)
    .use('/product',productRouter)
    .use('/supplier',partyRoutes)
    .use('/users',userRouter)
module.exports = mainRouter