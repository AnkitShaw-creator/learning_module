// route that will be taken when the user tries to login
require('dotenv').config()
const express = require('express')
const mysql = require('mysql');
const multer = require('multer');
const { editImage } = require('../controller/editImage')
const path = require('path');
const fs = require('fs');

const route = express.Router()
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_profile_image_" + Math.floor(Math.random() * (1000000 - 1)) + "_" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage
})
route.post('/editImg', upload.single('image'), (req, res) => {
    try {
        //console.log(req);
        const image = req.file.filename;
        const user = req.body.user
        //console.log(image, user);
        const query = "SELECT img from users where EmpCode = ?;"
            + "UPDATE users SET img = ? where EmpCode = ?;";
        Database  = mysql.createConnection({  //creating the connection to db
            host: process.env.SQL_HOST,
            port: process.env.SQL_PORT, 
            user: process.env.SQL_USER,    // in prod, include password
            password: process.env.SQL_PASSWORD, // database password declared in env file
            database: process.env.SQL_DATABASE,
            multipleStatements: true
        });
        Database.connect((err) => { // connecting with the database
            if (err)
                console.error(`connection distrupted due to error: ${err}`);
            else
                console.log("Connection successful: loginUser");
        });
        Database.query(query, [user, image, user], (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).json({"message":"upload failed"})
            }
            else {
                console.log(data[0][0].img);
                fs.unlink(`public\\images\\${data[0][0].img}`,(err => {
                    if (err) console.log(err); 
                    else { 
                        console.log(`\nDeleted file: ${data[0][0].img}`); 
                    }
                }))
                console.log("upload successful");
                return res.status(202).json({"message":"upload was successful", "data":image})
            }

        })
    }catch (error) {
        
    }
})
module.exports = route