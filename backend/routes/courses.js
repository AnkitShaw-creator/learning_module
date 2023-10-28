require('dotenv').config()
const express = require('express')
const { courses } = require('../controller/userCourses')

const route = express.Router()
//route.get('/login', (req, res) => { res.end("Working") }) // for testing 
route.post('/courses', courses) // login (var) is a controller in the controller folder where the functionality of the login will take place

module.exports = route  