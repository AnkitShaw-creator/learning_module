require('dotenv').config()
const mysql = require('mysql')


exports.courses = async (req, res) => {
    try {
        //console.log("request body:",req.body);
    
        const departments = req.body.departments
        const designation = req.body.designation
        const primaryDept = req.body.primaryDept
                //console.log(departments, designation);
        const query = "select * from courses where department in (?) and designation = ?; "+ //query for retrieveing the data from courses table
            "select * from syllabus s "+
            "where s.designation = ? and s.primaryDept = ? and s.course_dept in (?);";

        
        
            // "select distinctrow u.primaryDept, u.designation, d.department, c.courseCode, t.topic, t.link_name, t.duration "
            // +"from users u, departments d, courses c, topics t "
            // +"where u.designation = ? and u.primaryDept = ? and c.department in (d.department) and t.courseCode in (c.courseCode);";
        Database  = mysql.createConnection({  
            host: process.env.SQL_HOST, // location where the sql is hosted
            port: process.env.SQL_PORT, // sql port, by default 3306
            user: process.env.SQL_USER, // in prod, include password , in dev, its the root user
            password: process.env.SQL_PASSWORD, // database password declared in env file
            database: process.env.SQL_DATABASE, // database name declared in env file
            multipleStatements: true
        });
        Database.connect((err) => {
            if (err)
                console.error(`connection distrupted due to error: ${err}`);
            else
                console.log("Connection successful:userCourse");
        })

        Database.query(query, [departments, designation, designation, primaryDept, departments], (err, data) => {
            if (err) {
                console.log(err);
            }
            if (data.length > 0) {
                console.log(data);
                //console.log("Data retrieved successfully: userCourse");
                return res.status(200).json({data})
            }
            else {
                console.log(data);
                //console.log("data not retrieved");
                res.status(404).json({"message":"data not retrived"})
            }
        })
        Database.end();
    } catch (err) {
        console.error(err);
    }
}