require('dotenv').config()
const express = require('express')
const { courseDuration, addDuration } = require('../controller/courseDuration')


const route = express.Router()
route.post('/courseDuration', courseDuration) 
route.post('/courseDuration/add',addDuration)
module.exports = route