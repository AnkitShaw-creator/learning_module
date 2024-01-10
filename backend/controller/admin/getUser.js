require('dotenv').config();
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.getUsers = async(req, res) => {
    try {
        console.log(req.body);

        /** query for the authenticating the user and retriving */
        const query = "select * from users u;"; // selecting all the users from database
        
        Database = mysql.createConnection({  //creating the connection to db
            host: process.env.SQL_HOST, // location where the sql is hosted
            port: process.env.SQL_PORT, // sql port, by default 3306
            user: process.env.SQL_USER, // in prod, include password , in dev, its the root user
            database: process.env.SQL_DATABASE, // database name declared in env files
            password: process.env.SQL_PASSWORD, // database password declared in env file
            multipleStatements: true  // set to true as multiple queries are running here in parallel
        });
        Database.connect((err) => { // connecting to the database
            if (err)
                console.error(`connection distrupted due to error: ${err}`);
            else
                console.log("Connection successful: admin-getUsers");
        });
        Database.query(query, [], (err, data) => {
            if (err) {
                res.status(500).json(err)
            }
            if (data.length > 0) {
                //console.log(data);
                res.status(202).json(data)
            }
        })
    } catch (error) {
        console.error(error);
        res.status(500).json(error)
    }
}