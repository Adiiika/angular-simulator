import { Injectable } from '@angular/core';
import { IMessages } from '../../interfaces/IMessage';
import { MessageType } from '../../enums/MessageType';

@Injectable({
  providedIn: 'root',
})

export class MessageService {

  messages: IMessages[] = [];

  addMessage(type: MessageType, description: string): void {
    const newMessage: IMessages = { id: Date.now(), type, description };
    this.messages = [newMessage, ...this.messages];

    setTimeout(() => {
      this.closeMessage(newMessage.id);
    }, 5000)
  }

  closeMessage(id: number): void {
    this.messages = this.messages.filter((m: IMessages) => m.id != id);
  }

}