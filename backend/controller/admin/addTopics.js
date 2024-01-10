require('dotenv').config();
const mysql = require('mysql');
const jwt = require('jsonwebtoken');

exports.addTopics = async (req, res) => {
    try {
        console.log(req.body);
        const { courseCode, topic, mandatory, link_name, links, link_type, duration } = req.body;
        const query = "select * from topics t where courseCode = ? and link_name = ?;"; // selecting all the users from database
        const queryInsert = "insert into topics (courseCode, topic, mandatory, link_name, links, link_type, duration) " +
            "values (?, ?, ?, ?, ?, ?, ?);"; //will be run after query1

        Database = mysql.createConnection({  //creating the connection to db
            host: process.env.SQL_HOST, // location where the sql is hosted
            port: process.env.SQL_PORT, // sql port, by default 3306
            user: process.env.SQL_USER, // in prod, include password , in dev, its the root user
            database: process.env.SQL_DATABASE, // database name declared in env files
            password: process.env.SQL_PASSWORD, // database password declared in env file
            multipleStatements: true  // set to true as multiple queries are running here in parallel
        });
        Database.connect((err) => { // connecting to the database
            if (err)
                console.error(`connection distrupted due to error: ${err}`);
            else
                console.log("Connection successful: admin-addUsers");
        });

        Database.query(query, [courseCode, link_name], (err, data) => {
            if (err) {
                res.status(500).json(err)
            }
            if (data.length === 0) {
                //res.status(202).json(data)
                Database.query(queryInsert, [courseCode, topic, mandatory, link_name, links, link_type, duration], (ERR, DATA) => {
                    if (ERR) {
                        res.status(500).json(ERR)
                    }
                    if (DATA.affectedRows === 1) {
                        //console.log(DATA);
                        res.status(202).json({"message":"Course's topics added"})
                    }
                })
            }
            else {
                console.log("topic already exists");
                res.status(202).json({ "message": "topic already exists" })
            }
        })
    } catch (error) {
        console.error(error);
        res.status(500).json(error)
    }
}
