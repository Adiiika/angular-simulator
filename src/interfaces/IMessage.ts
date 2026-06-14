import { MessageType } from "../enums/MessageType";

export interface IMessages {
    id: number;
    type: MessageType;
    description: string;
}