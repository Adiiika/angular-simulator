import { inject, Injectable } from '@angular/core';
import { IMessages } from '../../interfaces/IMessage';
import { MessageType } from '../../enums/MessageType';
import { BehaviorSubject, Observable } from 'rxjs';
import { IConfig } from '../IConfig';
import { APP_CONFIGURATION } from '../app-configuration.token';

@Injectable({
  providedIn: 'root',
})
export class MessageService {

  private messagesSubject: BehaviorSubject<IMessages[]> = new BehaviorSubject<IMessages[]>([]);
  messageList$: Observable<IMessages[]> = this.messagesSubject.asObservable();

  config: IConfig = inject(APP_CONFIGURATION);
  enableNotifications: boolean = this.config.enableNotifications;

  showSuccess(): void {
    this.addMessage(MessageType.SUCCESS, 'messageSection.success');
  }

  showWarn(): void {
    this.addMessage(MessageType.WARN, 'messageSection.warn');
  }

  showInfo(): void {
    this.addMessage(MessageType.INFO, 'messageSection.info');
  }

  showError(): void {
    this.addMessage(MessageType.ERROR, 'messageSection.error');
  }

  getAuthErrorMessage(description: string) {
    this.addMessage(MessageType.ERROR, description);
  }

  getPostFailureMessage(description: string) {
    this.addMessage(MessageType.ERROR, description);
  }

  getPostUpdateFailureMessage(description: string) {
        this.addMessage(MessageType.ERROR, description);
  }

  getPostLoadFailureMessage(description: string) {
    this.addMessage(MessageType.ERROR, description);
  }

  getHttpFailureMessage(description: string) {
        this.addMessage(MessageType.ERROR, description);
  }

  closeMessage(id: number): void {
    const currentList: IMessages[] = this.messagesSubject.getValue();
    const filterList: IMessages[] = currentList.filter((message: IMessages) => message.id != id);
    this.messagesSubject.next([...filterList]);
  }

  private addMessage(type: MessageType, description: string): void {

    if (this.config.enableNotifications) {

      const newMessage: IMessages = {
        id: Date.now(),
        type: type,
        description: description,
      };

      const currentMessages: IMessages[] = this.messagesSubject.getValue();
      this.messagesSubject.next([newMessage, ...currentMessages]);

      setTimeout(() => {
        this.closeMessage(newMessage.id);
      }, 5000);
  }
    }

}