
export * from "./BasicStruct";
import * as SSC_Struct from "./BasicStruct";
export class SimpleChatCommand_Client{
    m_MessageSender:SSC_Struct.IMessageSender;
    m_UserStruct:SSC_Struct.IUserStruct;
    public constructor(messageSender:SSC_Struct.IMessageSender){
        this.m_MessageSender=messageSender;
        this.m_UserStruct=messageSender.CreateUser();
    }
    public Login(userID:string,password:string):void{
        this.m_MessageSender.SendMessage(
            this.m_UserStruct,
            new SSC_Struct.LoginStruct(userID,password)
        );
    }
    public Logout():void{
        this.m_MessageSender.SendMessage(
            this.m_UserStruct,
            new SSC_Struct.LogoutStruct()
        );
    }
    public SendMessage(receiverID:string,message:string):void{
        this.m_MessageSender.SendMessage(
            this.m_UserStruct,
            new SSC_Struct.MessageStruct(receiverID,message)
        )
    }
    protected SendCommand(command:SSC_Struct.ICommandAble):void{
        this.m_MessageSender.SendMessage(
            this.m_UserStruct,
            command
        );
    }
    public Broadcast(broadcast:string):void{
        this.m_MessageSender.SendMessage(
            this.m_UserStruct,
            new SSC_Struct.BroadcastStruct(broadcast)
        )
    }
   
    public SendCustomerCommand = this.SendCommand;
}
