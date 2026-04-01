import { Component, inject } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CommonModule, NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { MessageComponent } from "./message/message.component";
import { LocalStorageService } from './services/local-storage.service.js';
import { MessageService } from './message.service';
import { Color } from '../enums/Color.js';
import { MessageType } from '../enums/MessageType';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule, RouterOutlet, FooterComponent, HeaderComponent, MessageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  messageService: MessageService = inject(MessageService);
  localStorageService: LocalStorageService = inject(LocalStorageService);

  loadPage: boolean = true;
  isClickerMode: boolean = true;

  constructor() {
    this.lastVisit();
    this.countLogin();

    setTimeout(() => {
      this.loadPage = false;
    }, 2000);
  }

  private isPrimaryColor(color: Color): boolean {
    const primaryColors: Color[] = [Color.RED, Color.GREEN, Color.BLUE];
    return primaryColors.includes(color);
  }

  private lastVisit(): void {
    let lastLogin: string = new Date().toString();
    const visitsCount: string | null = this.localStorageService.getItem<string>('last-visit');

    if (lastLogin) {
      this.localStorageService.setItem('last-visit', lastLogin)
    }
  }

  private countLogin(): void {
    let visitsStored: number = this.localStorageService.getItem<number>('visits') ?? 0;

    visitsStored += 1;
    this.localStorageService.setItem('visits', visitsStored)
  }

} 