// route that will be taken when the user tries to retrieve course details
require('dotenv').config()
const express = require('express')
const {courseDetail} = require('../controller/courseDetail')
const { addCheckpoints } = require('../controller/checkpoints')

const route = express.Router()
route.post('/course-content', courseDetail)
route.post('/course-content/addcheckpoints', addCheckpoints) // route to save a history when a video is marked as completed

module.exports = route