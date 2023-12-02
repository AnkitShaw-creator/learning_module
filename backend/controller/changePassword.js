require("dotenv").config();
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');


exports.changePassword = async (req, res) => {
  try {
        console.log(req.body);
        const { EmpCode, newPassword } = req.body; // retrieveing the user credentials
        console.log(EmpCode, newPassword);

        const query = "UPDATE users SET password = ? WHERE EmpCode = ?;";
        
        var salt = bcrypt.genSaltSync(10);
        var hashPassword = bcrypt.hashSync(newPassword, salt);
        console.log(hashPassword);
        Database = mysql.createConnection({
            host: process.env.SQL_HOST, // location where the sql is hosted
            port: process.env.SQL_PORT, // sql port, by default 3306
            user: process.env.SQL_USER, // in prod, include password , in dev, its the root user
            database: process.env.SQL_DATABASE, // database name declared in env file
        });
        Database.connect((err) => {
            if (err)
                console.error(`connection distrupted due to error: ${err}`);
            else
                console.log("Connection successful: changePassword");
        });
        Database.query(query, [hashPassword, EmpCode], (err, data) => {
            if (err){
                console.error(err);
                return res.status(404);
            }else {
                if (data.changedRows === 1){
                    console.log(data);
                    console.log("changePassword: Password updated");
                    return res.status(200).json({ 'message': 'Password updated successfully', 'data': data })
                }
                else {
                    console.log(data);
                    console.log("changePassword: Password not updated, please check your Empcode");
                    return res.status(200).json({ 'message': 'Password not updated', 'data': data })
                }
            }
            
        });
      
  } catch (err) {
        console.error(err);
  }
};
