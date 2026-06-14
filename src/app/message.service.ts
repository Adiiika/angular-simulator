import { Injectable } from '@angular/core';
import { IMessages } from '../interfaces/IMessage';
import { MessageType } from '../enums/MessageType';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class MessageService {

  private messagesSubject: BehaviorSubject<IMessages[]> = new BehaviorSubject<IMessages[]>([]);
  messageList$: Observable<IMessages[]> = this.messagesSubject.asObservable();

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
    const currentList: IMessages[] = this.messagesSubject.getValue();
    const filterList: IMessages[] = currentList.filter((message: IMessages) => message.id != id);
    this.messagesSubject.next([...filterList]);
  }

  private addMessage(type: MessageType, description: string): void {
    const newMessage: IMessages = {
      id: Date.now(),
      type: type,
      description: description
    }

    const currentMessages: IMessages[] = this.messagesSubject.getValue();
    this.messagesSubject.next([newMessage, ...currentMessages]);
  
    setTimeout(() => {
      this.closeMessage(newMessage.id);
    }, 5000);
  }

}