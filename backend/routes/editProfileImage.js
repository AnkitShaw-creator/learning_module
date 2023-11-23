// route that will be taken when the user tries to login
require('dotenv').config()
const express = require('express')
const mysql = require('mysql');
const { editImage } = require('../controller/editImage')
const multer = require('multer')
const path = require('path')

const route = express.Router()
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_profile_image_" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage
})
route.post('/editImg', upload.single('image'), (req, res) => {
    try {  
        const image = req.file.filename;
        const user = '011235'
        console.log(image, user);
        const query = "UPDATE users SET img = ? where EmpCode = ?;";
        Database  = mysql.createConnection({  //creating the connection to db
            host: process.env.SQL_HOST,
            port: process.env.SQL_PORT, 
            user: process.env.SQL_USER,    // in prod, include password
            database: process.env.SQL_DATABASE
        });
        Database.connect((err) => { // connecting with the database
            if (err)
                console.error(`connection distrupted due to error: ${err}`);
            else
                console.log("Connection successful: loginUser");
        });
        Database.query(query, [image, user], (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).json({"message":"upload failed"})
            }
            else {
                console.log("upload successful");
                // res.cookie('prf_img', image)
                return res.status(202).json({"message":"upload was successful", "data":image})
            }

        })
    } catch (error) {
        
    }
})
module.exports = route