require('dotenv').config()
const mysql = require('mysql')
const jwt = require('jsonwebtoken')
exports.login = async (req, res) => {
    try {
        
        console.log(req.body);
        const { EmpCode, password } = req.body // retrieveing the user credentials
        console.log(EmpCode, password);
        const query = "SELECT * FROM users WHERE EmpCode =  ?  AND password =  ? ;"; // query for the authenticating the user

        
        Database  = mysql.createConnection({   // to be move to another file, for accessing from differnt module
            host: process.env.SQL_HOST,
            port: process.env.SQL_PORT,
            user: process.env.SQL_USER,
            password: process.env.SQL_PASSWORD,
            database: process.env.SQL_DATABASE
        });
        Database.connect((err) => { // setting up the connection with the database
            if (err)
                console.log(err);
            else
                console.log("Connection successful: loginUser");
        });
        
        // quering the database to check if the combination of username and password exists or not
        Database.query(query, [EmpCode, password], (err, data) => { 
            if (err) {
                console.log("query ran successfully:loginUser");
                throw err
            } //console.log(data);
            if (data.length > 0){
                console.log("Login successful");
                const token = jwt.sign({ data: data }, process.env.JWT_SIGN_IN_TOKEN, { expiresIn: '10' })
                console.log(token);
                res.cookie('user', token)
                return res.status(200).json({"message": "Logged in", "userinfo": data})
            }else {
                console.log("Login failed");
                return res.status(404).json({"message":"Login failed"})
            }
        })
    } catch (error) {
        res.status(500).json({error:error.body})
    }
}

