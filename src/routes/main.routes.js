
const express = require ('express')
const swaggerRouter = require('./swagger.routes')
const categoryRouter = require('./category.routes')
const mainRouter = express.Router()

mainRouter
    .use('/api-docs', swaggerRouter)
    .use('/category',categoryRouter)

module.exports = mainRouter