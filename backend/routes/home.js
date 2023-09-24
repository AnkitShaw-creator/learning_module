const express = require('express')

const route = express.Router()

route.get('/home', (req, res) => {
    res.status(200).json({
        "message":"Working as intented in home page",
    })
})

module.exports = route