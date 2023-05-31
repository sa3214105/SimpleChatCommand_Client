
export * from "./SimpleChatCommand_Client/BasicStruct";
import * as SSC_Struct from "./SimpleChatCommand_Client/BasicStruct";
/**
 * @class
 * test
 */
export class SimpleChatCommand_Client{
    private m_timeOut=5000;
    private m_MessageSender:SSC_Struct.IMessageSender;
    private m_EventManager:EventManager;
    public constructor(messageSender:SSC_Struct.IMessageSender){
        this.m_MessageSender = messageSender;
        this.m_EventManager = new EventManager();
        this.m_MessageSender.SetMessageHandler((result)=>{
            try{
                this.m_EventManager.DispenserEvent(result)
            }catch(e){
                console.error(e);
                this.WriteErrorLog("internal error");
            }
        });
    }
    private WriteErrorLog(msg:string){
        console.error(msg);
    }
    public async Login(userID:string,password:string):Promise<boolean>{
        return await this.SendCommand(
            new SSC_Struct.LoginStruct(userID,password)
        );
    }
    public async Logout(){
        return await this.SendCommand(
            new SSC_Struct.LogoutStruct()
        );
    }
    public async SendMessage(receiverID:string,message:string){
        return await this.SendCommand(
            new SSC_Struct.MessageStruct(receiverID,message)
        );
    }
    public async Broadcast(broadcast:string){
        return await this.m_MessageSender.SendMessage(
            new SSC_Struct.BroadcastStruct(broadcast)
        );
    }
    protected async SendCommand(command:SSC_Struct.ICommandAble):Promise<boolean>{
        return new Promise((res,rej)=>{
            this.m_EventManager.AddEventListener(command.GetCommandObj().Command,(loginResult)=>{
                res(loginResult.State==="success");
            },true);
            this.m_MessageSender.SendMessage(
                command
            );
            setTimeout(rej.bind(this,new Error("Time out")),this.m_timeOut);
        });
    }
    public On(eventName:string,listener:(msg:string)=>any){
        if(eventName === "message"){
            this.m_EventManager.AddEventListener("SendMessage",(result)=>{
                if(result as SSC_Struct.MessageResult){
                    listener((result as SSC_Struct.MessageResult).Data.message);
                }
            })
        }
    }
    public SendCustomerCommand = this.SendCommand;
}
export class EventManager{
    private m_ListenerMap:Map<string,((resultStruct:SSC_Struct.ResultStruct)=>any)[]> = new Map();

    DispenserEvent(resultStruct:SSC_Struct.ResultStruct){
        for(const [key,listeners] of this.m_ListenerMap.entries()){
            if(resultStruct.Command == key){
                listeners.forEach(listener=>listener(resultStruct));
            }
        }
    }

    AddEventListener(eventType:string,listener:(resultStruct:SSC_Struct.ResultStruct)=>any,listenOnce:boolean=false){
        let handler = listener;
        if(listenOnce){
            handler=(result)=>{
                listener(result);
                let listeners = this.m_ListenerMap.get(eventType);
                this.m_ListenerMap.set(eventType,listeners?.filter((_listener)=>_listener!=handler)??[]);
            }
        }

        let listeners = this.m_ListenerMap.get(eventType);
        if(listeners!==undefined){
            listeners.push(handler);
        }else{
            this.m_ListenerMap.set(eventType,[handler]);
        }
    }
}
