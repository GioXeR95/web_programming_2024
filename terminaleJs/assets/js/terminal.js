( ()=>{
    //Terminal with js!
    window.onload = function(){
        let terminal_open=false;
        console.log(document.querySelectorAll(".app-launch"));
        console.log(document.querySelectorAll(".background"));
        const background = document.getElementsByClassName(".background");
        console.log(background);
        document.querySelector(".app-launch").addEventListener("click", ()=>{
            if(terminal_open){
                document.querySelector(".terminal").style.display="none";
                terminal_open=false;
            }
            else{
                const terminal = document.createElement("div");
                terminal.classList.add("terminal");
                terminal.innerHTML = `
                <div class="window">
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
                </div>
                `;
                document.querySelector(".desktop").appendChild(terminal);
                terminal.style.display="inline-block";
                terminal_open=true;
            }
        });
    }; 

})();