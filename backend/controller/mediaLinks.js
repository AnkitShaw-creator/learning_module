require('dotenv').config();
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.mediaLinks = async (req, res) => {
    
    try {
        const { courseCode, link_name } = req.body
        const query = 'select id, links, link_type, mandatory from db_dev.topics where courseCode = ? and link_name= ?;';
        Database  = mysql.createConnection({  //creating the connection to db
            host: process.env.SQL_HOST, // location where the sql is hosted
            port: process.env.SQL_PORT, // sql port, by default 3306
            user: process.env.SQL_USER, // in prod, include password , in dev, its the root user
            database: process.env.SQL_DATABASE, // database name declared in env filers
        });
        Database.connect((err) => { // connecting to the database
            if (err)
                console.error(`connection distrupted due to error: ${err}`);
            else
                console.log("Connection successful: loginUser");
        });
        Database.query(query, [courseCode, link_name], (err, data) => {
            if (err){
                console.error(err);
                res.status(500).json({error:err.body})
            }
            if (data.length > 0) {
                //console.log(data);
                res.status(202).json({"message":"link retrieved", "link_data":data})
            }
        }
        )
    }
    catch (err) {
        console.error(err);
        res.status(500).json({error:err.body})
    }
}