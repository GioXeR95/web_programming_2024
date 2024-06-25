let nicknameUser = "";
let socket;

//login inputs
const nicknameInput = document.getElementById('login-username');
const btnLogin = document.getElementById('login-btn');
const loginWindow = document.getElementById('login-prompt');

//chat inputs
const chatWindow = document.getElementById('chat-screen');
const userListView = document.getElementById('user-list');

console.log(btnLogin)
btnLogin.addEventListener('click', () =>{
    nicknameUser=nicknameInput.value;
    socket = io();
    socket.on("connect", async () =>{
        console.log("Connected");

        loginWindow.classList.add("hidden");
        chatWindow.classList.remove("hidden");
        //send username to the server
        socket.emit("userLogged", nicknameUser);
        const resp = await fetch("/api/users");
        const listUsers = await resp.json();
        loadUserList(listUsers);
    });
    socket.on("disconnect", () =>{
        console.log("Disconnected");
        loginWindow.classList.remove("hidden");
        chatWindow.classList.add("hidden");
    });
    socket.on("userLogged", (user) => {
        console.log("User Logged: "+ user.nickname + " id: "+user.id);
        updateUserlist(user);
    });
    socket.on("userDisconnected", (user) => {
        console.log("User Disconnected: "+ user.nickname + " id: "+user.id);
        removeUser(user);
    });
});

//LOAD the list of users.
function loadUserList(list){
    userListView.innerHTML="";
    for(user of list){
        if(user.id===socket.id)
            user.nickname="ME";
        const htmlUser = '<li data-id='+user.id+'>\
                                <div class="d-flex border rounded border-secondary p-2 bg-info">\
                                    <div class="img_cont">\
                                        <img src="https://ui-avatars.com/api/?name='+user.nickname+'"\
                                            class="rounded-circle user_img" />\
                                        <span class="online_icon online"></span>\
                                    </div>\
                                    <div class="user_info">\
                                        <span>'+user.nickname+'</span>\
                                    </div>\
                                </div>\
                            </li>';
        userListView.innerHTML+=htmlUser;
    } 
}
//update the list of users on connections:
function updateUserlist(info){
    console.log(info);
    const htmlUser = '<li data-id='+info.id+'>\
    <div class="d-flex border rounded border-secondary p-2 bg-info">\
        <div class="img_cont">\
            <img src="https://ui-avatars.com/api/?name='+info.nickname+'"\
                class="rounded-circle user_img" />\
            <span class="online_icon online"></span>\
        </div>\
        <div class="user_info">\
            <span>'+info.nickname+'</span>\
        </div>\
    </div>\
</li>';
userListView.innerHTML+=htmlUser;
}
//remove a user from the list after disconnecting
function removeUser(user){
    const userToRemove = userListView.querySelector('li[data-id="'+user.id+'"');
    if(userToRemove)
        userToRemove.remove();
}