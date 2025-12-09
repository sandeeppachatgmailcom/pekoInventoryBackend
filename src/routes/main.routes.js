
const express = require ('express')
const swaggerRouter = require('./swagger.routes')
const mainRouter = express.Router()

mainRouter.use('/api-docs', swaggerRouter)

module.exports = mainRouter