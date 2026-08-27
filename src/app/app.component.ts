import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message/message.component';
import { LocalStorageService } from './services/local-storage.service';
import { MessageService } from './services/message.service';
import { Color } from '../enums/Color.js';
import { LoaderComponent } from './loader/loader.component';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule, RouterOutlet, MessageComponent, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  messageService: MessageService = inject(MessageService);
  localStorageService: LocalStorageService = inject(LocalStorageService);

  isClickerMode: boolean = true;

  constructor() {
    this.lastVisit();
    this.countLogin();
  }

  private isPrimaryColor(color: Color): boolean {
    const primaryColors: Color[] = [Color.RED, Color.GREEN, Color.BLUE];
    return primaryColors.includes(color);
  }

  private lastVisit(): void {
    const lastLogin: string = new Date().toString();

    if (lastLogin) {
      this.localStorageService.setItem('last-visit', lastLogin);
    }
  }

  private countLogin(): void {
    let visitsStored: number = this.localStorageService.getItem<number>('visits') ?? 0;

    visitsStored += 1;
    this.localStorageService.setItem('visits', visitsStored);
  }

}