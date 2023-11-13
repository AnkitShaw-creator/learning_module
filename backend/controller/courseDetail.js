require('dotenv').config()
const mysql = require('mysql')


exports.courseDetail = async (req, res) => {
    try {
        console.log(req.body);
        const { courseCode, user } = req.body
        
        const query = "select distinct t.topic, t.mandatory, duration, "
            + "h.action, h.startTime, h.endTime from topics t, history h where t.courseCode = ? and"
            + " h.courseCode = ? and h.EmpCode = ?;"; // getting each rows from the topics table for a particular topics 
        
        //const query = "select distinct t.topic, t.mandatory, t.duration from topics t where courseCode = ?;";
        
        Database = mysql.createConnection({
            host: process.env.SQL_HOST,
            port: process.env.SQL_PORT,
            user: process.env.SQL_USER,   // in PROD, include password to the db connect for extra layer of security
            database: process.env.SQL_DATABASE
        });
        Database.connect((err) => {
            if (err)
                console.error(`connection distrupted due to error: ${err}`);
            else
                console.log("courseDetail: connection successful");
        })
        Database.query(query, [courseCode, courseCode, user], (err, data) => {
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