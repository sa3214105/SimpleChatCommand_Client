import * as SCC_C from "../Src/index"
import * as TestClass from "./ClassForTest"

test("Login",async()=>{
    let sender = new TestClass.MessageSender();
    let sscClient = new SCC_C.SimpleChatCommand_Client(sender);
    expect(await sscClient.Login("user1","p@ssw0rd")).toBe(true);
    expect(await sscClient.Logout()).toBe(true);
    expect(await sscClient.Login("123","4567")).toBe(false);
})

test("SendMessage",async()=>{
    let sender = new TestClass.MessageSender();
    let sscClient = new SCC_C.SimpleChatCommand_Client(sender);
    expect(await sscClient.Login("user1","p@ssw0rd")).toBe(true);
    let waitMsg=new Promise((res,rej)=>{
        sscClient.On("message",res);
        sscClient.SendMessage("user1","testMsg");
        setTimeout(rej.bind(this,new Error("Time out")),500);
    });
    expect(await waitMsg).toEqual({
        Sender:"user1",
        Receiver:"user1",
        Message:"testMsg"
    });
})

test("SendBroadCast",async()=>{
    let sender = new TestClass.MessageSender();
    let sscClient = new SCC_C.SimpleChatCommand_Client(sender);
    expect(await sscClient.Login("user1","p@ssw0rd")).toBe(true);
    let waitBroadCast=new Promise(res=>{
        sscClient.On("message",res);
        sscClient.Broadcast("testMsg");
    })
    expect(await waitBroadCast).toEqual({
        Sender:"user1",
        Receiver:"user1",
        Message:"testMsg"
    });
})