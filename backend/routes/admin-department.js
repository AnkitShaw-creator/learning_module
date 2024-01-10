// route that will be taken when the user tries to login
require('dotenv').config()
const express = require('express');
const { getDepartment, addDepartments } = require('../controller/admin/department')

const route = express.Router()
route.get('/admin/department', getDepartment);
route.post('/admin/addDepartment', addDepartments);
module.exports = route;
