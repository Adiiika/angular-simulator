import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { INav } from '../../interfaces/INav';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { faSun, faMoon, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { ThemeService } from '../theme.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [FormsModule, RouterLink, RouterLinkActive, SelectButtonModule, ToggleSwitchModule, FaIconComponent, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})

export class HeaderComponent {

  themeService: ThemeService = inject(ThemeService);

  faSun: IconDefinition = faSun;
  faMoon: IconDefinition = faMoon;
  companyName: string = 'РУМТИБЕТ';
  date: string = '';
  counter: number = 0;
  isClickerMode: boolean = true;

  constructor() {
    setInterval(() => {
      this.date = new Date().toString().slice(0, 24);
    }, 1000)
  }

  navigations: INav[] = [
    {
      id: 1,
      text: 'Главная',
      link: '/',
    },
    {
      id: 2,
      text: 'Пользователи',
      link: '/users'
    }
  ]

}