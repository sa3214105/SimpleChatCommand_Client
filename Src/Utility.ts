interface Newable{new ():Object}
export function InstanceOf_Soft(_class:Newable,_obj:Object){
   return IsEqual(Object.assign(new _class(),_obj),_obj);
}
export function IsEqual(obj1:Object,obj2:Object){
    return JSON.stringify(obj1)===JSON.stringify(obj2);
}