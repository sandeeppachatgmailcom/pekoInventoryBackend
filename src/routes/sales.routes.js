
const express = require('express');
const adminMiddleware = require('../middleware/adminMIddleWare');
const createBillCtrl = require('../controller/sales/createBillCtrl');
const addItemsToBillCtrl = require('../controller/sales/addItemsToBillCtrl');
const deleteSalesBillCtrl = require('../controller/sales/deleteSalesBillCtrl');
const deleteitemsFromBillCtrl = require('../controller/sales/deleteitemsFromBillCtrl');
const salesRouter = express.Router();

salesRouter
    .post('/create-bill',adminMiddleware,createBillCtrl)
    .post('/add-item',adminMiddleware,addItemsToBillCtrl)
    .delete('/delete-bill/:salesId',adminMiddleware,deleteSalesBillCtrl)
    .delete('/delete-item',adminMiddleware,deleteitemsFromBillCtrl) 

module.exports = salesRouter