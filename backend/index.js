require('dotenv').config({
    path: './.env'
})
const cors = require('cors')
const express = require('express')
const { readdirSync } = require('fs')
const mysql = require('mysql')
const useHomeRoute = require('./routes/home')


const server = express()

server.use(express.json())
const options = {
    origin: "*", // add the url which should have access to the server , "*" means everyone can access the server
    useSuccessStatus: 200
};
server.use(cors(options))
server.get('/', (req, res) => {
    res.end("HI there")
//routes
/*this will create the routes for all the files in route folder*/
try {
    readdirSync('./routes').map((r) => { server.use('/', require('./routes/' + r)) }); 
// server.use('/api/v1', useHomeRoute) <- alternative way for ceating route
    
} catch (error) {
    console.log(error);
}


})


try {
    server.listen(process.env.PORT, () => {
    console.log('server is listening at:..',process.env.PORT);
})
} catch (error) {
    console.log(error);
}
