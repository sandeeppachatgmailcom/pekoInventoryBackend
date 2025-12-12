const express = require('express')
const createUserCtrl = require('../controller/user/createUserCtrl')
const loginUserCtrl = require('../controller/user/loginUserCtrl')
const adminMiddleware = require('../middleware/adminMIddleWare')
const logOutUserCtrl = require('../controller/user/logOutUserCtrl')
const userRouter = express.Router()

userRouter
    .post('/register',adminMiddleware,createUserCtrl)
    .post('/login',loginUserCtrl)
    .post('/logout',logOutUserCtrl)
module.exports = userRouter 