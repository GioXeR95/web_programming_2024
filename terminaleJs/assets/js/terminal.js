const background = document.getElementsByClassName(".background");
    console.log(background);
( ()=>{
    //Terminal with js!
    let terminal_open=false;
    console.log(document.querySelectorAll(".app-launch"));
    console.log(document.querySelectorAll(".background"));
    const background = document.getElementsByClassName(".background");
    console.log(background);
    /*document.querySelector(".app-launch").addEventListener("click", ()=>{
        if(terminal_open){
            document.querySelector(".terminal").style.display="none";
            terminal_open=false;
        }
        else{
            const terminal = document.createElement("div");
            terminal.classList.add("terminal");
            terminal.innerHTML = `
                <div class="terminal-header">
                    <div class="terminal-header-title">Terminal</div>
                    <div class="terminal-header-close">X</div>
                </div>
                <div class="terminal-body">
                    <div class="terminal-body-content">
                        <div class="terminal-body-content-text">Welcome to the terminal!</div>
                    </div>
                    <div class="terminal-body-input">
                        <input type="text" class="terminal-body-input-text" placeholder="Enter command here">
                    </div>
                </div>
            `;
            document.querySelector(".desktop").appendChild(terminal);
            terminal_open=true;
        }
    });*/
})();