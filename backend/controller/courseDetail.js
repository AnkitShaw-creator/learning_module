require('dotenv').config()
const mysql = require('mysql')


exports.courseDetail = async (req, res) => {
    try {
        console.log(req.body);
        const { courseName } = req.body
        
        const query = 'select * from topics where topic = ?;'; // getting each rows from the topics table for a particular topics 
        Database  = mysql.createConnection({
            host: process.env.SQL_HOST,
            port: process.env.SQL_PORT,
            user: process.env.SQL_USER,   // in PROD, include password to the db connect for extra layer of security
            database: process.env.SQL_DATABASE
        });
        Database.connect((err) => {
            if (err)
                console.error(err);
            else
                console.log("courseDetail: connection successful");
        })
        Database.query(query, [courseName], (err, data) => {
            if (err)
                console.error(err);
            if (data.length > 0){
                console.log(data)
                res.status(202).json(data);
            }

        })
    }
    catch (err) {
        console.error(err);
    }
}