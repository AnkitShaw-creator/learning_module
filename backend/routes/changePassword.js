// route that will be taken when the user tries to change the password
require('dotenv').config()
const express = require('express')
const  {changePassword} = require('../controller/changePassword')
const route = express.Router()
route.post('/changePassword', changePassword)

module.exports = route