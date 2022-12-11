import * as SCC_C from "../Src/index"
import * as TestClass from "./ClassForTest"
test("Create SimpleChatCommand_Client",()=>{
    let sender = new TestClass.MessageSender();
    let sscClient = new SCC_C.SimpleChatCommand_Client(sender);
    sscClient.Login("123","456");
    console.log(sender.m_MessageList);
});