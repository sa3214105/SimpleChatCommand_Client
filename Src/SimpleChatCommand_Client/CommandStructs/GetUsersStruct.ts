import * as SSC_Struct from "../BasicStruct";
export class GetUsersStruct implements SSC_Struct.ICommandAble{
    GetCommandObj(): SSC_Struct.CommandStruct {
        return new SSC_Struct.CommandStruct("GetUsers", {});
    }
}