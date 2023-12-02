require('dotenv').config()
const mysql = require('mysql')


exports.getLinks = async (req, res) => {
    try {
        //console.log(req.body);
        const {courseCode, topic } = req.body
        //console.log(courseCode, topic);
        
        const query = "select link_name, links, link_type from topics where courseCode= ? and topic = ?;";
        // const query = "select t.topic, t.mandatory, t.link_name, t.links, t.link_type, duration, "
        //     + "h.action, h.startTime, h.endTime from topics t, history h where t.courseCode = ? and"
        //     + " h.courseCode = ? and h.EmpCode = ?;"; // getting each rows from the topics table for a particular topics 

        Database  = mysql.createConnection({  //creating the connection to db
            host: process.env.SQL_HOST, // location where the sql is hosted
            port: process.env.SQL_PORT, // sql port, by default 3306
            user: process.env.SQL_USER, // in prod, include password , in dev, its the root user
            database: process.env.SQL_DATABASE, // database name declared in env file
        });
        Database.connect((err) => { // connecting with the database
            if (err)
                console.error(`connection distrupted due to error: ${err}`);
            else
                console.log("Connection successful: subTopics");
        });
        Database.query(query, [courseCode, topic], (err, data)=> {
            if (err) {
                console.error(err); // to display the errors that have occured during retrieving the data
            }
            if (data.length > 0) {
                //console.log(data);
                return res.status(202).json(data)
            }
        })
        Database.end(err => {
            if(err)
                console.error(err);
        })
    } catch (error) {
        console.error(error);
    }
}