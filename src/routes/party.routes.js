
const express = require('express')
const createPartyCtrl = require('../controller/party/createPartyCtrl')
const partyRoutes = express.Router()

partyRoutes.post('/create',createPartyCtrl)

module.exports = partyRoutes