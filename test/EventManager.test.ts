import * as SCC_C from "../Src/index"
test("AddEventListener",()=>{
    let eventListener = new SCC_C.EventManager();
    let counter = 0;
    eventListener.AddEventListener("test",()=>++counter);
    eventListener.DispenserEvent({
        Command: "test",
        State: "failed"
    });
    eventListener.DispenserEvent({
        Command: "test",
        State: "failed"
    });
    expect(counter).toBe(2);
})
test("AddEventListener_Once",()=>{
    let eventListener = new SCC_C.EventManager();
    let counter = 0;
    eventListener.AddEventListener("test",()=>++counter,true);
    eventListener.DispenserEvent({
        Command: "test",
        State: "failed"
    });
    eventListener.DispenserEvent({
        Command: "test",
        State: "failed"
    });
    expect(counter).toBe(1);
})
test("AddMessageListener",async ()=>{
    let eventListener = new SCC_C.EventManager();
    let messageTask = new Promise(res=>{
        eventListener.AddMessageListener(res);
        eventListener.DispenserMessage({
            Sender:"sender1",
            Receiver:"receiver1",
            Message:"msg"
        });
    });
    expect(await messageTask).toEqual({
        Sender:"sender1",
        Receiver:"receiver1",
        Message:"msg"
    });
})