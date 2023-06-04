import * as SSC_Struct from "../BasicStruct";
export class BroadcastStruct implements SSC_Struct.ICommandAble{
    Broadcast:string;
    constructor(broadcast:string){
        this.Broadcast = broadcast;
    }
    GetCommandObj(): SSC_Struct.CommandStruct {
        return new SSC_Struct.CommandStruct("Broadcast",this);
    }
}