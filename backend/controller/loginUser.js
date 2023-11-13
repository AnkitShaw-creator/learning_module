require('dotenv').config();
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.login = async (REQ, RES) => {
    try {
        console.log(REQ.body);
        const { EmpCode, password } = REQ.body // retrieveing the user empcode and password
        
        //console.log(EmpCode, password);
        const query = "SELECT * FROM users WHERE EmpCode = ?"; // query for the authenticating the user

        
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
        
        // quering the database to check if the combination of username and password exists or not
        Database.query(query, [EmpCode], (err, data) => { 
            if (err) {
                console.error(err); // to display the errors that have occured during retrieving the data
            }
            if (data.length > 0) {
                bcrypt.compare(password, data[0].password).then((res) => {
                    // checking where the password hash in db is matching with the enter password
                    if (res) {
                        console.log("Login successful");
                        const token = jwt.sign({ data: data }, process.env.JWT_SIGN_IN_TOKEN,)
                        //res.cookie('uid', data[0])
                        //console.log(token);
                        RES.cookie('user', token)
                        return RES.status(200).json({"message": "Logged in", "userinfo": data})
                    }
                    else {
                        console.log("Login failed");
                        return RES.status(400).json({"message": "Login failed, password incorrect"})
                    }
                })
            }
        })
    } catch (error) {
        RES.status(500).json({error:error.body})
    }
}

