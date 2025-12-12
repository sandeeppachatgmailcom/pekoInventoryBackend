
const express = require('express')
const createProductCtrl = require('../controller/product/createProductCtrl')
const deleteProductCtrl = require('../controller/product/deleteProductCtrl')
const getProductsByIdCtrl = require('../controller/product/getProductsByIdCtrl')
const getProductListCtrl = require('../controller/product/getProductListCtrl')
const updateProductCtrl = require('../controller/product/updateProductCtrl')
const adminMiddleware = require('../middleware/adminMIddleWare')
const productRouter = express.Router()

productRouter
    .post('/create',adminMiddleware, createProductCtrl)
    .delete('/delete/:productId',adminMiddleware, deleteProductCtrl)
    .get('/byId/:productId', getProductsByIdCtrl)
    .get('/list', getProductListCtrl)
    .put('/update',adminMiddleware,updateProductCtrl )
module.exports = productRouter