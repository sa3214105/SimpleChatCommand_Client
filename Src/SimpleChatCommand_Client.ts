
export * from "./SimpleChatCommand_Client/BasicStruct";
import * as SSC_Struct from "./SimpleChatCommand_Client/BasicStruct";
/**
 * @class
 * test
 */
export class SimpleChatCommand_Client{
    private m_timeOut=10;
    private m_MessageSender:SSC_Struct.IMessageSender;
    private m_EventManager:EventManager;
    public constructor(messageSender:SSC_Struct.IMessageSender){
        this.m_MessageSender = messageSender;
        this.m_EventManager = new EventManager();
        this.m_MessageSender.SetEventHandler((result)=>{
            try{
                this.m_EventManager.DispenserEvent(result)
            }catch(e){
                console.error(e);
                this.WriteErrorLog("internal error 0");
            }
        });
        this.m_MessageSender.SetMessageHandle(messagePackage=>{
            try{
                this.m_EventManager.DispenserMessage(messagePackage);
            }catch(e){
                console.error(e);
                this.WriteErrorLog("internal error 1");
            }
        })
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
        return await this.SendCommand(
            new SSC_Struct.BroadcastStruct(broadcast)
        );
    }
    protected async SendCommand(command:SSC_Struct.ICommandAble):Promise<boolean>{
        return new Promise((res,rej)=>{
            this.m_EventManager.AddEventListener(command.GetCommandObj().Command,(result)=>{
                res(result.State==="success");
            },true);
            this.m_MessageSender.SendMessage(
                command
            );
            setTimeout(rej.bind(this,new Error("Time out")),this.m_timeOut);
        });
    }
    public On(eventName:string,listener:(messagePackage:SSC_Struct.MessagePackageStruct)=>any){
        if(eventName === "message"){
            this.m_EventManager.AddMessageListener((messagePackage)=>{
                listener(messagePackage);
            })
        }
    }
    public SendCustomerCommand = this.SendCommand;
}
export class EventManager{
    private m_EventListenerMap:Map<string,((resultStruct:SSC_Struct.CommandResultStruct)=>any)[]> = new Map();
    private m_MessageListens:Array<(resultStruct:SSC_Struct.MessagePackageStruct)=>any>=[];
    DispenserEvent(resultStruct:SSC_Struct.CommandResultStruct){
        for(const [key,listeners] of this.m_EventListenerMap.entries()){
            if(resultStruct.Command == key){
                listeners.forEach(listener=>listener(resultStruct));
            }
        }
    }

    DispenserMessage(messagePackage:SSC_Struct.MessagePackageStruct){
        for(let listener of this.m_MessageListens){
            listener(messagePackage);
        }
    }

    AddEventListener(eventType:string,listener:(resultStruct:SSC_Struct.CommandResultStruct)=>any,listenOnce:boolean=false){
        let handler = listener;
        if(listenOnce){
            handler=(result)=>{
                listener(result);
                let listeners = this.m_EventListenerMap.get(eventType);
                this.m_EventListenerMap.set(eventType,listeners?.filter((_listener)=>_listener!=handler)??[]);
            }
        }

        let listeners = this.m_EventListenerMap.get(eventType);
        if(listeners!==undefined){
            listeners.push(handler);
        }else{
            this.m_EventListenerMap.set(eventType,[handler]);
        }
    }
    AddMessageListener(listener:(resultStruct:SSC_Struct.MessagePackageStruct)=>any){
        this.m_MessageListens.push(listener);
    }
}
