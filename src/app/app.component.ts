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
  companyName: string = 'РУМТИБЕТ';

  constructor() {
    this.lastVisit();
    this.countLogin();
  }

  isPrimaryColor(color: Color): boolean {
    const primaryColor: Color[] = [Color.Red, Color.Green, Color.Blue];

    return primaryColor.includes(color);
  }

  lastVisit() {
    let lastLogin: string = new Date().toString();
    localStorage.getItem('lastVisit');

    if (lastLogin) {
      localStorage.setItem('lastVisit', lastLogin);
      console.log('Последний вход', lastLogin);
    }
  }

  countLogin() {
    let visitsStored: number = Number(localStorage.getItem('Visits') || '0');

    if (visitsStored) {
      visitsStored += 1;
      localStorage.setItem('Visits', visitsStored.toString());
      console.log('Количество заходов', visitsStored);
    }
  }
}
