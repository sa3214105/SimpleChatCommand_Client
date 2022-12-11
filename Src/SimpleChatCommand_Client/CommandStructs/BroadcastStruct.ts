import * as SSC_Struct from "../BasicStruct";
export class BroadcastStruct implements SSC_Struct.ICommandAble{
    BroadCast:string;
    constructor(broadcast:string){
        this.BroadCast = broadcast;
    }
    GetCommandObj(): SSC_Struct.CommandStruct {
        throw new Error("Method not implemented.");
    }
}