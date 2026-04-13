import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { FormsModule, NgModel } from '@angular/forms';
import { ISearchQuery } from '../../interfaces/ISearchQuery';
import { INav } from '../../interfaces/INav';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-header',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  constructor() {
    setInterval(() => {
      this.date = new Date().toString().slice(0, 24);
    }, 1000)
  }

  private loaderService = inject(LoaderService);
  companyName: string = 'РУМТИБЕТ';
  isClickerMode: boolean = true;
  date: string = '';
  counter: number = 0;

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

  onMain(link: string) {
   if (link === '/') {
    this.loaderService.showLoader();

     setTimeout(() => {
      this.loaderService.hideLoader();
    }, 2000)
  }
  }
  
}