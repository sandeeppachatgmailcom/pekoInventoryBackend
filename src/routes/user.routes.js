const express = require('express')
const createUserCtrl = require('../controller/user/createUserCtrl')
const loginUserCtrl = require('../controller/user/loginUserCtrl')
const adminMiddleware = require('../middleware/adminMIddleWare')
const userRouter = express.Router()

userRouter
    .post('/register',adminMiddleware,createUserCtrl)
    .post('/login',loginUserCtrl)
module.exports = userRouter 