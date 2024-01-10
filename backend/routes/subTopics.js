// route that will be taken when the user tries to login
require('dotenv').config()
const express = require('express')
const {getLinks} = require('../controller/subTopics')
const route = express.Router()
//route.get('/login', (req, res) => { res.end("Working") }) // for testing
// this file is being used in the sidenav to generate the navlist based on the various topics 
// to get see how the media is being retrieved go to medialinks file
route.post('/subtopics', getLinks) // login (var) is a controller in the controller folder where the functionality of the login will take place

module.exports = route