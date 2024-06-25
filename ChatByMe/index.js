const express = require('express');
const serverExpress = express();
const serverHttp = require("http").Server(serverExpress);
const serverSocketIo = require("socket.io")(serverHttp);

serverExpress.use(express.static("./public"));

//api to get all the users:
serverExpress.get("/api/users", (req, resp) =>{
    resp.json(serverStorage.listUsers);
});

//Class that can store messages.
class Message{
    constructor (user,msg,time,day,rec='bd'){
        this.sender=user;
        this.reciver=rec;
        this.message=msg;
        this.timestamp=time;
        this.date=day;
    }

}
//Adds a Zero if the value is less then 10 (for days, minutes, hours, seconds)
function fixZero(value){
    if(value<10){
        return "0"+value;
    }
    return value;
}
//custom code to get the current time.
function getTimeStamp(){
    const time = new Date(Date.now());
    return fixZero(time.getHours())+":"+fixZero(time.getMinutes())+":"+fixZero(time.getSeconds());
}
//custom code to get the current day.
function getFullDate(){
    const time = new Date(Date.now());
    return fixZero(time.getDate())+"/"+fixZero(time.getMonth()+1)+"/"+time.getFullYear();
}
const serverStorage = {
    'listUsers': [],
    'messages': []
};

serverSocketIo.on("connection", (socketClient) => {
    console.log("A client as connected.");
    socketClient.on("disconnect", () =>{
        console.log("A client as disconnected.");
        if(socketClient.nickname){
            const userObject = {nickname: socketClient.nickname, id: socketClient.id};
            serverSocketIo.sockets.emit("userDisconnected",userObject);
        }
        serverStorage.listUsers.forEach((user,index) => {
            if(user.id==socketClient.id)
                serverStorage.listUsers.splice(index, 1);
        });
    });

    socketClient.on("userLogged", (nickname) => {
        socketClient["nickname"] = nickname;
        console.log("User logged: "+nickname + " id: "+socketClient.id);
        const userObject = {nickname: nickname, id: socketClient.id};
        socketClient.broadcast.emit("userLogged",userObject);
        serverStorage.listUsers.push(userObject);
    });
});




serverHttp.listen(8080);