require('dotenv').config();
const mysql = require('mysql');

exports.courseDuration = async (req, res) => {
    try {
        //console.log(req.body);
        const { EmpCode, courseCode} = req.body // retrieveing the user empcode and password
        
        // console.log(EmpCode, action, course, startDate, endDate);
        const query1 = "select count(chapterID) as count_topic_completed from checkpoints c  where EmpCode = ? and courseCode = ? and action = 'completed';" // to see if start date and end date exists or not
            + "select count(links) as count_topic from topics t where courseCode = ?;";
        Database  = mysql.createConnection({  //creating the connection to db
            host: process.env.SQL_HOST, // location where the sql is hosted
            port: process.env.SQL_PORT, // sql port, by default 3306
            user: process.env.SQL_USER, // in prod, include password , in dev, its the root user
            password: process.env.SQL_PASSWORD, // database password declared in env file
            database: process.env.SQL_DATABASE, // database name declared in env file
            multipleStatements: true
        });
        Database.connect((err) => { // connecting with the database
            if (err)
                console.error(`connection distrupted due to error: ${err}`);
            else
                console.log("Connection successful: courseDuration");
        });
        Database.query(query1, [EmpCode, courseCode, courseCode], (err, data) => {
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
        const query = "select * from checkpoints where EmpCode = ? and courseCode = ? and action = 'started';" +
            "select min(id) as ID from topics where courseCode = ?;";
        const query2 = "insert into checkpoints (EmpCode, action, courseCode, startTime, endTime) values (?, ?, ?, ?, ?);" + // inserting in history
            "select min(id) as ID from topics where courseCode = ?;";

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
                console.log("Connection successful: courseDuration");
        });
        Database.query(query, [EmpCode, courseCode, courseCode], (err, data) => {
            if (err) {
                console.error(err);
                return res.status(404);
            }
            //console.log(data);
            if (data.length < 1) {
                Database.query(query2, [EmpCode, action, courseCode, startDate, endDate], (ERR, DATA) => {
                    
                    if (ERR) {
                        console.error(err);
                        return res.status(404).json(ERR);
                    }
                    if(DATA.affectedRows ===  1){
                        return res.status(202).json(DATA)
                    }
                })
                
            }
            else {
                res.status(202).json({"message":"Data already present in checkpoints DB", "data":data[1]})
            }
        })
    } catch (error) {
        console.error(error);
    }
}