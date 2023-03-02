const express = require("express")
                require("dotenv").config();
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const routes = require("./http/routes");
const initMongoDB = require("./database");
const constents = require("./utils/constents");


// ***************************************************
// middlewares 
// ***************************************************
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// server static files 
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
// handling CORS 
app.use(cors());


// ***************************************************
// initializing Routes
// ***************************************************
app.use(routes);


// ***************************************************
// Connecting with Database
// ***************************************************
initMongoDB();


// ***************************************************
// Creating && Starting Server 
// ***************************************************
const port = process.env.PORT || 8080;

app.listen(port, (req, res) => {
    console.log(`Server Started at Port: ${port}...`);
});

