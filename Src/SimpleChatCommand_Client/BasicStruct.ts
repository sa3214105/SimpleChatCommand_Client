export * from "./CommandStructs/BroadcastStruct";
export * from "./CommandStructs/GetUsersStruct";
export * from "./CommandStructs/LoginStruct";
export * from "./CommandStructs/LogoutStruct";
export * from "./CommandStructs/MessageStruct";
export * from "./CommandStructs/ResultStruct";
export interface IMessageSender{
    SendMessage(command:ICommandAble):Promise<void>;
    SetEventHandler(handler:(result:CommandResultStruct)=>any):void;
    SetMessageHandle(handler:(messagePackage:MessagePackageStruct)=>any):void;
}
export class CommandStruct{
    Command:string;
    Data:Object;
    constructor (command:string,data:Object){
        this.Command = command;
        this.Data = data;
    }
}
export interface ICommandAble{
    GetCommandObj():CommandStruct;
}

export interface CommandResultStruct {
    Command:string;
    State:string;
}
export function isCommandResultStruct(obj:any):obj is CommandResultStruct{
    return  obj &&
            typeof obj.Command === "string" &&
            typeof obj.State === "string";
}

export interface MessagePackageStruct {
    Sender:string;
    Receiver:string;
    Message:string;
}
export function isMessagePackageStruct(obj:any):obj is MessagePackageStruct{
    return  obj &&
            typeof obj.Sender === "string" &&
            typeof obj.Receiver === "string" &&
            typeof obj.Message === "string";
}
