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

  public companyName: string = 'РУМТИБЕТ';

  public selectedOfferId: number | null = null;

  public date: string = '';

  public counter: number = 0;

  public isBoolean: boolean = true;
  
  public userText: string = '';

  public offers: IOffer[] = [
    {
      id: 1,
      icon: './offer-people.svg',
      title: 'Опытный гид',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.'
    },
    {
      id: 2,
      icon: './offer-safe.svg',
      title: 'Безопасный поход',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.'
    },
    {
      id: 3,
      icon: './offer-price.svg',
      title: 'Лояльные цены',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.'
    }
  ]

  public tourForm = new FormGroup({
    humanName: new FormControl('', Validators.required),
    placeName: new FormControl('', Validators.required),
    tourDate: new FormControl('', Validators.required)
  })

  constructor() {
    this.lastVisit();
    this.countLogin();
    this.runTime();
    this.loadModal();
  }

  private isPrimaryColor(color: Color): boolean {
    const primaryColors: Color[] = [Color.RED, Color.GREEN, Color.BLUE];

    return primaryColors.includes(color);
  }

  public selectOffer(offerId: number): void {
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

  public runTime(): void {
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

  public addOne(counter: number) {
    this.counter = counter + 1;
  }

  public subtractOne(counter: number) {
    if (counter >= 1) {
      this.counter = counter - 1;
    } else {}
  }

  public toggleVisibility() {
    this.isBoolean = !this.isBoolean;
  }

  public loadModal() {
    setTimeout(() => {  
      this.isBoolean = false;
    }, 2000);
  }

}