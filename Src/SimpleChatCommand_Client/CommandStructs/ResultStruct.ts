import { CommandResultStruct } from "../BasicStruct";

export type SendMessageResult =CommandResultStruct & {
    Data: { message: string};
}

export type LoginResult = CommandResultStruct & {
    Data:string|{User:string};
}