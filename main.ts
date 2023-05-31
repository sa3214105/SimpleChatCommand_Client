import * as x from "./Src/index"
import {MessageSender_WebSocket} from "./Src/MessageSender_node"
main();
async function main() {
    let messageSender = new MessageSender_WebSocket("ws://127.0.0.1:8080/");
    let ssc_c = new x.SimpleChatCommand_Client(messageSender);
    try{
        let xx=await ssc_c.Login("Test1","test1");
        let waitMsg = new Promise(res=>{
            ssc_c.On("message",(msg)=>{
                console.log(msg)
                res(msg);
            });
            ssc_c.SendMessage("Test1","ssc_c");
        })
        console.log(await waitMsg);
    }catch(e){
        console.log(e);
    }
    console.log("await waitMsg");
}