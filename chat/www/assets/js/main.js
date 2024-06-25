
let nicknameUser="";
let socket;
const nicknameInput = document.querySelector('#nicknameInput');
const btnLogin = document.querySelector('#btn-login');
const loginForm = document.querySelector('#loginform');
const chatForm = document.querySelector('#chatview');
const listUsersDom = document.querySelector('#listausers');
const containerMessages = document.querySelector('#containerMessaggi');
const inputMessage = document.querySelector('#inputMessage');
const btnSend = document.querySelector('#send_btn');

const popolateUsers = (list) =>{
    listUsersDom.innerHTML="";
    for(user of list){
        const htmlUser = '<li data-nickname='+user.nickname+'>\
                                <div class="d-flex bd-highlight">\
                                    <div class="img_cont">\
                                        <img src="https://ui-avatars.com/api/?name='+user.nickname+'"\
                                            class="rounded-circle user_img" />\
                                        <span class="online_icon online"></span>\
                                    </div>\
                                    <div class="user_info">\
                                        <span>'+user.nickname+'</span>\
                                        <p>Taherah left 7 mins ago</p>\
                                    </div>\
                                </div>\
                            </li>';
        listUsersDom.innerHTML+=htmlUser;
    }
}
const insertUser = (nickname) =>{
    const htmlUser = '<li data-nickname='+nickname+'>\
    <div class="d-flex bd-highlight">\
        <div class="img_cont">\
            <img src="https://ui-avatars.com/api/?name='+nickname+'"\
                class="rounded-circle user_img" />\
            <span class="online_icon online"></span>\
        </div>\
        <div class="user_info">\
            <span>'+nickname+'</span>\
            <p>Taherah left 7 mins ago</p>\
        </div>\
    </div>\
</li>';
listUsersDom.innerHTML+=htmlUser;
}
const removeUser = (nickname) =>{
    const elementToRemove = listUsersDom.querySelector('li[data-nickname="'+nickname+'"]');
    if(elementToRemove){
        elementToRemove.remove();
    }
}

const sendMessage = () =>{
    const message = inputMessage.value;
    inputMessage.innerHTML="";
    socket.emit("sendMessage", message);
    const ora = new Date();
    const stringaOra = ora.getHours()+":"+ora.getMinutes();
    const htmlEvent ='<div class="d-flex justify-content-end mb-4">\
                            <div class="msg_cotainer_send">\
                                '+message+'\
                                <span class="msg_time_send">'+stringaOra+'</span>\
                            </div>\
                            <div class="img_cont_msg">\
                                <img src="https://ui-avatars.com/api/?name='+nicknameUser+'" class="rounded-circle user_img_msg" />\
                            </div>\
                        </div>';
}
const insertMessage = (nickname, message) =>{
    const ora = new Date();
    const stringaOra = ora.getHours()+":"+ora.getMinutes();
    const htmlEvent ='<div class="d-flex justify-content-start mb-4">\
                            <div class="img_cont_msg">\
                                <img src="https://ui-avatars.com/api/?name='+nickname+'"\
                                    class="rounded-circle user_img_msg" />\
                            </div>\
                            <div class="msg_cotainer">\
                                <div class="text-muted h6">Username</div>\
                                '+message+'\
                                <span class="msg_time mt-4">'+stringaOra+'</span>\
                            </div>\
                        </div>';
}
btnSend.addEventListener('click', () => {
    sendMessage();

});
//chatForm.style.display = 'none';
chatForm.classList.add("hidden");
btnLogin.addEventListener('click', () => {
    nicknameUser=nicknameInput.value;
    socket = io();
    socket.on("connect", async () => {
        console.log("Connected")
        loginForm.classList.add("hidden");
        chatForm.classList.remove("hidden");
        //after connect send nickname to server
        socket.emit("userLogged", nicknameUser);
        const resp = await fetch("/api/users");
        const listUsers = await resp.json();
        console.log(listUsers);
        popolateUsers(listUsers.listUsers);
        containerMessages.innerHTML="";
    });
    socket.on("disconnect", () => {
        console.log("Disconnected");
        loginForm.classList.remove("hidden");
        chatForm.classList.add("hidden");
    });

    socket.on("userLogged", (nicknameLogged)=>{
        console.log("user logged: "+nicknameLogged);
        insertUser(nicknameLogged);
    });
    socket.on("userDisconnected", (nicknameDisconnected)=>{
        console.log("user disconnected: "+nicknameDisconnected);
        removeUser(nicknameDisconnected);
    });
    socket.on("newMessage", (nicknameSender, message)=>{
        insertMessage(nicknameSender, message);
    });
});
