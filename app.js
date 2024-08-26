const express = require('express')
const app = express()
const port = 8000

api.use(function (req, res, next) {

    // Website you wish to allow to connect
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    // Pass to next layer of middleware
    next();
})

import send from './routes/send.js';

//middleware
api.use(express.json())

api.use("/send/", send);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, '0.0.0.0', () => {
    console.log(`Example app listening on port ${port}`)
})
