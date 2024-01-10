const express = require('express')
const route = express.Router();
const path = require('path');
const mysql = require('mysql')
const fs = require('fs');
const multer = require('multer')
const csv = require('csv-parser');
const { getUsers } = require('../controller/admin/getUser')
const { addUser, addAdmin } = require('../controller/admin/addUser');
// file not needed, can be reuse

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/files')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
const upload = multer({
    storage: storage
})


route.get('/users', getUsers);
route.post('/adduser', addUser);

route.post('/addadmin', addAdmin);

route.post('/users/bulkupload', upload.single('file'), (req, res) => {
    try {
        const file = req.file.path;
        
        const query = "insert into users (EmpCode, FirstName, MIddleName, LastName, email, password, role, DOJ, primaryDept, designation) " +
        "values (?, ?, ?, ?, ?, '$2a$10$FB7OMfPrMYAX0x0Hw / XeseKKz5SQxcew / 4qwL7s9QReHEeHoz1mS2', ?, ?, ?, ?);";

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

        fs.createReadStream(req.file.path)
            .pipe(csv())
            .on('data', (row) => {
                console.log(row);
                Database.query(query, [row.EmpCode, row.FirstName, row.MIddleName, row.LastName,
                    row.email, row.role, row.DOJ, row.primaryDept, row.designation], (err, data) => {
                    if (err) {
                        console.error(err);
                        res.status(503).json(err);
                    }
                    if (data) {
                        console.log(data);
                        res.status(202).json({ "message":"CSV file successfully processed and appended to database"});
                    }
                })
            })
            .on('end', () => {
                console.log('CSV file successfully processed and appended to database');
            });
        
    } catch (error) {
        console.error(error);
    }
})
module.exports = route;
