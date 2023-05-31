import * as BasicStruct from "./SimpleChatCommand_Client/BasicStruct";
//For Web Browser
export class MessageSender_WebSocket implements BasicStruct.IMessageSender{
    private m_WebSocket:WebSocket
    private m_MessageHandler:(result:BasicStruct.ResultStruct)=>any = console.log;
    private m_WaitConnect:Promise<void>;
    private SetConnect:Function|null = null;
    private SetDisconnect:Function|null = null;
    constructor(arg:string|WebSocket){
        if(arg instanceof WebSocket){
            this.m_WebSocket = arg;
        }else{
            this.m_WebSocket = new WebSocket(arg);
        }
        this.m_WaitConnect = new Promise((resolve,rejects)=>{
            this.SetConnect = resolve;
            this.SetDisconnect = rejects;
        })
        this.m_WebSocket.onopen = ()=>{
            if(this.SetConnect!==null){
                this.SetConnect();
            }
        };
        this.m_WebSocket.onclose = ()=>{
            if(this.SetDisconnect!==null){
                this.SetDisconnect();
            }
        };
        this.m_WebSocket.onmessage = (event:MessageEvent)=>{
            if(event.data as BasicStruct.ResultStruct){
                this.m_MessageHandler(event.data);
            }
        };
    }
    SetMessageHandler(result:(result:BasicStruct.ResultStruct)=>any): void {
        this.m_MessageHandler = result;
    }
    SendMessage(command: BasicStruct.ICommandAble):Promise<void>{
        return new Promise((resolve,rejects)=>{
            this.m_WaitConnect.then(()=>{
                this.m_WebSocket.send(JSON.stringify(command.GetCommandObj()));
                resolve();
            }).catch((e)=>{
                rejects(e);
            })
        })
    }
}