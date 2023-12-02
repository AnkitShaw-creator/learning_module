require('dotenv').config({ // to get the environment variable declared in .env file
    path: './.env'
})
const cors = require('cors')
const express = require('express')
const { readdirSync } = require('fs')
const path = require('path')

const options = {
    origin: ['http://localhost:3000', 'http://localhost:5000', '*'], // add the url which should have access to the server , "*" means everyone can access the server
    useSuccessStatus: 200,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
};

const server = express()
server.use(cors(options)) // for allowing cross-origin-routing-option
server.use('/static', express.static(path.join(__dirname, '/public'))) // to serve the static files like images, vidoes etc
server.use(express.json()) // so that json data can be pulled or pushed in the app

/*this will create the routes for all the files in route folder*/
try {
    readdirSync('./routes').map((r) => { server.use('/', require('./routes/' + r))});
// server.use('/api/v1', useHomeRoute) <- alternative way for ceating route
    
} catch (error) {
    console.log(error);
}

try {
    server.listen(process.env.PORT, () => {
    console.log('server is listening at:..',process.env.PORT);
})
} catch (error) {
    console.log(error);
}
