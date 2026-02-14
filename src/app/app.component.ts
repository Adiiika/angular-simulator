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
    const primaryColors: Color[] = [Color.RED, Color.GREEN, Color.BLUE];

    if (primaryColors.includes(color) === true) {
      return true;
    } else {
      return false;
    }
  }

  lastVisit(): void {
    let lastLogin: string = new Date().toString();
    const visitsCount: string | null = localStorage.getItem('last-visit');

    if (lastLogin) {
      localStorage.setItem('last-visit', lastLogin);
      console.log('Последний вход', lastLogin);
    }
  }

  countLogin(): void {
    let visitsStored: number = Number(localStorage.getItem('visits') || '0');

    visitsStored += 1;
    localStorage.setItem('visits', visitsStored.toString());
    console.log('Количество заходов', visitsStored);
  }

}

