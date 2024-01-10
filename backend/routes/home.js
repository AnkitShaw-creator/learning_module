const express = require('express')
const route = express.Router()

// file not needed, can be reuse

route.get('/', (req, res) => {
    res.status(200).json({
        "message":"Working as intented in home page",
    })
})

module.exports = route