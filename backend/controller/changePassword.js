require("dotenv").config();
const mysql = require("mysql");
const jwt = require("jsonwebtoken");

exports.changePassword = async (req, res) => {
  try {
        console.log(req.body);
        const { EmpCode, newPassword } = req.body; // retrieveing the user credentials
        console.log(EmpCode, newPassword);

        const query = "UPDATE users SET password = ? WHERE EmpCode = ?;";

        Database = mysql.createConnection({
        host: process.env.SQL_HOST,
        port: process.env.SQL_PORT,
        user: process.env.SQL_USER, // in prod, include password
        database: process.env.SQL_DATABASE,
        });
        Database.connect((err) => {
            if (err)
                console.error(err);
            else
                console.log("Connection successful:userCourse");
        });
        Database.query(query, [newPassword, EmpCode], (err, data) => {
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
