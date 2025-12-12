
const express = require ('express')
const swaggerRouter = require('./swagger.routes')
const categoryRouter = require('./category.routes')
const productRouter = require('./product.routes')
const mainRouter = express.Router()

mainRouter
    .use('/api-docs', swaggerRouter)
    .use('/category',categoryRouter)
    .use('/product',productRouter)

module.exports = mainRouter