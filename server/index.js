//Node modules
const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
require('dotenv').config();

const controller = require("./controller");

const app = express();
app.use(bodyParser.json());

//Endpoints

massive(process.env.CONNECTION_STRING).then(dbInstance => {
    app.set('db', dbInstance);
    
    app.listen(process.env.SERVER_PORT, () => {
        console.log(`Listening on port : ${process.env.SERVER_PORT}`);
    })
}).catch(err => console.log(err));

