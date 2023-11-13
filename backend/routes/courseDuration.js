require('dotenv').config()
const express = require('express')
const { courseDuration, addDuration } = require('../controller/courseDuration')


const route = express.Router()
route.post('/courseDuration', courseDuration) // creating a route 
route.post('/courseDuration/add',addDuration)
module.exports = route