const express = require('express')
const route = express.Router()
const { getSyllabus } = require('../controller/admin/getSyllabus')
const { addSyllabus } = require('../controller/admin/addSyllabus')
// file not needed, can be reuse

route.get('/syllabus', getSyllabus)
route.post('/addsyllabus', (req, res) => {})

module.exports = route;
