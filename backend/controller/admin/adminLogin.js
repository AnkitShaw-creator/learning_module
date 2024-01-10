require('dotenv').config();
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.adminLogin = async (REQ, RES) => {
    try {
        console.log(REQ.body);
        const { EmpCode, password } = REQ.body // retrieveing the user empcode and password

        console.log(EmpCode, password);
        /** query for the authenticating the user and retriving */
        const query = "SELECT u.EmpCode, u.FirstName, u.MiddleName, u.LastName, u.email, u.password, u.role, u.primaryDept, u.designation, u.DOJ, u.LastLogin, u.img FROM users u " +
            "WHERE u.EmpCode = ?;";
            // + "SELECT d.department, d.designation, d.due_date FROM departments d WHERE d.EmpCode = ?;";
        // the department column in the users table is only for development purpose and it wont be useful for implementing business logic

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
        Database.query(query, [EmpCode], (err, data) => {
            if (err) {
                console.error(err); // to display the errors that have occured during retrieving the data
            }
            if (data) {
                console.log(data[0].password);
                bcrypt.compare(password, data[0].password).then((res) => {
                    // checking where the password hash in db is matching with the enter password
                    if (res) {
                        //console.log("Login successful");
                        if(data[0].role === 'admin'){
                            const token = jwt.sign({ data: data }, process.env.JWT_SIGN_IN_TOKEN,)
                            //res.cookie('uid', data[0])
                            //console.log(token);
                            RES.cookie('trtusrwer', token)
                            RES.cookie('prf_img', data[0].img)
                            return RES.status(200).json({ "message": "Logged in", "userinfo": data })
                        }
                        else {
                            return RES.status(202).json({ "message": "You do not have the required permission to access the site" });
                        }
                    }
                    else {
                        console.log("Login failed");
                        return RES.status(400).json({ "message": "Login failed, password incorrect" });
                    }
                })
            }
        })
    } catch (error) {
        RES.status(500).json({ error: error.body })
    }
}

