import { Component, inject } from '@angular/core';
import './training.ts';
import { Color } from '../enums/Color.js';
import './collection.js';
import { IOffer } from '../interfaces/IOffer.js';
import { IPath } from '../interfaces/IPaths.js';
import { FormsModule, NgModel } from '@angular/forms';
import { IBlog } from '../interfaces/IBlog.js';
import { IMessages } from '../interfaces/IMessage.js';
import { MessageType } from '../enums/MessageType.js';
import { MessageService } from './message.service.js';
import { CommonModule, NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import { LocalStorageService } from './local-storage.service.js';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule, NgTemplateOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  messageService: MessageService = inject(MessageService);
  localStorageService: LocalStorageService = inject(LocalStorageService);

  companyName: string = 'РУМТИБЕТ';

  selectedOfferId: number | null = null;

  date: string = '';

  counter: number = 0;

  loadPage: boolean = true;

  isClickerMode: boolean = true;

  userText: string = '';

  offers: IOffer[] = [
    {
      id: 1,
      icon: 'people-green-icon',
      title: 'Опытный гид',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.'
    },
    {
      id: 2,
      icon: 'safe-blue-icon',
      title: 'Безопасный поход',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.'
    },
    {
      id: 3,
      icon: 'price-yellow-icon',
      title: 'Лояльные цены',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.'
    }
  ]

  paths: IPath[] = [
    {
      id: 1,
      rating: '4.9',
      image: 'blue-lake',
      title: 'Озеро возле гор',
      subtitle: 'романтическое приключение',
      price: '480 $'
    },
    {
      id: 2,
      rating: '4.5',
      image: 'mountain-yoga',
      title: 'Ночь в горах',
      subtitle: 'в компании друзей',
      price: '500 $'
    },
    {
      id: 3,
      rating: '5.0',
      image: 'purple-sky',
      title: 'Растяжка в горах',
      subtitle: 'для тех, кто забоится о себе',
      price: '230 $'
    }
  ]

  blogs: IBlog[] = [
    {
      id: 1,
      image: 'italia',
      title: 'Красивая Италия, какая она в реальности?',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      date: '01/04/2023'
    },
    {
      id: 2,
      image: 'clouds',
      title: 'Долой сомнения! Весь мир открыт для вас!',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации ... независимые способы реализации соответствующих...',
      date: '01/04/2023'
    },
    {
      id: 3,
      image: 'street',
      title: 'Как подготовиться к путешествию в одиночку?',
      description: 'Для современного мира базовый вектор развития предполагает.',
      date: '01/04/2023'
    },
    {
      id: 4,
      image: 'india',
      title: 'Индия ... летим?',
      description: 'Для современного мира базовый.',
      date: '01/04/2023'
    }
  ]

  searchQuery = {
    townName: '',
    tourDate: '',
    humanCount: '',
  }

  constructor() {
    this.lastVisit();
    this.countLogin();

    setTimeout(() => {
      this.loadPage = false;
    }, 2000);

    setInterval(() => {
      this.date = new Date().toString().slice(0, 24);
    }, 1000)
  }

  private isPrimaryColor(color: Color): boolean {
    const primaryColors: Color[] = [Color.RED, Color.GREEN, Color.BLUE];

    return primaryColors.includes(color);
  }

  handleFormSubmit(form: any) {
    console.log(form.value);
  }

  selectOfferCard(offerId: number): void {
    this.selectedOfferId = offerId;
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