import * as SCC_C from "../Src/index";
type MessageInfo={
    sender:SCC_C.IUserStruct,
    receiver:SCC_C.IUserStruct|null,
    message:string
};
export class UserStruct implements SCC_C.IUserStruct{
    m_Id: string;
    constructor(){
        this.m_Id = "-1";
    }
    IsLoginIn(): boolean {
        throw true;
    }
    GetID(): string {
        return this.m_Id;
    }
}
export class MessageSender implements SCC_C.IMessageSender{
    SendMessage(sender: SCC_C.IUserStruct, command: SCC_C.ICommandAble): void {
        let receiver = null;
        this.m_MessageList.push({
            sender,receiver,message:JSON.stringify(command)
        })
    }
    m_MessageList:Array<MessageInfo> = [];
    CreateUser(): SCC_C.IUserStruct {
        return new UserStruct();
    }
}