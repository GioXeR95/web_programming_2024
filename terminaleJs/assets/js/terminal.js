( ()=>{

    

    function dragElement(elmnt) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        const titlebar = document.querySelector(".titlebar");
        if (titlebar) {
            titlebar.onmousedown = dragMouseDown;
        }
    
        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }
    
        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            if((elmnt.offsetTop - pos2) > 0 && (elmnt.offsetLeft - pos1) > 0 && (elmnt.offsetLeft - pos1) < window.innerWidth - elmnt.clientWidth && (elmnt.offsetTop - pos2) < window.innerHeight - elmnt.clientHeight-45){
                ashell_terminal.position[0] = elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
                ashell_terminal.position[1] = elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
            }
            else{
                if((elmnt.offsetTop - pos2) <= 0){
                    elmnt.style.top = 0;
                }
                if((elmnt.offsetLeft - pos1) <= 0){
                    elmnt.style.left = 0;
                }
                if((elmnt.offsetLeft - pos1) >= window.innerWidth - elmnt.clientWidth){
                    elmnt.style.left = window.innerWidth - elmnt.clientWidth + "px";
                }
                if((elmnt.offsetTop - pos2) >= window.innerHeight - elmnt.clientHeight-45){
                    elmnt.style.top = window.innerHeight - elmnt.clientHeight-45 + "px";
                }
                if(window.innerWidth < elmnt.clientWidth){
                    elmnt.style.width = window.innerWidth + "px";
                }
                if(window.innerHeight < elmnt.clientHeight){
                    elmnt.style.height = window.innerHeight-50 + "px";
                }
            }
        }
    
        function closeDragElement() {
            // stop moving when mouse button is released:
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
    //Terminal with js!
    class fs_node{
        constructor(name, type, parent){
            this.name = name;
            this.type = type;
            this.parent = parent;
            this.children = [];
        }
    }
    let system = {
        "time" : "",
        "timeout_timer": "",
        "path" :{
            "current" : "",
            "system32" : "",
            "winzoz" : "",
            "os" : "",
            "root" : new fs_node("C:","dir",null)
        }
    }
    function loadSystem(){
        system.path.current = system.path.root;
        system.path.current.children.push(new fs_node("Users","dir",system.path.current));
        system.path.current.children.push(new fs_node("Program_Files","dir",system.path.current));
        system.path.current.children.push(new fs_node("Program_Files_(x86)","dir",system.path.current));
        const win_folder = new fs_node("Winzoz","dir",system.path.current)
        system.path.current.children.push(win_folder);
        const system32_folder = new fs_node("System32","dir",win_folder);
        win_folder.children.push(system32_folder);
        const os_file = new fs_node("OS","file",system32_folder);
        system32_folder.children.push(os_file);
        system.path.winzoz = win_folder;
        system.path.system32 = system32_folder;
        system.path.os = os_file;
        //system.path.current=system.path.current.children[0];
        script_start_menu();
        logout_listener();
        login_listener();
    }
    function script_start_menu(){
        //start-icon start-button
        const start_button = document.querySelector(".start-button-trick");
        const start_menu = document.querySelector(".start-menu");
        start_button.addEventListener("click", ()=>{
            if(start_menu.style.visibility === "hidden" || start_menu.style.visibility === ""){
                start_menu.style.visibility = "visible";
            }
            else{
                start_menu.style.visibility = "hidden";
            }
        });
        document.addEventListener("click", (e)=>{

            if(e.target !== start_menu && e.target !== start_button){
                start_menu.style.visibility = "hidden";
            }
        });
    }
    function logout_listener(){
        const logout = document.querySelector(".logout-button");
        logout.addEventListener("click", ()=>{
            const logout_screen = document.querySelector(".logout-background");
            logout_screen.style.visibility = "visible";
        });
    }
    function login_listener(){
        const login = document.querySelector(".login-button");
        login.addEventListener("click", ()=>{
            const login_screen = document.querySelector(".logout-background");
            const password = document.querySelector("input[type='password']");
            const result = document.querySelector(".login-result");
            if(password.value === "admin"){
                result.innerHTML = "";
                password.value="";
                login_screen.style.visibility = "hidden";
                
            }
            else{
                password.value = "";
                result.innerHTML = "Wrong password";
            }
        });
    }
    const user_shell = {
        content : "magic@winzoz: ",
        color: "#4f93ff",
        font_weight: "bold",
        margin: "0 2px"
    }

    const ashell_terminal = {
        "running" : false,
        "opened" : false,
        "maximized" : false,
        "height" : 250,
        "width" : 500,
        "backup":{
            "height" : 250,
            "width" : 500
        },
        "position" : ['20px','20px'],
        "init" : [["A Shell",0],["Welcome to A Shell! Type 'help' to get started!",0],["",1]],
        "history" : {
            "commands" : [""],
            "index" : 0
        },
        "auto_complete":{
            "cycle" : false,
            "compatible_commands" : [],
            "index" : 0,
            "command" : ""
        },
        "available_commands" : ["help","clear","exit","time","curl","ls","cd","mkdir","touch","del"],
        "html" : `<div class="window">
                    <div class="titlebar">
                        <div class="group-buttons">
                            <div class="button close">X</div>
                            <div class="button minimize">-</div>
                            <div class="button maximize">❒</div>
                        </div>
                        <p><img class='small-icon' src="assets/img/shell.png">A Shell</p>
                    </div>
                    <div class="content" >
                        <div class="commands" >
                        
                        </div>
                    </div>
                </div>`,
    }

    function blueScreen(){
        const body =  document.querySelector("body");
        body.innerHTML = "";
        clearTimeout(system.timeout_timer);
        const screen = document.createElement("div");
        screen.classList.add("bluescreen");
        body.appendChild(screen);
        const sad_face = document.createElement("div");
        sad_face.classList.add("sad-face");
        sad_face.innerHTML = ":(";
        screen.appendChild(sad_face);
        const error = document.createElement("div");
        error.classList.add("error");
        error.innerHTML = "An error has occurred";
        screen.appendChild(error);
        const error_code = document.createElement("div");
        error_code.classList.add("error-code");
        error_code.innerHTML = "Error code: 0x00000032";
        screen.appendChild(error_code);
        const error_message = document.createElement("div");
        error_message.classList.add("error-message");
        error_message.innerHTML = "The system has encountered an error and needs to restart";
        error_message.innerHTML += "<br>";
        error_message.innerHTML += "System32 and Winzoz folders have been deleted. Please reinstall the OS.";
        screen.appendChild(error_message);
        const restart = document.createElement("div");
        restart.classList.add("restart");
        restart.innerHTML = "<span>Install Winzoz</span>";
        screen.appendChild(restart);
        restart.addEventListener("click",()=>{
            location.reload();
        });
    }
    function startTime() {
        system.time = new Date();
        let h = system.time.getHours();
        let m = system.time.getMinutes();
        //if i need seconds: let s = system.time.getSeconds();
        h = checkTime(h);
        m = checkTime(m);
        //s = checkTime(s);
        document.querySelector('.time').querySelector("p").innerHTML = h + ":" + m;
        system.timeout_timer = setTimeout(startTime, 500);
    }
    function checkTime(i) {
        if(i < 10){
            i = "0" + i;
        }
        return i;
    }
    window.onload = function(){
        
        startTime();
        loadSystem();
        const starting_points = document.querySelectorAll(".app-launch");
        for(let i = 0; i < starting_points.length; i++){
            starting_points[i].addEventListener("click", ()=>{
                if(ashell_terminal.running){
                    const terminal = document.querySelector(".terminal");
                    if(ashell_terminal.opened){
                        //terminal is opened so it should get minimized
                        //change state to opened=false
                        const app_taskbar = document.querySelector(".start-icon.shell.app-launch");
                        app_taskbar.classList.add("app-icon-running");
                        app_taskbar.classList.remove("app-icon-open");
                        //visual changes
                        terminal.style.display = "none";
                        //logic changes
                        ashell_terminal.opened = false;
                    }
                    else{
                        //terminal isn't opened but it's running in background
                        const app_taskbar = document.querySelector(".start-icon.shell.app-launch");
                        app_taskbar.classList.add("app-icon-running");
                        app_taskbar.classList.add("app-icon-open");
                        //visual changes
                        terminal.style.display = "inline-block";
                        //logic changes
                        ashell_terminal.opened = true;
                    }
                    
                }
                else{
                    if(ashell_terminal.opened){
                        //Impossible state. Terminal can't be opened and not running
                        console.log("how did you get here?");
                        return;
                    }
                    else{
                        //terminal isn't opened and must be started
    
                        //visual changes
                        ashell_terminal.running = true;
                        ashell_terminal.opened = true;
                        const desktop = document.querySelector(".desktop");
                        const terminal = document.createElement("div");
                        terminal.classList.add("terminal");
                        terminal.style.display= "inline-block";
                        
                        desktop.appendChild(terminal);
                        terminal.innerHTML += ashell_terminal.html;
                        const shell_window = document.querySelector(".window");
                        shell_window.style.height = ashell_terminal.height + "px";
                        shell_window.style.width = ashell_terminal.width + "px";
                        shell_window.style.position = "absolute";
                        shell_window.style.top = ashell_terminal.position[0];
                        shell_window.style.left = ashell_terminal.position[1];
                        dragElement(shell_window);
                        const commands = document.querySelector(".commands");
                        commands.classList.add("enable-select");
                        for(let i = 0; i < ashell_terminal.init.length; i++){
                            printf(ashell_terminal.init[i][0], ashell_terminal.init[i][1]);
                        }

                        //logic changes
                        ashell_terminal.opened = true;
                        ashell_terminal.running = true;
                        make_close_button_work();
                        make_minimize_button_work();
                        make_maximize_button_work();
                        make_resize_update_values();
                        const app_taskbar = document.querySelector(".start-icon.shell.app-launch");
                        app_taskbar.classList.add("app-icon-running");
                        app_taskbar.classList.add("app-icon-open");
                    }
                }
            });
        }
        
        function make_close_button_work(){
            if(ashell_terminal.running && ashell_terminal.opened){
                const close_button = document.querySelector(".button.close");
                close_button.addEventListener("click", ()=>{
                    //close the terminal
                    //visual changes
                    const terminal = document.querySelector(".terminal");
                    //taskbar visual changes
                    const app_taskbar = document.querySelector(".start-icon.shell.app-launch");
                    app_taskbar.classList.remove("app-icon-running");
                    app_taskbar.classList.remove("app-icon-open");
                    terminal.remove();
                    //logic changes
                    ashell_terminal.opened = false;
                    ashell_terminal.running = false;
                });
            }
        }
        function make_minimize_button_work(){
            if(ashell_terminal.running && ashell_terminal.opened){
                const minimize_button = document.querySelector(".button.minimize");
                minimize_button.addEventListener("click", ()=>{
                    //minimize the terminal
                    //visual changes
                    const terminal = document.querySelector(".terminal");
                    terminal.style.display = "none";
                    //taskbar visual changes
                    const app_taskbar = document.querySelector(".start-icon.shell.app-launch");
                    app_taskbar.classList.add("app-icon-running");
                    app_taskbar.classList.remove("app-icon-open");
                    //logic changes
                    ashell_terminal.opened = false;
                });
            }
        }
        function make_maximize_button_work(){
            if(ashell_terminal.running && ashell_terminal.opened){
                const maximize_button = document.querySelector(".button.maximize");
                //dblclick event
                const shell_titlebar = document.querySelector(".titlebar");
                const maximize = ()=>{
                    //maximize the terminal
                    //visual changes
                    if(ashell_terminal.maximized){

                        const shell_window = document.querySelector(".window");
                        shell_window.classList.remove("maximized");
                        shell_window.style.height = ashell_terminal.backup.height + "px";
                        shell_window.style.width = ashell_terminal.backup.width + "px";
                        shell_window.style.top = ashell_terminal.position[0];
                        shell_window.style.left = ashell_terminal.position[1];
                        //logic changes
                        ashell_terminal.maximized = false;
                    }
                    else{
                        const shell_window = document.querySelector(".window");
                        shell_window.classList.add("maximized");
                        ashell_terminal.backup.height = ashell_terminal.height;
                        ashell_terminal.backup.width = ashell_terminal.width;
                        shell_window.style="";
                        //logic changes
                        ashell_terminal.maximized = true;
                    }
                };
                shell_titlebar.addEventListener("dblclick", maximize);
                maximize_button.addEventListener("click", maximize);
            }
        }
        function store_sizes(){
            const shell_window = document.querySelector(".window");
            if(shell_window===null)
                return;

            ashell_terminal.height = shell_window.clientHeight;
            ashell_terminal.width = shell_window.clientWidth;
        }
        function make_resize_update_values(){
            const shell_window = document.querySelector(".window");
            new ResizeObserver(store_sizes).observe(shell_window)
        }
        function printf(text, type=0){
            const commands = document.querySelector(".commands");
            const command = document.createElement("div");
            commands.appendChild(command);
            
            const text_span = document.createElement("span");
            if(type==1){
                const user = document.createElement("span");
                user.innerHTML = user_shell.content;
                let parent = system.path.current.parent;
                let path = system.path.current.name+"\\";
                while(parent !== null){
                    path = parent.name+"\\" + path;
                    parent= parent.parent;
                }
                user.innerHTML += path;
                user.innerHTML += "> ";
                user.style.color = user_shell.color;
                user.style.fontWeight = user_shell.font_weight;
                user.style.display = "inline";
                command.appendChild(user);
                
            }
            text_span.innerHTML = text;
            text_span.classList.add("command");
            command.appendChild(text_span);
            
            const user_inputs = commands.querySelectorAll(".command");
            for(let i = 0; i < user_inputs.length-1; i++){
                user_inputs[i].removeAttribute("contenteditable");
                
            }
            if(type==1){
                text_span.setAttribute("contenteditable","true");
                text_span.focus();
                text_span.style.outline = "none";
                //give focus to the text_span when clicked on the content
                text_span.focus();
                const focus_helper = document.querySelector(".content");
                focus_helper.addEventListener("click",()=>{
                    text_span.focus();
                });
                //had to do this so when you copy it doesn't copy the html tags too :/
                text_span.addEventListener("paste", (e)=>{
                    e.preventDefault();
                    const text = e.clipboardData.getData("text/plain");
                    document.execCommand("insertText", false, text);
                });
                text_span.addEventListener("keydown", (e)=>{
                    
                    //input the command
                    if(e.key === "Enter"){ 
                        e.preventDefault();
                        ashell_terminal.history.index = 0;
                        handle_command(text_span.innerHTML);
                    }
                    //clear the input
                    if(e.key === "Escape"){
                        e.preventDefault();
                        text_span.innerHTML = "";
                    }
                    //history up
                    if(e.key === "ArrowUp"){
                        e.preventDefault();
                        if(ashell_terminal.history.index < ashell_terminal.history.commands.length-1 ){
                            text_span.innerHTML = ashell_terminal.history.commands[++ashell_terminal.history.index];
                        }
                        moveFocusToEnd(text_span);
                    }
                    //history down
                    if(e.key === "ArrowDown"){
                        e.preventDefault();
                        if(ashell_terminal.history.index > 0){
                            text_span.innerHTML = ashell_terminal.history.commands[--ashell_terminal.history.index];
                        }
                        moveFocusToEnd(text_span);
                    }
                    //console.log("cycle: "+ashell_terminal.auto_complete.cycle)
                    if(e.key === "Tab" && ashell_terminal.auto_complete.cycle===false){
                        e.preventDefault();
                        ashell_terminal.auto_complete.command = replaceAll(text_span.innerHTML.substring(0,text_span.innerHTML.length),"&nbsp;"," ");
                        
                        for(let i = 0; i < ashell_terminal.available_commands.length; i++){
                            if(ashell_terminal.available_commands[i].toLowerCase().startsWith(ashell_terminal.auto_complete.command.toLowerCase())){
                                ashell_terminal.auto_complete.compatible_commands.push(ashell_terminal.available_commands[i]);
                            }
                        }
                        let commands_with_namefile = ["cd","del","mkdir","touch"];
                        //console.log("command: "+ashell_terminal.auto_complete.command);
                        for(let i = 0; i < commands_with_namefile.length; i++){
                            if(ashell_terminal.auto_complete.command.startsWith(commands_with_namefile[i])){
                                let name_file = ashell_terminal.auto_complete.command.substring(commands_with_namefile[i].length+1,ashell_terminal.auto_complete.command.length);
                                //console.log("name_file: "+name_file.length);
                                ashell_terminal.auto_complete.compatible_commands = [];
                                if(name_file.length > 0){
                                    //console.log("namefile wasn't empty")
                                    for(let j = 0; j < system.path.current.children.length; j++){
                                        if(system.path.current.children[j].name.toLowerCase().startsWith(name_file.toLowerCase())){
                                            ashell_terminal.auto_complete.compatible_commands.push(commands_with_namefile[i]+" "+system.path.current.children[j].name);
                                        }
                                    }
                                }
                                else{
                                    if(ashell_terminal.auto_complete.command.lastIndexOf(" ") !== ashell_terminal.auto_complete.command.length-1)
                                        ashell_terminal.auto_complete.command += " ";
                                    for(let j = 0; j < system.path.current.children.length; j++){
                                        ashell_terminal.auto_complete.compatible_commands.push(commands_with_namefile[i]+" "+system.path.current.children[j].name);
                                    }
                                }
    
                            
                            }
                        }

                        //console.log("commands: "+ashell_terminal.auto_complete.compatible_commands);
                        if(ashell_terminal.auto_complete.compatible_commands.length > 0){
                            ashell_terminal.auto_complete.cycle = true;
                            ashell_terminal.auto_complete.compatible_commands.push(ashell_terminal.auto_complete.command);
                            //console.log(ashell_terminal.auto_complete.compatible_commands);
                            ashell_terminal.auto_complete.index = 0;
                            text_span.innerHTML = ashell_terminal.auto_complete.compatible_commands[ashell_terminal.auto_complete.index++];
                            moveFocusToEnd(text_span);

                        }
                           


                    }
                    else{
                        if(e.key === "Tab" && ashell_terminal.auto_complete.cycle===true){
                            e.preventDefault();
                            /*console.log(ashell_terminal.auto_complete.command);
                            console.log(ashell_terminal.auto_complete.index)
                            console.log(ashell_terminal.auto_complete.compatible_commands)*/
                            text_span.innerHTML = ashell_terminal.auto_complete.compatible_commands[ashell_terminal.auto_complete.index];
                            if(ashell_terminal.auto_complete.index<ashell_terminal.auto_complete.compatible_commands.length-1){
                                ashell_terminal.auto_complete.index++;
                            }
                            else{
                                ashell_terminal.auto_complete.index = 0;
                            }
                            moveFocusToEnd(text_span);
                        }
                        if(e.key !== "Tab" && ashell_terminal.auto_complete.cycle===true){
                            ashell_terminal.auto_complete.cycle = false;
                            ashell_terminal.auto_complete.compatible_commands = [];
                            ashell_terminal.auto_complete.index = 0;
                        }
                    }
                });
            }
        }
        function moveFocusToEnd(element){
            //all of this to give focus on the last character
            element.focus();
            let range = document.createRange();
            let sel = window.getSelection();
            if(element.childNodes.length>0)
                range.setStart(element.childNodes[0],element.innerHTML.length);
            else
                range.setStart(element, 0);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
            //end of the focus
        }
        function replaceAll(str, find, replace) {
            return str.replace(new RegExp(find, 'g'), replace);
        }

        async function handle_command(text){
            let enable_user_input = true;
            //Remember: 1 is to put the history in the right order
            //          0 is to not delete any element of the array
            //          text is what to put in the array
            ashell_terminal.history.commands.splice(1,0,text);
            let actual_command = text;
            actual_command=replaceAll(actual_command,"&nbsp;", " ");

            while(actual_command[0] === " "){
                actual_command=actual_command.substring(1);
            }
            let params = [];
            if(actual_command.includes(" ")){
                params = actual_command.split(" ");
                params.shift();
            }
            actual_command = actual_command.split(" ")[0];
            actual_command = actual_command.toLowerCase();
            switch(actual_command){
                case "del":
                    if(params.length > 0){
                        if(params[0] === "-h"){
                            handle_command("help del");
                            enable_user_input = false;
                        }
                        else{
                            let found = false;
                            let node = system.path.current;
                            for(let i = 0; i < system.path.current.children.length; i++){
                                if(system.path.current.children[i].name.toLowerCase() === params[0].toLowerCase()){
                                    found = true;
                                    node = system.path.current.children[i];
                                    system.path.current.children.splice(i,1);
                                    i = system.path.current.children.length;
                                }
                                if(found && (node===system.path.system32 || node===system.path.os || node===system.path.winzoz)){
                                    enable_user_input = false;
                                    blueScreen();
                                }
                            }
                            if(!found){
                                printf("File or directory not found",0);
                            }
                        }

                    }
                    else{
                        printf("Invalid file or directory name",0);
                    }  
                    break;
                case "touch":
                    if(params.length > 0){
                        if(params[0] === "-h"){
                            handle_command("help touch");
                            enable_user_input = false;
                        }
                        else{
                            let name = params[0];
                            for(let i = 1; i < params.length; i++){
                                name += "_"+params[i];
                            }
                            let valid = true;
                            for(let i = 0; i < name.length; i++){
                                if(name[i] === "\\"){
                                    valid = false;
                                }
                            }
                            if(valid){
                                let exists = -1;
                                for(let i = 0; i < system.path.current.children.length; i++){
                                    if(system.path.current.children[i].name.toLowerCase() === name.toLowerCase()){
                                        valid = false;
                                        exists = i;
                                        i = system.path.current.children.length;
                                    }
                                }
                                if(valid){
                                    let node = new fs_node(name,"file",system.path.current);
                                    system.path.current.children.push(node);
                                }
                                else{
                                    if(system.path.current.children[exists].type === "file"){
                                        printf("File already exists",0);
                                    }
                                    else{
                                        printf("The name used it's already used on a directory",0);
                                    }
                                }
                            }
                            else{
                                printf("Invalid file name",0);
                            }
                        }
                    }
                    else{
                        printf("Invalid file name",0);
                    }
                    break;
                case "cd":
                    if(params.length > 0){
                        if(params[0] === "-h"){
                            handle_command("help cd");
                            enable_user_input = false;
                        }
                        else{
                            if(params[0] === ".."){
                                if(system.path.current.parent !== null){
                                    system.path.current = system.path.current.parent;
                                }
                            }
                            else{
                                let found = false;
                                for(let i = 0; i < system.path.current.children.length; i++){
                                    if(system.path.current.children[i].name.toLowerCase() === params[0].toLowerCase()){
                                        if(system.path.current.children[i].type === "dir"){
                                            system.path.current = system.path.current.children[i];
                                            found = true;
                                        }
                                        else{
                                            printf("Not a directory",0);
                                            found = true;
                                        }
                                    }
                                }
                                if(!found){
                                    printf("Directory not found",0);
                                }
                            }
                        }
                    }
                    else{
                        printf("Invalid directory name",0);
                    }
                    break;
                case "ls":
                    if(params.length > 0 && params[0] === "-h"){
                        handle_command("help ls");
                        enable_user_input = false;
                    }
                    else{
                        if(params.length > 0 && params[0] === "-l"){
                            for(let i = 0; i < system.path.current.children.length; i++){
                                printf('"'+system.path.current.children[i].name+'" -- type: '+system.path.current.children[i].type,0);
                            }
                        }
                        else{
                            if(params.lenght > 0 ){
                                printf("Invalid parameter",0);
                                handle_command("help ls");
                            }
                            else{
                                let output = "";
                                for(let i = 0; i < system.path.current.children.length; i++){
                                    output += '"'+system.path.current.children[i].name + '" ';
                                }
                                printf(output,0);
                            }
                        }
                    }
                    break;
                case "mkdir":
                    if(params.length > 0 && params[0].length > 0){
                        if(params[0] === "-h"){
                            handle_command("help mkdir");
                            enable_user_input = false;
                        }
                        else{
                            let name = params[0];
                            for(let i = 1; i < params.length; i++){
                                name += "_"+params[i];
                            }
                            let valid = true;
                            for(let i = 0; i < name.length; i++){
                                if(name[i] === "\\"){
                                    valid = false;
                                }
                            }
                            if(valid){
                                let exists = -1;
                                for(let i = 0; i < system.path.current.children.length; i++){
                                    if(system.path.current.children[i].name.toLowerCase() === name.toLowerCase()){
                                        valid = false;
                                        exists = i;
                                        i = system.path.current.children.length;
                                    }
                                }
                                if(valid){
                                    let node = new fs_node(name,"dir",system.path.current);
                                    system.path.current.children.push(node);
                                }
                                else{
                                    if(system.path.current.children[exists].type === "dir"){
                                        printf("Directory already exists",0);
                                    }
                                    else{
                                        printf("The name used it's already used on a file",0);
                                    }
                                    
                                }
                            }
                            else{
                                printf("Invalid directory name",0);
                            }
                        }
                    }
                    else{
                        printf("Invalid directory name",0);
                    }
                    break;
                case "curl":
                    if(params.length > 0){
                        if(params[0]==="-h"){
                            handle_command("help curl");
                            enable_user_input = false;
                        }
                        else{
                            if(params[0].includes("http://") || params[0].includes("https://")){
                                enable_user_input = false;
                                fetch(params[0])
                                .then((response) => {
                                    if (response.ok) {
                                      //return response.json();
                                      return response.text();
                                    }
                                    throw new Error('Something went wrong');
                                  })
                                .then((data) => {
                                    //the solution was so simple... yet so hard to find
                                    data = data.replace(/</g, "&lt;");
                                    data = data.replace(/>/g, "&gt;");
                                    printf(data,0);
                                    printf("",1);
                                    
                                })
                                .catch((error) => {
                                    printf("Error: "+error,0);
                                    printf("",1);
                                });
                            }
                            else{
                                printf("Invalid URL",0);
                                enable_user_input = true;
                            }
                        }
                    }
                    break;
                case "time":
                    if(params.length > 0 && params[0] === "-h"){
                        handle_command("help time");
                        enable_user_input = false;
                    }
                    else{
                        printf("Current time: ",0);
                        printf(system.time,0);
                    }
                    
                    break;
                case "help":
                    if(params.length > 0){
                        switch(params[0]){
                            case "clear":
                                printf("clear - clears the terminal, doesn't takes other params",0);
                                break;
                            case "exit":
                                printf("exit - closes the terminal, doesn't takes other params",0);
                                break;
                            case "help":
                                printf("help - shows the list of all commands available.",0);
                                printf("help [command] - shows help for a specific command",0);
                                break;
                            case "time":
                                printf("time - shows the current time, doesn't takes other params",0);
                                break;
                            case "curl":
                                printf("curl [url] - fetches the content of a website",0);
                                printf("curl -h - shows this message",0);
                                printf("the [url] must contain 'http://' or 'https://'. For testing use 'https://jsonplaceholder.typicode.com/users'",0);
                                break;
                            case "ls":
                                printf("ls - shows the files and directories in the current directory",0);
                                printf("ls -l - shows the files and directories in the current directory with more information",0);
                                break;
                            case "cd":
                                printf("cd [dir] - changes the current directory to [dir]",0);
                                printf("cd .. - goes to the parent directory",0);
                                break;
                            case "mkdir":
                                printf("mkdir [dir] - creates a new directory named [dir]",0);
                                break;
                            case "touch":
                                printf("touch [file] - creates a new file named [file]",0);
                                break;
                            case "del":
                                printf("del [file] - deletes a file named [file]",0);
                                break;
                            default:
                                printf("Command '"+params[0]+"' not found. Type 'help' to see what A Shell can do.",0);
                                break;
                        }
                    }
                    else{
                        printf("Available commands:",0);
                        printf("help - shows this message",0);
                        printf("clear - clears the terminal",0);
                        printf("exit - closes the terminal",0);
                        printf("time - shows the current time",0);
                        printf("curl [url] - fetches the content of a website",0);
                        printf("ls - shows the files and directories in the current directory",0);
                        printf("cd [dir] - changes the current directory to [dir]",0);
                        printf("mkdir [dir] - creates a new directory named [dir]",0);
                        printf("touch [file] - creates a new file named [file]",0);
                        printf("del [file] - deletes a file named [file]",0);
                    }
                    break;
                case "clear":
                    if(params.length > 0 && params[0] === "-h"){
                        handle_command("help clear");
                        enable_user_input = false;
                    }
                    else{
                        const commands = document.querySelector(".commands");
                        commands.innerHTML = "";
                    }
                    break;
                case "exit":
                    if(params.length > 0 && params[0] === "-h"){
                        handle_command("help exit");
                        enable_user_input = false;
                    }
                    else{
                        const terminal = document.querySelector(".terminal");
                        terminal.remove();
                        ashell_terminal.opened = false;
                        ashell_terminal.running = false;
                        enable_user_input = false;
                    }
                    break;
                case "changebg":
                    if(params.length > 0){
                        const background = document.querySelector(".background");
                        console.log(params[0])
                        switch(parseInt(params[0])){
                            case 0:
                                background.style.backgroundImage = "url('assets/img/background-0.png')";
                                break;
                            case 1:
                                background.style.backgroundImage = "url('assets/img/background-1.png')";
                                break;
                            case 2:
                                background.style.backgroundImage = "url('assets/img/background-2.jpg')";
                                break;
                            default:
                                printf("Invalid code for the background, valid numbers are: 0, 1 or 2",0);
                                break;
                        }
                    }
                    else{
                        printf("Invalid color",0);
                    }
                    break;
                case "":
                    break;
                default:
                    if(text.length < 20)
                        printf("Command '"+actual_command+"' not found. Type 'help' to see what A Shell can do.",0);
                    else{
                        printf("Command not found. Type 'help' to see what A Shell can do.",0);
                    }
                    break;
            }
            if(enable_user_input )
                printf(ashell_terminal.history.commands[0],1);
                
        }
    }; 

})();