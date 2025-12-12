const express = require('express')
const createUserCtrl = require('../controller/user/createUserCtrl')
const loginUserCtrl = require('../controller/user/loginUserCtrl')
const userRouter = express.Router()

userRouter
    .post('/register',createUserCtrl)
    .post('/login',loginUserCtrl)
module.exports = userRouter 