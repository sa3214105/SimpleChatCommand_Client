import * as SCC_C from "../Src/index";
type MessageInfo={
    receiver:string|null,
    message:string
};
export class MessageSender implements SCC_C.IMessageSender{
    SetMessageHandler(handler: Function): void {
        throw new Error("Method not implemented.");
    }
    async SendMessage(command: SCC_C.ICommandAble){
        let receiver = null;
        this.m_MessageList.push({
            receiver,message:JSON.stringify(command)
        })
    }
    m_MessageList:Array<MessageInfo> = [];
}