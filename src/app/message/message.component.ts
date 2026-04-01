import { Component, inject } from '@angular/core';
import { MessageType } from '../../enums/MessageType';
import { MessageService } from '../message.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message',
  imports: [CommonModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})

export class MessageComponent {

  messageService: MessageService = inject(MessageService);
  msgType: typeof MessageType = MessageType;

}
