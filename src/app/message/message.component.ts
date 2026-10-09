import { Component, inject } from '@angular/core';
import { MessageType } from '../../enums/MessageType';
import { MessageService } from '../services/message.service';
import { CommonModule } from '@angular/common';
import { IConfig } from '../IConfig';
import { APP_CONFIGURATION } from '../app-configuration.token';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-message',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {

   config: IConfig = inject(APP_CONFIGURATION);
   translateService: TranslateService = inject(TranslateService);
    enableNotifications: boolean = this.config.enableNotifications;
  
  messageService: MessageService = inject(MessageService);
  msgType: typeof MessageType = MessageType;

}