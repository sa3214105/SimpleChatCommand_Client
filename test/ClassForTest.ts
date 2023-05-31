import * as SCC_C from "../Src/index";
type MessageInfo={
    receiver:string|null,
    message:string
};
export class MessageSender implements SCC_C.IMessageSender{
    private m_EventHandlers:Array<(msg:SCC_C.CommandResultStruct)=>any> = [];
    private m_MessageHandler:((messagePackage: SCC_C.MessagePackageStruct) => any)|null=null;
    SetEventHandler(handler: (result:SCC_C.CommandResultStruct)=>any): void {
        this.m_EventHandlers.push(handler);
    }
    SetMessageHandle(handler: (messagePackage: SCC_C.MessagePackageStruct) => any): void {
        this.m_MessageHandler = handler;
    }
    async SendMessage(command: SCC_C.ICommandAble){
        let receiver = null;
        this.m_MessageList.push({
            receiver,message:JSON.stringify(command)
        })
        if(command instanceof SCC_C.MessageStruct){
            for(let messageHandler of this.m_EventHandlers){
                let result = {
                    Command:"SendMessage",
                    State:"success",
                    Data:{
                        message:command.Message
                    }
                };
                messageHandler(result);
                if(this.m_MessageHandler){
                    this.m_MessageHandler({
                        Sender:"test",
                        Receiver:"test",
                        Message:command.Message
                    });
                }
            }
        }else if(command instanceof SCC_C.LoginStruct){
            for(let messageHandler of this.m_EventHandlers){
                let result =  {
                    Command:"Login",
                    State: 
                        command.UserID=="123" && command.Password=="456"?
                        "success":
                        "failed",
                    Data:{
                        message:""
                    }
                };
                messageHandler(result);
            }
        }
    }
    m_MessageList:Array<MessageInfo> = [];
}