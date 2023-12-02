require('dotenv').config()
const mysql = require('mysql')

exports.addCheckpoints = async (req, res) => {
    try {
        const { EmpCode, courseCode, chapterId } = req.body
        const query = "insert into checkpoints (EmpCode, action, courseCode, startTime, endTime, chapterID) "+
            "values (?, ?, ?, ?, ?, ?);";
        const query1 = "select * from db_dev.checkpoints c  where c.EmpCode = ? and c.action = ? and c.courseCode = ? and chapterID = ? ;";
        const currentDate = new Date().toISOString().slice(0,10)
        
        Database  = mysql.createConnection({  //creating the connection to db
            host: process.env.SQL_HOST, // location where the sql is hosted
            port: process.env.SQL_PORT, // sql port, by default 3306
            user: process.env.SQL_USER, // in prod, include password , in dev, its the root user
            database: process.env.SQL_DATABASE, // database name declared in env file
            multipleStatements: true
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
                //console.log(data);
                Database.query(query, [EmpCode, 'completed', courseCode, currentDate, currentDate, chapterId], (error, Data) => {
                    if (error) {
                        console.error(error);
                        return res.status(404).json(error);
                    }
                    //console.log(Data);
                    if (Data.affectedRows === 1) {
                        console.log(" checkpoint saved");
                        return res.status(202).json({"message":"checkpointsaved"})
                    }
                    
                })
            }
            else {
                res.status(202).json({"message":"chapter already present", "data":data})
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