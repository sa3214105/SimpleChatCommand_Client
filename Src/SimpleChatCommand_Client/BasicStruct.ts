export * from "./CommandStructs/BroadcastStruct";
export * from "./CommandStructs/GetUsersStruct";
export * from "./CommandStructs/LoginStruct";
export * from "./CommandStructs/LogoutStruct";
export * from "./CommandStructs/MessageStruct";
export * from "./CommandStructs/ResultStruct";
export interface IMessageSender{
    SendMessage(command:ICommandAble):Promise<void>;
    SetMessageHandler(result:(result:ResultStruct)=>any):void;
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

export type ResultStruct = {
    Command:string;
    State:string;
}

// export function MessageResult(MessageResult: any, handler: (msg: string) => any) {
//     throw new Error("Function not implemented.");
// }
