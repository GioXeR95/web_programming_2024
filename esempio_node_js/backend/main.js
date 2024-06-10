//const logger = require("./logger");
const logger = require("my-logger")
const os = require("os");

const express = require("express");

const {createServer, serverWebEvents} = require("./my_modules/httpServer");

const user = os.userInfo().username;

logger.log("Hello World!");
logger.log(logger.boh);
logger.log("Hello " + user + "!");
logger.log(os.type());
logger.log(os.totalmem());
logger.log(os.freemem());



const httpServer = createServer();
httpServer.listen(3000);