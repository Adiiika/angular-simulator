import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { INav } from '../../interfaces/INav';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { faSun, faMoon, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { auraPreset, laraPreset, noraPreset, ThemeService } from '../theme.service';
import { Preset } from '@primeuix/themes/types';

@Component({
  selector: 'app-header',
  imports: [FormsModule, RouterLink, RouterLinkActive, SelectButtonModule, ToggleSwitchModule, FaIconComponent],
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

  themes: { label: string, value: Preset }[] = [
    { label: 'Nora', value: noraPreset },
    { label: 'Aura', value: auraPreset },
    { label: 'Lara', value: laraPreset },
  ];

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