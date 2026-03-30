import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { ISearchQuery } from '../../interfaces/ISearchQuery';
import { INav } from '../../interfaces/INav';
import { RouterLink, RouterLinkActive } from "@angular/router";

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

  companyName: string = 'РУМТИБЕТ';
  isClickerMode: boolean = true;
  date: string = '';
  counter: number = 0;
  userText: string = '';

  searchQuery: ISearchQuery = {
    townName: '',
    tourDate: '',
    humanCount: '',
  }

  navigations: INav[] = [
    {
      id: 1,
      text: 'Главная',
      link: '/'
    },
    {
      id: 2,
      text: 'Пользователи',
      link: '/users'
    }
  ]

  handleFormSubmit(form: any) {
    console.log(form.value);
  }

}