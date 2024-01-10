require('dotenv').config()
const mysql = require('mysql')

exports.addCheckpoints = async (req, res) => {
    try {
        //console.log(req.body);
        const { EmpCode, courseCode, chapterId, durationWatched, totalVideoLength } = req.body
        const query = "insert into checkpoints (EmpCode, action, courseCode, startTime, endTime, chapterID, duration_watched, total_duration) "+
            "values (?, ?, ?, ?, ?, ?, ?, ?);";
        const query1 = "select * from checkpoints c  where c.EmpCode = ? and c.action = ? and c.courseCode = ? and chapterID = ? ;";
        const currentDate = new Date().toISOString().slice(0,10)
        
        Database  = mysql.createConnection({  //creating the connection to db
            host: process.env.SQL_HOST, // location where the sql is hosted
            port: process.env.SQL_PORT, // sql port, by default 3306
            user: process.env.SQL_USER, // in prod, include password , in dev, its the root user
            database: process.env.SQL_DATABASE, // database name declared in env file
            password: process.env.SQL_PASSWORD, // database password declared in env file
        });
        Database.connect((err) => { // connecting with the database
            if (err)
                console.error(`connection distrupted due to error: ${err}`);
            else
                console.log("Connection successful: checkpoints");
        });
        Database.query(query1, [EmpCode, 'completed', courseCode, chapterId], (err, data) => {
            if (err) {
                console.error(err);
                return res.status(404);
            }
            if(data.length < 1) { //insert only if the chapter is not already present in the table
                console.log(data);
                Database.query(query, [EmpCode, 'completed', courseCode, currentDate, currentDate, chapterId, durationWatched, totalVideoLength], (error, Data) => {
                    if (error) {
                        console.error(error);
                        return res.status(404).json(error);
                    }
                    //console.log(Data);
                    if (Data.affectedRows === 1) {
                        //console.log(" checkpoint saved");
                        return res.status(202).json({"message":"Checkpoint saved"})
                    }
                    
                })
            }
            else {
                res.status(202).json({"message":"The chapter was already marked as complete", "data":data})
            }
        })
        // Database.query(query, [EmpCode, 'completed', courseCode, currentDate, currentDate, chapterId], (err, data) => {
        //     if (err) {
        //         console.error(err);
        //         return res.status(404);
        //     }
        //     //console.log(data);
        //     if (data.affectedRows === 1) {
        //         console.log(" checkpoint saved");
        //         return res.status(202).json({"message":" checkpointsaved"})
        //     }
            
        // })
    } catch (err) {
        console.error(err);
    }
}