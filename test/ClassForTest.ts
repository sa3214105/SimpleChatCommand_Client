import * as SCC_C from "../Src/index";
type MessageInfo={
    receiver:string|null,
    message:string
};
export class MessageSender implements SCC_C.IMessageSender{
    #MessageHandler:Array<(msg:SCC_C.ResultStruct)=>any> = []
    SetMessageHandler(handler: (result:SCC_C.ResultStruct)=>any): void {
        this.#MessageHandler.push(handler);
    }
    async SendMessage(command: SCC_C.ICommandAble){
        let receiver = null;
        this.m_MessageList.push({
            receiver,message:JSON.stringify(command)
        })
        if(command instanceof SCC_C.MessageStruct){
            for(let messageHandler of this.#MessageHandler){
                let result = {
                    Command:"SendMessage",
                    State:"success",
                    Data:{
                        message:command.Message
                    }
                };
                messageHandler(result);
            }
        }else if(command instanceof SCC_C.LoginStruct){
            for(let messageHandler of this.#MessageHandler){
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