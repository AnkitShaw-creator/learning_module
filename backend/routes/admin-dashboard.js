const express = require('express')
const route = express.Router()
const { getCharts } = require('../controller/admin/dashboardChart')
const { addUser, addAdmin } = require('../controller/admin/addUser');
// file not needed, can be reuse

route.get('/dashboard/charts', getCharts);

module.exports = route;
