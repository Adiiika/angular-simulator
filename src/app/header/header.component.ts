import { RouterLink, RouterLinkActive } from '@angular/router';
import { AsyncPipe, UpperCasePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { INav } from '../../interfaces/INav';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { faSun, faMoon, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { ThemeService } from '../services/theme.service';
import { AuthService } from '../features/auth/auth.service';
import { DatePipe } from '@angular/common';
import { APP_CONFIGURATION } from '../app-configuration.token';
import { IConfig } from '../IConfig';
import { TranslatePipe, TranslateDirective, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../services/language.service';

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
    DatePipe,
    TranslatePipe, 
    TranslateDirective,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {

  themeService: ThemeService = inject(ThemeService);
  authSevice: AuthService = inject(AuthService);
  translateService: TranslateService = inject(TranslateService);
  languageService: LanguageService = inject(LanguageService);

  config: IConfig = inject(APP_CONFIGURATION);
  myDate: Date = new Date();
  enableTheming = this.config.enableTheming;
  faSun: IconDefinition = faSun;
  faMoon: IconDefinition = faMoon;
  companyName: string  = this.config.companyName;
  date: string = '';
  counter: number = 0;
  isClickerMode: boolean = true;
  themes = this.themeService.themes;


  ngOnInit() {
       setInterval(() => {
      this.date = new Date().toString().slice(0, 24);
    }, 1000);
  }

  changeLang(lang: string) {
    this.languageService.changeLang(lang);
  }

  navigations: INav[] = [
    {
      id: 1,
      text: 'nav.post',
      link: '/posts',
    },
    {
      id: 2,
      text: 'nav.main',
      link: '/homePage',
    },
    {
      id: 3,
      text: 'nav.users',
      link: '/users',
    },
  ];

}