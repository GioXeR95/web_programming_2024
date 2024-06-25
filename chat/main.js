const express = require("express");
const serverExpress = express();
const serverHttp = require("http").Server(serverExpress);
const serverSocketIO = require("socket.io")(serverHttp);

serverExpress.use(express.static("./www"));
//list of users online
const listUsers = [];


//api that returns the list of hte users online
serverExpress.get("/api/users", (req, resp) => {
    resp.json({listUsers});
});

//websocket:
serverSocketIO.on("connection", (socketClient) => {
    console.log("client collegato...");
    socketClient.on("disconnect", () => {
        console.log("client disconnesso...");
        if(socketClient.nickname){
            serverSocketIO.sockets.emit("userDisconnected", socketClient.nickname);
        }
        listUsers.forEach((user, index) => {
            if(user.id==socketClient.id){
                listUsers.splice(index, 1);
            }
        });
    });

    socketClient.on("userLogged", (nickname)=>{
        socketClient["nickname"]=nickname;
        console.log("user logged: "+socketClient.nickname);
        socketClient.broadcast.emit("userLogged", nickname);
        const userObject = {nickname: nickname, id: socketClient.id};
        listUsers.push(userObject);
    });
    socketClient.on("sendMessage", (message) => {
        socketClient.broadcast.emit("newMessage", socketClient.nickname, message);
    });
});


//listening on port 8080
//serverExpress.listen(8080);
serverHttp.listen(8080);