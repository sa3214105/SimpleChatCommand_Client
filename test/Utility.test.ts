import {InstanceOf_Soft} from "../Src/Utility";
class TestClass{
    public a : Number;
    public constructor(){
        this.a=10;
    }
}
test("InstanceOf_Soft",()=>{
    let object = new TestClass();
    let object1 = {a:10};
    let object2 = {b:10};
    expect(InstanceOf_Soft(TestClass,object)).toBe(true);
    expect(InstanceOf_Soft(TestClass,object1)).toBe(true);
    expect(InstanceOf_Soft(TestClass,object2)).toBe(false);
})