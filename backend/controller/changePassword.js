require('dotenv').config()
const mysql = require('mysql')
const jwt = require('jsonwebtoken')

exports.changePassword = async (req, res) => {
    console.log(req.body);
    const { oldPassword, newPassword } = req.body // retrieveing the user credentials
    console.log(oldPassword, newPassword);
}