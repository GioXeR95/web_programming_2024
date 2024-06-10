const http = require("http");
const EventEmitter = require("events");

const serverWebEvents = new EventEmitter();
serverWebEvents.on("RootRequest", (req, res) => {
    res.write("Hello World!");
    res.end();
});
serverWebEvents.on("AboutRequest", (req, res) => {
    res.write("About Us!");
    res.end();
});
serverWebEvents.on("request", (req, res) => {
    switch(req.url) {
        case "/":
            serverWebEvents.emit("RootRequest", req, res);
            break;
        case "/about":
            serverWebEvents.emit("AboutRequest", req, res);
            break;
        default:
            res.write("404 Not Found!");
            res.end();
            break;
    }
});
const createServer = () => {
    const httpServer = http.createServer((req, res) => {
        serverWebEvents.emit("request", req, res);
    });
    return httpServer;
}

module.exports = {createServer, serverWebEvents}