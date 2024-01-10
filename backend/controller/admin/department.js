require('dotenv').config();
const mysql = require('mysql');

exports.getDepartment = async (REQ, RES) => {
    try {
        //console.log(REQ.body);

        /** query for retriving the departments */
        const query = "SELECT * from departments d";

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
                console.log("Connection successful: loginUser");
        });

        // quering the database to check if the combination of username and password exists or not
        Database.query(query, [], (err, data) => {
            if (err) {
                console.error(err); // to display the errors that have occured during retrieving the data
                RES.status(503).json({"sql error": err})
            }
            if (data.length > 0) {
                //console.log(data);
                return RES.status(200).json({ "departments": data })

            }
            else {
                console.log("retrieval failed");
                return RES.status(400).json({ "message": "Retrival of the department failed, please check connection" })
            }
        })
    } catch (error) {
        RES.status(500).json({ error: error.body })
    }
}
exports.addDepartments = async(REQ, RES) => {
    try {
        //console.log(REQ.body);

        /** query for retriving the departments */
        const query = "SELECT * from departments d";

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
                console.log("Connection successful: loginUser");
        });

        // quering the database to check if the combination of username and password exists or not
        Database.query(query, [], (err, data) => {
            if (err) {
                console.error(err); // to display the errors that have occured during retrieving the data
                RES.status(503).json({ "sql error": err })
            }
            if (data.length > 0) {
                //console.log(data);
                return RES.status(200).json({ "departments": data })

            }
            else {
                console.log("retrieval failed");
                return RES.status(400).json({ "message": "Retrival of the department failed, please check connection" })
            }
        })
    } catch (error) {
        RES.status(500).json({ error: error.body })
    }
}

