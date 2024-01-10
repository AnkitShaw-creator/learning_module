const express = require('express')
const route = express.Router()
const { getTopics, getCourseOptions } = require('../controller/admin/getTopics')
const { addTopics } = require('../controller/admin/addTopics')
// file not needed, can be reuse

route.get('/topics', getTopics)
route.get('/courseOptions', getCourseOptions)
route.post('/addtopics', addTopics)

module.exports = route;
