// route that will be taken when the user tries to login
require('dotenv').config()
const express = require('express')
const { login } = require('../controller/loginUser')

const route = express.Router()
//route.get('/login', (req, res) => { res.end("Working") }) // for testing 
route.post('/login', login) // login (var) is a controller in the controller folder where the functionality of the login will take place

module.exports = route