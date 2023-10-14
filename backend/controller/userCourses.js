require('dotenv').config()
const mysql = require('mysql')


exports.courses = async (req, res) => {
    try {
        console.log("request body:",req.body);
    
        // const department = "IT"
        // const role = "dev"
        const { department, role } = req.body
        
        // for developement purpose only, the value should be dynamically set
        //console.log(department, role);
        const query = "select * from courses where department = ? and role = ? ;"; //query for retrieveing the data from courses table
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
                console.log("Connection successful:userCourse");
        })

        Database.query(query, ["IT", "dev"], (err, data) => {
            if (err) {
                console.log(err);
            }
            if (data.length > 0) {
                console.log(data);
                console.log("Data retrieved successfully: userCourse");
                return res.status(200).json({data})
            }
            else {
                console.log(data);
                console.log("data not retrieved");
                res.status(404).json({"message":"data not retrived"})
            }
        })
        Database.end();
    } catch (err) {
        console.log(err);
    }
}