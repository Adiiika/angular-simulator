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
      description: description
    }
    this.messages.unshift(newMessage);

    setTimeout(() => {
      this.closeMessage(newMessage.id)
    }, 5000)
  }

  showSuccess(description: string): void {
    this.addMessage(MessageType.SUCCESS, description);
  }

  showWarn(description: string): void {
    this.addMessage(MessageType.WARN, description);
  }

  showInfo(description: string): void {
    this.addMessage(MessageType.INFO, description);
  }

  showError(description: string): void {
    this.addMessage(MessageType.ERROR, description);
  }

  closeMessage(id: number) {
    this.messages = this.messages.filter(m => m.id != id);
  }
}