const express = require('express')
const createCategoryCtrl = require('../controller/category/createCategoryCtrl')
const deleteCategoryCtrl = require('../controller/category/deleteCategoryCtrl')
const readCategoryByIdCtrl = require('../controller/category/readCategoryByIdCtrl')
const getCategoryListCtrl = require('../controller/category/getCategoryListCtrl')
const updateCategoryCtrl = require('../controller/category/updateCategoryCtrl')
const adminMiddleware = require('../middleware/adminMIddleWare')
const categoryRouter = express.Router()

categoryRouter
    .post('/create',adminMiddleware, createCategoryCtrl)
    .delete('/delete/:categoryId',adminMiddleware, deleteCategoryCtrl)
    .get('/readById/:categoryId',readCategoryByIdCtrl)
    .get('/list',getCategoryListCtrl)
    .put('/update/:categoryId',adminMiddleware, updateCategoryCtrl)
module.exports = categoryRouter