import { Component } from '@angular/core';
import './training.ts';
import { Color } from '../enums/Color.js';
import './collection.js';
import { IOffer } from '../interfaces/IOffer.js';
import { FormsModule, NgModel, Validators, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  companyName: string = 'РУМТИБЕТ';
  selectedOfferId: number | null = null;
  date: string = '';
  counter: number = 0;
  isBoolean: boolean = true;
  isVisible: boolean = true;
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
      icon: 'safe-blue',
      title: 'Безопасный поход',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.'
    },
    {
      id: 3,
      icon: 'price-yellow',
      title: 'Лояльные цены',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.'
    }
  ]

  tourForm = new FormGroup({
    humanName: new FormControl('', Validators.required),
    placeName: new FormControl('', Validators.required),
    tourDate: new FormControl('', Validators.required)
  })

  searchQuery = {
    townName: '',
    tourDate: '',
    humanCount: ''
  }

  constructor() {
    this.lastVisit();
    this.countLogin();
    this.runTime();
    setTimeout(() => {
      this.isBoolean = false;
    }, 2000);
  }

  private isPrimaryColor(color: Color): boolean {
    const primaryColors: Color[] = [Color.RED, Color.GREEN, Color.BLUE];

    return primaryColors.includes(color);
  }

  onSubmit(form: any) {
    console.log(form.value);
  }

  selectOffer(offerId: number): void {
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

  private runTime(): void {
    const updateDate = (): void => {
      this.date = new Date().toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        second: '2-digit',
        minute: '2-digit',
        hour: '2-digit'
      })
    }
    updateDate();

    setInterval(updateDate, 1000);
  }

}