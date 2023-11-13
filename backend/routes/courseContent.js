// route that will be taken when the user tries to retrieve course details
require('dotenv').config()
const express = require('express')
const {courseDetail} = require('../controller/courseDetail')

const route = express.Router()
route.post('/course-content', courseDetail)
module.exports = route