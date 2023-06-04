import * as SCC_C from "../Src/index";
import * as SCC_S from "simplechatcommand_server"
type MessageInfo={
    receiver:string|null,
    message:string
};
export class MessageSender implements SCC_C.IMessageSender{
    private m_EventHandlers:((msg:SCC_C.CommandResultStruct)=>any)|null = null;
    private m_MessageHandler:((messagePackage: SCC_C.MessagePackageStruct) => any)|null=null;
    private m_FakeMessageManager:SCC_S.IMessageManager;
    private m_FakeServer:SCC_S.SimpleChatCommand_Server;
    private m_FakeSocket:FakeSocket;
    constructor(){
        let room=new Room();
        this.m_FakeMessageManager = new MessageManagerForTest(room);
        this.m_FakeServer = 
            new SCC_S.SimpleChatCommand_Server(
                new UserValidatorForTest(),
                this.m_FakeMessageManager
            );
        this.m_FakeSocket=room.CreateSocket();
        this.m_FakeSocket.addEventListener((sender,msg)=>{
            let obj = JSON.parse(msg);
            if(SCC_C.isMessagePackageStruct(obj)&&this.m_MessageHandler){
                this.m_MessageHandler(obj);
            }else if(SCC_C.isCommandResultStruct(obj)&&this.m_EventHandlers){
                this.m_EventHandlers(obj);
            }
        });
    }
    SetEventHandler(handler: (result:SCC_C.CommandResultStruct)=>any): void {
        this.m_EventHandlers = handler;
    }
    SetMessageHandle(handler: (messagePackage: SCC_C.MessagePackageStruct) => any): void {
        this.m_MessageHandler = handler;
    }
    async SendMessage(command: SCC_C.ICommandAble){
        this.m_FakeSocket.SendMsg(JSON.stringify(command.GetCommandObj()));
    }
}
class Room{
    Users:Array<FakeSocket>=[]
    CreateSocket(){
        let ret=new FakeSocket(this);
        this.Users.push(ret);
        return ret;
    }
}
class FakeSocket extends SCC_S.UserStruct{
    private m_Room:Room;
    public m_Listener:((sender:FakeSocket,msg:string)=>SCC_S.MessageHandlerResult)|null=null;
    constructor(room:Room){
        super();
        this.m_Room = room;
    }
    SendMsg(msg:string){
        this.m_Room.Users
            .filter(user=>user!==this)
            .forEach(user=>{
                if(user.m_Listener){
                    user.m_Listener(this,msg);
                }
            });
    }
    addEventListener(listener: ((sender:FakeSocket,msg: string) => any)){
        this.m_Listener = listener;
    }
}
class MessageManagerForTest extends SCC_S.IMessageManager{
    m_Socket:FakeSocket;
    m_Listener:((obj:any)=>void)|null = null;
    
    constructor(room:Room){
        super();
        this.m_Socket = room.CreateSocket();
    }
    SetMessageHandler(messageHandler: (sender: SCC_S.UserStruct,obj:any)=>Promise<SCC_S.MessageHandlerResult>): void{
        this.m_Socket.addEventListener(async (sender,msg) => {
            let result = await messageHandler(sender,JSON.parse(msg));
            this.m_Socket.SendMsg(JSON.stringify(result))
        });
    }
    SendMessage(sender: SCC_S.UserStruct, receiver: SCC_S.UserStruct, message: string): void{
        let messagePackage = {
            Sender:sender.ID,
            Receiver:receiver.ID,
            Message:message
        }
        this.m_Socket.SendMsg(JSON.stringify(messagePackage));
    }
}
class UserValidatorForTest extends SCC_S.IUserValidator{
    m_Users=[
        ["user1","p@ssw0rd"],
        ["user2","p@ssw0rd"],
        ["user3","p@ssw0rd"],
    ]
    async CreateUser(userName:string,password:string){
        this.m_Users.push([userName,password]);
    }
    async Auth(userName:string,password:string):Promise<any>{
       return this.m_Users.find(user=>user[0]===userName&&user[1]===password);
    }
}