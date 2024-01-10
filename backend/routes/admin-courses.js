const express = require('express')
const route = express.Router()
const { getCourses } = require('../controller/admin/getCourses')
const { addCourses } = require('../controller/admin/addCourses')
// file not needed, can be reuse

route.get('/courses', getCourses)
route.post('/addCourses', addCourses)
module.exports = route;
