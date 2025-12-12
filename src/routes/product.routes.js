
const express = require('express')
const createProductCtrl = require('../controller/product/createProductCtrl')
const deleteProductCtrl = require('../controller/product/deleteProductCtrl')
const getProductsByIdCtrl = require('../controller/product/getProductsByIdCtrl')
const getProductListCtrl = require('../controller/product/getProductListCtrl')
const updateProductCtrl = require('../controller/product/updateProductCtrl')
const productRouter = express.Router()

productRouter
    .post('/create', createProductCtrl)
    .delete('/delete/:productId', deleteProductCtrl)
    .get('/byId/:productId', getProductsByIdCtrl)
    .get('/list', getProductListCtrl)
    .put('/update',(req,res,next)=>{console.log('object');next()} ,updateProductCtrl )
module.exports = productRouter