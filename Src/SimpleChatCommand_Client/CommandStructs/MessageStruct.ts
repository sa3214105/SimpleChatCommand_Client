import * as SSC_Struct from "../BasicStruct";
export class MessageStruct implements SSC_Struct.ICommandAble{
    Receiver:string;
    Message:string;
    constructor(receiverID:string,message:string){
        this.Receiver = receiverID;
        this.Message = message;
    }
    GetCommandObj(): SSC_Struct.CommandStruct {
       return new SSC_Struct.CommandStruct("SendMessage",this);
    }
}