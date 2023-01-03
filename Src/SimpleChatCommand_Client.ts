
export * from "./SimpleChatCommand_Client/BasicStruct";
import * as SSC_Struct from "./SimpleChatCommand_Client/BasicStruct";
/**
 * @class
 * test
 */
export class SimpleChatCommand_Client{
    private m_MessageSender:SSC_Struct.IMessageSender;
    public constructor(messageSender:SSC_Struct.IMessageSender){
        this.m_MessageSender=messageSender;
    }
    public async Login(userID:string,password:string){
        this.m_MessageSender.SendMessage(
            new SSC_Struct.LoginStruct(userID,password)
        );
    }
    public async Logout(){
        this.m_MessageSender.SendMessage(
            new SSC_Struct.LogoutStruct()
        );
    }
    public async SendMessage(receiverID:string,message:string){
        this.m_MessageSender.SendMessage(
            new SSC_Struct.MessageStruct(receiverID,message)
        )
    }
    protected async SendCommand(command:SSC_Struct.ICommandAble){
        this.m_MessageSender.SendMessage(
            command
        );
    }
    public async Broadcast(broadcast:string){
        this.m_MessageSender.SendMessage(
            new SSC_Struct.BroadcastStruct(broadcast)
        )
    }
    public On(eventName:string,handler:Function){
        if(eventName === "message"){
            this.m_MessageSender.SetMessageHandler(handler);
        }
    }
    public SendCustomerCommand = this.SendCommand;
}
