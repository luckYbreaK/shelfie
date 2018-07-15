//Node modules
const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
require('dotenv').config();

const controller = require("./controller");

const app = express();
app.use(bodyParser.json());

//Endpoints
app.get("/api/inventory", controller.readProducts);
app.get("/api/product/:id", controller.readProduct);
app.post("/api/product", controller.createProduct);
app.delete("/api/product/:id", controller.deleteProduct);
app.put("/api/product/:id", controller.updateProduct);

massive(process.env.CONNECTION_STRING).then(dbInstance => {
    app.set('db', dbInstance);
    
    app.listen(process.env.SERVER_PORT, () => {
        console.log(`Listening on port : ${process.env.SERVER_PORT}`);
    })
}).catch(err => console.log(err));

