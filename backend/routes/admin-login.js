// route that will be taken when the user tries to login
require('dotenv').config()
const express = require('express')
const { adminLogin } = require('../controller/admin/adminLogin')

const route = express.Router()
//route.get('/login', (req, res) => { res.end("Working") }) // for testing 
route.post('/admin/login', adminLogin) // login (var) is a controller in the controller folder where the functionality of the login will take place

module.exports = route