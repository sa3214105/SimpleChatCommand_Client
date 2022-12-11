export * from "./CommandStructs/BroadcastStruct";
export * from "./CommandStructs/GetUsersStruct";
export * from "./CommandStructs/LoginStruct";
export * from "./CommandStructs/LogoutStruct";
export * from "./CommandStructs/MessageStruct";
export interface IUserStruct{
    IsLoginIn():boolean;
    GetID():string;
}
export interface IMessageSender{
    CreateUser():IUserStruct;
    SendMessage(sender:IUserStruct,command:ICommandAble):void;
}
export class CommandStruct{
    Command:String;
    Data:Object;
    constructor (command:string,data:Object){
        this.Command = command;
        this.Data = data;
    }
}
export interface ICommandAble{
    GetCommandObj():CommandStruct;
}