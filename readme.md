# SimpleChatCommand_Client--簡易聊天指令客戶端
這是基於SimpleChatCommand_Server的客戶端，可協助建立與連線聊天伺服器的連線
# Api Docs
參考[文檔](https://sa3214105.github.io/SimpleChatCommand_Client/)
# 如何使用
登入帳號並發送訊息(Node.js環境)
```
let messageSender = new MessageSender_WebSocket("ws://127.0.0.1:8080/");
let ssc_c = new x.SimpleChatCommand_Client(messageSender);
ssc_c.Login("Test1","test1")
    .then(isSuccess=>{
        if(isSuccess){
            ssc_c.SendMessage("user1","testMethod");
        }
    })
```
監聽訊息(Node.js環境)
```
let messageSender = new MessageSender_WebSocket("ws://127.0.0.1:8080/");
let ssc_c = new x.SimpleChatCommand_Client(messageSender);
sscClient.On("message",console.log);
```