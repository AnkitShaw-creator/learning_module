require('dotenv').config()
const mysql = require('mysql')


exports.courseDetail = async (req, res) => {
    try {
        console.log(req.body);
        const { EmpCode, courseCode } = req.body
        
        const query = "select distinct t.topic, t.mandatory, t.duration, c.courseName, "
            + "cp.action, cp.startTime, cp.endTime from topics t, checkpoints cp, courses c where t.courseCode = ? and"
            + " cp.courseCode = ? and cp.EmpCode = ? and c.courseCode = ? and cp.action = ?;"; // getting each rows from the topics table for a particular topics 
        
        //const query = "select distinct t.topic, t.mandatory, t.duration from topics t where courseCode = ?;";
        
        Database = mysql.createConnection({
            host: process.env.SQL_HOST, // location where the sql is hosted
            port: process.env.SQL_PORT, // sql port, by default 3306
            user: process.env.SQL_USER, // in prod, include password , in dev, its the root user
            password: process.env.SQL_PASSWORD, // database password declared in env file
            database: process.env.SQL_DATABASE, // database name declared in env file
        });
        Database.connect((err) => {
            if (err)
                console.error(`connection distrupted due to error: ${err}`);
            else
                console.log("courseDetail: connection successful");
        })
        Database.query(query, [courseCode, courseCode, EmpCode, courseCode, 'started'], (err, data) => {
            if (err)
                console.error(err);
            if (data.length > 0){
                // console.log(data)
                res.status(202).json(data);
            }

        })
    }
    catch (err) {
        console.error(err);
    }
}