require('dotenv').config()
const mysql = require('mysql')


exports.courses = async (req, res) => {
    try {
        console.log("request body:",req.body);
    
        const departments = req.body.departments
        const role = req.body.role

        console.log(departments, role);
        const query = "select * from courses where department in (?) and role = ? ;"; //query for retrieveing the data from courses table
        Database  = mysql.createConnection({  
            host: process.env.SQL_HOST,
            port: process.env.SQL_PORT,
            user: process.env.SQL_USER,   // in prod, include password
            database: process.env.SQL_DATABASE
        });
        Database.connect((err) => {
            if (err)
                console.error(`connection distrupted due to error: ${err}`);
            else
                console.log("Connection successful:userCourse");
        })

        Database.query(query, [departments, role], (err, data) => {
            if (err) {
                console.log(err);
            }
            if (data.length > 0) {
                //console.log(data);
                console.log("Data retrieved successfully: userCourse");
                return res.status(200).json({data})
            }
            else {
                //console.log(data);
                console.log("data not retrieved");
                res.status(404).json({"message":"data not retrived"})
            }
        })
        Database.end();
    } catch (err) {
        console.error(err);
    }
}