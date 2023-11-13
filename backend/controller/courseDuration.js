require('dotenv').config();
const mysql = require('mysql');

exports.courseDuration = async (req, res) => {
    try {
        //console.log(req.body);
        const { EmpCode, courseCode} = req.body // retrieveing the user empcode and password
        
        // console.log(EmpCode, action, course, startDate, endDate);
        const query1 = "select * from history where EmpCode = ? and courseCode = ?;"; // to see if start date and end date exists or not

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
                console.log("Connection successful: courseDuration");
        });
        Database.query(query1, [EmpCode, courseCode], (err, data) => {
            if (err) {
                console.error(err);
                return res.status(404);
            }
            //console.log(data);
            if (data.length > 0) {
                console.log("duration present in history");
                return res.status(202).json(data)
            }
            else {
                return res.status(202).json({"message":"no rows exists", "response_code":1100})
            }
        })
    } catch (error) {
        console.error(error);
    }
}
exports.addDuration = async (req, res) => {
    try {
        //console.log(req.body);
        const { EmpCode, action, courseCode, startDate, endDate } = req.body // retrieveing the user empcode and password
        
        // console.log(EmpCode, action, course, startDate, endDate);
        const query2 = "insert IGNORE into history (EmpCode, action, courseCode, startTime, endTime) values (?, ?, ?, ?, ?);"; // inserting in history


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
                console.log("Connection successful: courseDuration");
        });
        Database.query(query2, [EmpCode, action, courseCode, startDate, endDate], (err, data) => {
            if (err) {
                console.error(err);
                return res.status(404);
            }
            //console.log(data);
            if (data.affectedRows === 1) {
                return res.status(202).json(data)
            }
        })
    } catch (error) {
        console.error(error);
    }
}