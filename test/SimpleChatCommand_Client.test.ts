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
        setTimeout(rej.bind(this,new Error("Time out")),500);
        sscClient.SendMessage("user1","testMsg").catch(rej);
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
    let waitBroadCast=new Promise((res,rej)=>{
        sscClient.On("message",res);
        setTimeout(rej.bind(this,new Error("Time out")),500);
        sscClient.Broadcast("testMsg").catch(rej);
    })
    expect(await waitBroadCast).toEqual({
        Sender:"user1",
        Receiver:"user1",
        Message:"testMsg"
    });
})

test("GetUsers",async()=>{
    let sender = new TestClass.MessageSender();
    let sscClient = new SCC_C.SimpleChatCommand_Client(sender);
    expect(await sscClient.Login("user1","p@ssw0rd")).toBe(true);
    expect(await sscClient.Login("user2","p@ssw0rd_wrong")).toBe(false);    
    expect(await sscClient.GetUsers()).toEqual(["user1"]);
    expect(await sscClient.Logout()).toBe(true);
    expect(await sscClient.Login("user3","p@ssw0rd"));
    expect(await sscClient.GetUsers()).toEqual(["user3"]);
})