import { ResultStruct } from "../BasicStruct";

export type MessageResult =ResultStruct & {
    Data: { message: string};
}

export type LoginResult = ResultStruct & {
    Data:string|{User:string};
}