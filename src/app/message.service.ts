import { Injectable } from '@angular/core';
import { IMessages } from '../interfaces/IMessage';
import { MessageType } from '../enums/MessageType';

@Injectable({
  providedIn: 'root',
})
export class MessageService {

  messages: IMessages[] = [];

  private addMessage(type: MessageType, description: string): void {
    const newMessage: IMessages = {
      id: Date.now(),
      type: type,
      description: description,
    }
    this.messages.unshift(newMessage);

    setTimeout(() => {
      this.closeMessage(newMessage.id)
    }, 5000)
  }

  addSuccess(): void {
    this.addMessage(MessageType.SUCCESS, 'Направления получены');
  }

  addWarning(): void {
    this.addMessage(MessageType.WARN, 'Программа недоступна');
  }

  addInfo(): void {
    this.addMessage(MessageType.INFO, 'Стоимость отправлена на почту');
  }

  addError(): void {
    this.addMessage(MessageType.ERROR, 'Материалы недоступны');
  }

  closeMessage(id: number) {
    this.messages = this.messages.filter(m => m.id != id);
  }
}