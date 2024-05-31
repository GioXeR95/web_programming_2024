( ()=>{
    //Terminal with js!
    let system = {
        "time" : "",
        "timeout_timer": ""
    }
    const ashell_terminal = {
        "running" : false,
        "opened" : false,
        "maximized" : false,
        "height" : 250,
        "width" : 500,
        "position" : [20,20],
        "commands" : [],
        "init" : [["A Shell",0],["Welcome to A Shell! Type 'help' to get started!",0],["",1]],
        "history" : [],
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
    const user_shell = {
        content : "magic@winzoz> ",
        color: "#4f93ff",
        font_weight: "bold",
        margin: "0 2px"
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

        const starting_points = document.querySelectorAll(".app-launch");
        for(let i = 0; i < starting_points.length; i++){
            starting_points[i].addEventListener("click", ()=>{
                if(ashell_terminal.running){
                    const terminal = document.querySelector(".terminal");
                    if(ashell_terminal.opened){
                        //terminal is opened so it should get minimized
                        //change state to opened=false

                        //visual changes
                        terminal.style.display = "none";
                        //logic changes
                        ashell_terminal.opened = false;
                    }
                    else{
                        //terminal isn't opened but it's running in background

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
                    //logic changes
                    ashell_terminal.opened = false;
                });
            }
        }
        function make_maximize_button_work(){
            if(ashell_terminal.running && ashell_terminal.opened){
                const maximize_button = document.querySelector(".button.maximize");
                maximize_button.addEventListener("click", ()=>{
                    //maximize the terminal
                    //visual changes
                    if(ashell_terminal.maximized){

                        const shell_window = document.querySelector(".window");
                        shell_window.classList.remove("maximized");
                        //logic changes
                        ashell_terminal.maximized = false;
                    }
                    else{
                        const shell_window = document.querySelector(".window");
                        shell_window.classList.add("maximized");
                        //logic changes
                        ashell_terminal.maximized = true;
                    }
                });
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
                console.log("type 1",text)
                const user = document.createElement("span");
                user.innerHTML = user_shell.content;
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
                text_span.addEventListener("keydown", (e)=>{
                    if(e.key === "Enter"){
                        e.preventDefault();
                        handle_command(text_span);
                    }
                });
            }
            
            
        }
        function replaceAll(str, find, replace) {
            return str.replace(new RegExp(find, 'g'), replace);
        }

        function handle_command(command){
            const text = command.innerHTML;
            //ashell_terminal.history.push(text);
            //make a function to handle history later
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

            console.log("actual_command: ",actual_command);
            console.log("params: ",params);
            switch(actual_command){
                case "time":
                    printf(system.time,0);
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
                                printf("help - shows this message",0);
                                printf("help [command] - shows help for a specific command",0);
                                break;
                            case "time":
                                printf("time - shows the current time, doesn't takes other params",0);
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
                    }
                    break;
                case "clear":
                    const commands = document.querySelector(".commands");
                    commands.innerHTML = "";
                    break;
                case "exit":
                    const terminal = document.querySelector(".terminal");
                    terminal.remove();
                    ashell_terminal.opened = false;
                    ashell_terminal.running = false;
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
            if(text != "exit")
                printf("",1);
        }
    }; 

})();