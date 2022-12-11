import * as SSC_Struct from "../BasicStruct";
export class LoginStruct implements SSC_Struct.ICommandAble{
    UserID:string;
    Password:string;
    constructor(userID:string,password:string){
        this.UserID=userID;
        this.Password=password;
    }
    public GetCommandObj():SSC_Struct.CommandStruct{
        return new SSC_Struct.CommandStruct("Login",this);
    }
}