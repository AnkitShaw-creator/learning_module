require('dotenv').config()
const express = require('express')
const { mediaLinks } = require('../controller/mediaLinks')
const route = express.Router()
//route.get('/login', (req, res) => { res.end("Working") }) // for testing 
route.post('/media', mediaLinks) //  route to retrieve the media from backend
module.exports = route