import * as SCC_C from "../Src/index"
import * as TestClass from "./ClassForTest"
test("Create SimpleChatCommand_Client",()=>{
    let sender = new TestClass.MessageSender();
    let sscClient = new SCC_C.SimpleChatCommand_Client(sender);
    sscClient.Login("123","456");
    console.log(sender.m_MessageList);
});

test("Login",async()=>{
    let sender = new TestClass.MessageSender();
    let sscClient = new SCC_C.SimpleChatCommand_Client(sender);
    expect(await sscClient.Login("123","456")).toBe(true);
    expect(await sscClient.Login("123","4567")).toBe(false);
})

test("SendMessage",async()=>{
    let sender = new TestClass.MessageSender();
    let sscClient = new SCC_C.SimpleChatCommand_Client(sender);
    sscClient.Login("123","456");
    let waitMsg=new Promise(res=>{
        sscClient.On("message",res);
        sscClient.SendMessage("","testMsg");
    });
    expect(await waitMsg).toEqual({
        Sender:"test",
        Receiver:"test",
        Message:"testMsg"
    });
})

//TODO
test("SendBroadCast",async()=>{
    let sender = new TestClass.MessageSender();
    let sscClient = new SCC_C.SimpleChatCommand_Client(sender);
    sscClient.Login("123","456");
})