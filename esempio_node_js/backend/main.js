//const logger = require("./logger");
const logger = require("my-logger")
const os = require("os");

const express = require("express");

const user = os.userInfo().username;

logger.log("Hello World!");
logger.log(logger.boh);
logger.log("Hello " + user + "!");
logger.log(os.type());
logger.log(os.totalmem());
logger.log(os.freemem());



/*
const {createServer, serverWebEvents} = require("./my_modules/httpServer");
const httpServer = createServer();
httpServer.listen(3000);*/

const app = express();

app.get("/", (req, res) => {
    res.status(200).send("Hello World!");
    res.end();
});
app.get("/about", (req, res) => {
    res.status(200).send("About Us!");
    res.end();
});
app.get("*", (req, res) => {
    res.status(404).send("404 Not Found!");
    res.end();
});
app.listen(3000, ()=>{
    logger.log("Server is running on port 3000");
});