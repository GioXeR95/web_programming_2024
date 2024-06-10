//const logger = require("./logger");
const logger = require("my-logger")
const os = require("os");
const http = require("http");
const express = require("express");

const user = os.userInfo().username;

logger.log("Hello World!");
logger.log(logger.boh);
logger.log("Hello " + user + "!");
logger.log(os.type());
logger.log(os.totalmem());
logger.log(os.freemem());


const httpServer = http.createServer((req, res) => {
    switch(req.url) {
        case "/":
            res.write("Hello World!");
            break;
        case "/about":
            res.write("About Us!");
            break;
        default:
            res.write("404 Not Found!");
            break;
    }
    res.end();
});

httpServer.listen(3000);