import { Injectable } from '@angular/core';
import { IMessages } from '../interfaces/IMessage';
import { MessageType } from '../enums/MessageType';
import { BehaviorSubject, filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class MessageService {

  messages: BehaviorSubject<IMessages[]> = new BehaviorSubject<IMessages[]>([]);
  messageList = this.messages.asObservable();

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
  
  closeMessage(id: number): void {
    const currentList: IMessages[] = this.messages.getValue();
    const filterList = currentList.filter(message => message.id != id);
    this.messages.next([...filterList]);
  }

  private addMessage(type: MessageType, description: string): void {
    const newMessage: IMessages = {
      id: Date.now(),
      type: type,
      description: description
    }

    const currentMessages = this.messages.getValue()
    this.messages.next([newMessage, ...currentMessages]);
  
    setTimeout(() => {
      this.closeMessage(newMessage.id);
    }, 5000);
  }

}