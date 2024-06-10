const privateLog = (message) => {
    const time = new Date();
    console.log("[" +time.getDate() + "/" + time.getMonth()+"/"+ time.getFullYear() + " " + time.getHours()+":"+time.getMinutes()+":"+time.getSeconds()+"] : " + message);
}

const boh = "boh";

const log = (message) => {
    privateLog(message);
}

module.exports = {log, boh}
