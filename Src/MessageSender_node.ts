import * as BasicStruct from "./SimpleChatCommand_Client/BasicStruct";
import WebSocket from "ws";
export class MessageSender_WebSocket implements BasicStruct.IMessageSender{
    private m_WebSocket:WebSocket;
    private m_EventHandler:(result:BasicStruct.CommandResultStruct)=>any = console.log;
    private m_MessageHandler:(messagePackage:BasicStruct.MessagePackageStruct)=>any=console.log;
    private m_WaitConnect:Promise<void>;
    private SetConnect:Function|null = null;
    private SetDisconnect:Function|null = null;
    constructor(param:WebSocket|string){
        if(param instanceof WebSocket){
            this.m_WebSocket = param;
        }else{
            this.m_WebSocket = new WebSocket(param);
        }
        this.m_WaitConnect = new Promise((resolve,rejects)=>{
            this.SetConnect = resolve;
            this.SetDisconnect = rejects;
        })
        this.m_WebSocket.on("open",()=>{
            if(this.SetConnect!==null){
                this.SetConnect();
            }
        });
        this.m_WebSocket.on("close",()=>{
            if(this.SetDisconnect!==null){
                this.SetDisconnect();
            }
        })
        this.m_WebSocket.on("message",msg=>{
            let data = JSON.parse(msg.toString());
            if(BasicStruct.isCommandResultStruct(data)){
                this.m_EventHandler(data);
            }else if(BasicStruct.isMessagePackageStruct(data)){
                this.m_MessageHandler(data);
            }
        });
    }
    
    SetMessageHandle(handler: (messagePackage: BasicStruct.MessagePackageStruct) => any): void {
        this.m_MessageHandler = handler;
    }
    SetEventHandler(handler:(result:BasicStruct.CommandResultStruct)=>any): void {
        this.m_EventHandler = handler;
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