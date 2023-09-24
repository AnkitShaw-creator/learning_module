require('dotenv').config()
const cors = require('cors')
const express = require('express')
const { readdirSync } = require('fs')
const mysql = require('mysql')
var db;
const server = express()
const useHomeRoute = require('./routes/home')


PORT = 8000
database = process.env.DEVDATABASE
try {
     db  = mysql.createConnection({
            host: "localhost",
            port: 3306,
            user: "root",
            password: "password",
            database: "db_dev"
        });
    db.connect((err) => {
        if (err)
            console.log(err);
        else
            console.log("Connection successful");
    });
    
} catch (error) {
    console.log(error);
}





//routes
readdirSync('./routes').map((r) => { server.use('/', require('./routes/' + r)) });
// server.use('/api/v1', useHomeRoute)



const options = {
    origin: "*", // add the url which should have access to the server , "*" means everyone can access the server
    useSuccessStatus: 200
};
server.use(cors(options))
server.get('/', (req, res) => {
    res.end("HI there")
})


try {
    server.listen(PORT, () => {
    console.log('server is listening at: ',PORT);
})
} catch (error) {
    console.log(error);
}
