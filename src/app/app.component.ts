import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message/message.component';
import { LocalStorageService } from './services/local-storage.service';
import { MessageService } from './services/message.service';
import { Color } from '../enums/Color.js';
import { LoaderComponent } from './loader/loader.component';
import { TranslateService } from '@ngx-translate/core';
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule, RouterOutlet, MessageComponent, LoaderComponent, TranslatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  messageService: MessageService = inject(MessageService);
  localStorageService: LocalStorageService = inject(LocalStorageService);
  translate: TranslateService = inject(TranslateService);

  isClickerMode: boolean = true;

  constructor() {
    this.lastVisit();
    this.countLogin();

    this.translate.addLangs(['ru', 'en']);
const browserLang = navigator.languages
    ? navigator.languages[0].split('-')[0]
    : navigator.language.split('-')[0];

  const defaultLang = this.translate.getLangs().includes(browserLang) ? browserLang : 'en';

    this.translate.setFallbackLang(defaultLang);
    
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