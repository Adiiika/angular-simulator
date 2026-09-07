import { Component, inject } from '@angular/core';
import { MessageType } from '../../enums/MessageType';
import { MessageService } from '../services/message.service';
import { CommonModule } from '@angular/common';
import { IConfig } from '../IConfig';
import { APP_CONFIGURATION } from '../app-configuration.token';

@Component({
  selector: 'app-message',
  imports: [CommonModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {

  config: IConfig = inject(APP_CONFIGURATION);
  enableNotifications: boolean = this.config.enableNotifications;
  
  messageService: MessageService = inject(MessageService);
  msgType: typeof MessageType = MessageType;

}