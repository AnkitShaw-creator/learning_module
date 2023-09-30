const mysql = require('mysql2')
require('dotenv').config()

var Database;

try {
    console.log("database file started");
    Database  = mysql.createPool({
            host: process.env.SQL_HOST,
            port: process.env.SQL_PORT,
            user: process.env.SQL_USER,
            password: process.env.SQL_PASSWORD,
            database: process.env.SQL_DATABASE
    }).promise()

    const rows = Database.query("SELECT * FROM login");
    console.log(rows);
    console.log(process.env.SQL_HOST);
    console.log(process.env.SQL_PORT);
    console.log(process.env.SQL_USER);
    console.log(process.env.SQL_PASSWORD);
    console.log(process.env.SQL_DATABASE);
} catch (error) {
    console.log(error);
}

const userAuth = async(email, password) => {
    const query = "SELECT * FROM login WHERE username = '?' AND password = '?'";
    const [rows] = await Database.query(query, [email, password])

    return rows;
 }

exports.module = Database
exports.module = {userAuth}