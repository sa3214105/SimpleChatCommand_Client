import * as SSC_Struct from "../BasicStruct";
export class LogoutStruct implements SSC_Struct.ICommandAble{
    public GetCommandObj():SSC_Struct.CommandStruct{
        return new SSC_Struct.CommandStruct("Logout", {});
    }
}