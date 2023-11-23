require('dotenv').config();
const mysql = require('mysql');
const multur = require('multer')
const path = require('path')
const editImage = async (req, res) => {
    try {
        console.log(req.file.filename);


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
    } catch (error) {
        
    }
}