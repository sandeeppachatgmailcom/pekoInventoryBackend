
const express = require('express')
const createPartyCtrl = require('../controller/party/createPartyCtrl')
const adminMiddleware = require('../middleware/adminMIddleWare')
const partyRoutes = express.Router()

partyRoutes.post('/create',adminMiddleware,createPartyCtrl)

module.exports = partyRoutes