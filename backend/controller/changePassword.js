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
        console.log(`New password: ${hashPassword}`);
        // if (hashOldPassword === hashPassword) {
        //         return res.status(400).json({"message":"The Old password and new password are the same"})
        //     }
        Database = mysql.createConnection({
            host: process.env.SQL_HOST, // location where the sql is hosted
            port: process.env.SQL_PORT, // sql port, by default 3306
            user: process.env.SQL_USER, // in prod, include password , in dev, its the root user
            database: process.env.SQL_DATABASE, // database name declared in env file
            password: process.env.SQL_PASSWORD, // database password declared in env file
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
                    //console.log("changePassword: Password updated");
                    return res.status(200).json({ 'message': 'Password updated successfully', 'data': data })
                }
                else {
                    console.log(data);
                    //console.log("changePassword: Password not updated, please check your Empcode or current password");
                    return res.status(404).json({ 'message': 'Password not updated', 'data': data })
                }
            }
            
        });
      
  } catch (err) {
        console.error(err);
  }
};
