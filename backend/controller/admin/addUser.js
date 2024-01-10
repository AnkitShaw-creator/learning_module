require('dotenv').config();
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

function getEmpCode() {
    return Math.floor(
        Math.random() * (999999 - 100000 + 1) + 100000
    );
}



exports.addUser = async (req, res) => {
    try {
        const EmpCode = req.body.EmpCode;
        const firstName = req.body.FirstName;
        const middleName = req.body.MiddleName;
        const lastName = req.body.LastName;
        const email = req.body.Email;
        const password = req.body.Password;
        const role = req.body.role;
        const primaryDept = req.body.primaryDept;
        const doj = req.body.DOJ;
        const designation = req.body.Designation;
        var salt = bcrypt.genSaltSync(10);
        var passwordHash = await bcrypt.hash(password, 10); //encrypting password
        //console.log(req.body);
        /** query for the authenticating the user and retriving */
        const query = "select * from users u where EmpCode = ?"; // selecting all the users from database
        const queryInsert = "insert into users (EmpCode, FirstName, MIddleName, LastName, email, password, role, primaryDept, DOJ, designation) "
            + "values( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);"; //will be run after query1

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

        Database.query(query, [EmpCode], (err, data) => {
            if (err) {
                res.status(500).json(err)
            }
            if (data.length === 0) {
                //res.status(202).json(data)
                Database.query(queryInsert, [EmpCode, firstName, middleName, lastName, email, passwordHash, role, primaryDept, doj, designation], (ERR, DATA) => {
                    if (ERR) {
                        res.status(500).json(ERR)
                    }
                    if (DATA) {
                        //console.log(DATA);
                        res.status(202).json({"message":`Employee added with EmpCode: ${EmpCode}`})
                    }
                })
            }
            else {
                console.log("course already exists");
                res.status(202).json({ "message":"course already exists"})
            }
        })
    } catch (error) {
        console.error(error);
        res.status(500).json(error)
    }
}
exports.addAdmin = (req, res) => {
    res.status(202).json({"message":"added"})
}
