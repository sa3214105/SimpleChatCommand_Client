import * as x from "./Src/index"
import {MessageSender_WebSocket} from "./Src/MessageSender_node"
main();
async function main() {
    let messageSender = new MessageSender_WebSocket("ws://127.0.0.1:8080/");
    let ssc_c = new x.SimpleChatCommand_Client(messageSender);
    ssc_c.On("message",(msg)=>{
        console.log(msg)
    });
    ssc_c.Login("Test1","test1");
    await new Promise((res)=>setTimeout(res,1000))
}