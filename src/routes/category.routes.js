const express = require('express')
const createCategoryCtrl = require('../controller/category/createCategoryCtrl')
const deleteCategoryCtrl = require('../controller/category/deleteCategoryCtrl')
const readCategoryByIdCtrl = require('../controller/category/readCategoryByIdCtrl')
const getCategoryListCtrl = require('../controller/category/getCategoryListCtrl')
const updateCategoryCtrl = require('../controller/category/updateCategoryCtrl')
const categoryRouter = express.Router()

categoryRouter
    .post('/create',createCategoryCtrl)
    .delete('/delete/:categoryId',deleteCategoryCtrl)
    .get('/readById/:categoryId',readCategoryByIdCtrl)
    .get('/list',getCategoryListCtrl)
    .put('/update/:categoryId',updateCategoryCtrl)
module.exports = categoryRouter