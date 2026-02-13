import { Component } from '@angular/core';
import './training.ts';
import { Color } from '../enums/Color.js';
import './collection.js'

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  private primaryColors = [Color.Red, Color.Green, Color.Blue];

  companyName: string = 'РУМТИБЕТ';

  constructor() {
    this.lastVisit();
    this.countLogin();

    this.primaryColors.includes(Color.Blue);
  }

  lastVisit() {
    let lastLogin: string = new Date().toString();
    localStorage.getItem('last-visit');

    if (lastLogin) {
      localStorage.setItem('last-visit', lastLogin);
      console.log('Последний вход', lastLogin);
    }
  }

  countLogin() {
    let visitsStored: number = Number(localStorage.getItem('visits') || '0');

    visitsStored += 1;
    localStorage.setItem('visits', visitsStored.toString());
    console.log('Количество заходов', visitsStored);
  }

}