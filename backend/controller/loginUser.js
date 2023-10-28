require('dotenv').config()
const mysql = require('mysql')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
exports.login = async (req, res) => {
    try {
        console.log(req.body);
        const { EmpCode, password } = req.body // retrieveing the user empcode and password
        
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
                console.log(err);
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
                        const token = jwt.sign({ data: data }, process.env.JWT_SIGN_IN_TOKEN, { expiresIn: '10' })
                        //res.cookie('uid', data[0])
                        //console.log(token);
                        res.cookie('user', token)
                        return res.status(200).json({"message": "Logged in", "userinfo": data})
                    }
                    else {
                        console.log("Login failed");
                        return res.status(404).json({"message": "Login failed, password incorrect"})
                    }
                })
            }
        })
    } catch (error) {
        res.status(500).json({error:error.body})
    }
}

