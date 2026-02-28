import { Component } from '@angular/core';
import './training.ts';
import { Color } from '../enums/Color.js';
import './collection.js';
import { IOffer } from '../interfaces/IOffer.js';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

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

  searchQuery = {
    townName: '',
    tourDate: '',
    humanCount: ''
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
    const visitsCount: string | null = localStorage.getItem('last-visit');

    if (lastLogin) {
      localStorage.setItem('last-visit', lastLogin);
      console.log('Последний вход', lastLogin);
    }
  }

  private countLogin(): void {
    let visitsStored: number = Number(localStorage.getItem('visits') || '0');

    visitsStored += 1;
    localStorage.setItem('visits', visitsStored.toString());
    console.log('Количество заходов', visitsStored);
  }

} 