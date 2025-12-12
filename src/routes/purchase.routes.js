
const express = require('express');
const adminMiddleware = require('../middleware/adminMIddleWare');
const createPurchaseCtrl = require('../controller/purchase/createPurchaseCtrl');
const addItemToPurchaseCtrl = require('../controller/purchase/addItemToPurchaseCtrl');
const deleteItemFromPurchaseCtrl = require('../controller/purchase/deleteItemFromPurchaseCtrl');
const deletePurchaseBillCtrl = require('../controller/purchase/deletePurchaseBillCtrl');
const editPurchaseItemCtrl = require('../controller/purchase/editPurchaseItemCtrl');
const getpurchaseBillCtrl = require('../controller/purchase/getpurchaseBillCtrl');
const getPurchaseListCtrl = require('../controller/purchase/getPurchaseListCtrl');
const purchaseRouter = express.Router();

purchaseRouter
.post('/create',adminMiddleware,createPurchaseCtrl)
.post('/add-item',adminMiddleware,addItemToPurchaseCtrl)
.delete('/delete-item',adminMiddleware,deleteItemFromPurchaseCtrl)
.delete('/delete-purchase-bill/:purchaseId',adminMiddleware,deletePurchaseBillCtrl)
.put('/edit-item',adminMiddleware, editPurchaseItemCtrl)  
.get('/get-purchase-bill/:purchaseId',getpurchaseBillCtrl)
.get('/list',getPurchaseListCtrl)

module.exports = purchaseRouter;