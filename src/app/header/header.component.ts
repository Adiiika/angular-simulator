import { RouterLink, RouterLinkActive } from '@angular/router';
import { AsyncPipe, UpperCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { INav } from '../../interfaces/INav';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { faSun, faMoon, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { ThemeService } from '../services/theme.service';
import { AuthService } from '../features/auth/auth.service';

@Component({
  selector: 'app-header',
  imports: [
    FormsModule,
    RouterLink,
    RouterLinkActive,
    SelectButtonModule,
    ToggleSwitchModule,
    FaIconComponent,
    UpperCasePipe,
    AsyncPipe,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  themeService: ThemeService = inject(ThemeService);
  authSevice: AuthService = inject(AuthService);

  faSun: IconDefinition = faSun;
  faMoon: IconDefinition = faMoon;
  companyName: string = 'румтибет';
  date: string = '';
  counter: number = 0;
  isClickerMode: boolean = true;

  constructor() {
    setInterval(() => {
      this.date = new Date().toString().slice(0, 24);
    }, 1000);
  }

  navigations: INav[] = [
    {
      id: 1,
      text: 'Посты',
      link: '/posts',
    },
    {
      id: 2,
      text: 'Главная',
      link: '/homePage',
    },
    {
      id: 3,
      text: 'Пользователи',
      link: '/users',
    },
  ];

}
