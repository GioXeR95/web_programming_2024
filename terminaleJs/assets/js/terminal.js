( ()=>{
    //Terminal with js!
    const ashell_terminal = {
        "running" : false,
        "opened" : false,
        "maximized" : false,
        "height" : 250,
        "width" : 500,
        "position" : [20,20],
        "commands" : [],
        "history" : [["A Shell",0],["Welcome to the terminal! Type 'help' to get started!",0],["help",1]],
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
                        <div class="command" contenteditable>
                        
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
    window.onload = function(){
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
                        const commands = document.querySelector(".command");
                        for(let i = 0; i < ashell_terminal.history.length; i++){
                            //commands.innerHTML += ashell_terminal.history[i] + "<br>";
                            printf(ashell_terminal.history[i][0], ashell_terminal.history[i][1]);
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
            const commands = document.querySelector(".command");
            const command = document.createElement("div");
            commands.appendChild(command);
            
            if(type==1){
                console.log("type 1",text)
                const user = document.createElement("span");
                user.innerHTML = user_shell.content;
                user.style.color = user_shell.color;
                user.style.fontWeight = user_shell.font_weight;
                user.style.display = "inline";
                command.appendChild(user);
                
            }
            command.innerHTML += text;
            
            
        }
        

    }; 

})();