// route that will be taken when the user tries to login
require('dotenv').config()
const express = require('express')
const {getLinks} = require('../controller/subTopics')
const route = express.Router()
//route.get('/login', (req, res) => { res.end("Working") }) // for testing 
route.post('/subtopics', getLinks) // login (var) is a controller in the controller folder where the functionality of the login will take place

module.exports = route