require('dotenv').config({
    path: './.env'
})
const cors = require('cors')
const express = require('express')
const { readdirSync } = require('fs')

const options = {
    origin: ['http://localhost:3000'], // add the url which should have access to the server , "*" means everyone can access the server
    useSuccessStatus: 200,
    methods: ['POST', 'GET'],
    credentials: true
};

const server = express()
server.use(express.static('static'))
server.use(express.json())
server.use('*',cors(options))
// server.get('/', (req, res) => {
//     res.end("HI there")    /* for testign purposes only can be deleted if not requried */
// })


/*this will create the routes for all the files in route folder*/
try {
    readdirSync('./routes').map((r) => { server.use('/', require('./routes/' + r)) }); 
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
