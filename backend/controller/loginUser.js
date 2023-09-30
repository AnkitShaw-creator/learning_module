//const {userAuth} = require('../database/Database')

require('dotenv').config()
const mysql = require('mysql')

exports.login = async (req, res) => {
    try {
        
        console.log(req.body);
        const { username, password } = req.body
        console.log(username, password);
        const query = "SELECT * FROM login WHERE username =  ?  AND password =  ? ;";
        // const val = [email, password]
        
        Database  = mysql.createConnection({   // to be move to another file, for accessing from differnt module
            host: process.env.SQL_HOST,
            port: process.env.SQL_PORT,
            user: process.env.SQL_USER,
            password: process.env.SQL_PASSWORD,
            database: process.env.SQL_DATABASE
        });
        Database.connect((err) => {
            if (err)
                console.log(err);
            else
                console.log("Connection successful");
        });
        

        Database.query(query, [username, password], (err, data) => {
            if (err) {
                console.log("query ran successfully");
                throw err
            }console.log(data);
            //return res.status(200).json({"message":"data found"})
            if (data.length > 0){
                console.log("Login successful");
                return res.status(200).json({"message": "Logged in"})
            }else {
                console.log("Login failed");
                return res.status(404).json({"message":"Login failed"})
            }
        })

        

    } catch (error) {
        res.status(500).json({error:error.body})
    }

    
    // const rows = await userAuth(email, password)
    // if (rows.length > 0) {
    //     res.status(200).json({message:"login successful"});
    // }
    // else {
    //     res.status(500).json({message:"login failed"})
    // }
}

