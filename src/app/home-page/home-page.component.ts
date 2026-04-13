import { Component, inject } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { MessageService } from '../message.service';
import { IOffer } from '../../interfaces/IOffer';
import { MessageType } from '../../enums/MessageType';
import { IPath } from '../../interfaces/IPaths';
import { IBlog } from '../../interfaces/IBlog';
import { ISearchQuery } from '../../interfaces/ISearchQuery';

@Component({
  selector: 'app-home-page',
  imports: [FormsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {

  messageService: MessageService = inject(MessageService);
  selectedOfferId: number | null = null;
  msgType: typeof MessageType = MessageType;
  userText: string = '';

  offers: IOffer[] = [
    {
      id: 1,
      icon: 'people-green-icon',
      title: 'Опытный гид',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.'
    },
    {
      id: 2,
      icon: 'safe-blue-icon',
      title: 'Безопасный поход',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.'
    },
    {
      id: 3,
      icon: 'price-yellow-icon',
      title: 'Лояльные цены',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.'
    }
  ]

  paths: IPath[] = [
    {
      id: 1,
      rating: '4.9',
      image: 'blue-lake',
      title: 'Озеро возле гор',
      subtitle: 'романтическое приключение',
      price: '480'
    },
    {
      id: 2,
      rating: '4.5',
      image: 'starry-sky',
      title: 'Ночь в горах',
      subtitle: 'в компании друзей',
      price: '500'
    },
    {
      id: 3,
      rating: '5.0',
      image: 'mountain-yoga',
      title: 'Растяжка в горах',
      subtitle: 'для тех, кто забоится о себе',
      price: '230'
    }
  ]

  blogs: IBlog[] = [
    {
      id: 1,
      image: 'italy-city',
      title: 'Красивая Италия, какая она в реальности?',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      date: '01/04/2023'
    },
    {
      id: 2,
      image: 'plane-view',
      title: 'Долой сомнения! Весь мир открыт для вас!',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации ... независимые способы реализации соответствующих...',
      date: '01/04/2023'
    },
    {
      id: 3,
      image: 'person-between-buildings',
      title: 'Как подготовиться к путешествию в одиночку?',
      description: 'Для современного мира базовый вектор развития предполагает.',
      date: '01/04/2023'
    },
    {
      id: 4,
      image: 'india-mosque',
      title: 'Индия ... летим?',
      description: 'Для современного мира базовый.',
      date: '01/04/2023'
    }
  ]

   searchQuery: ISearchQuery = {
      townName: '',
      tourDate: '',
      humanCount: '',
    }

  selectOfferCard(offerId: number): void {
    this.selectedOfferId = offerId;
  }

  handleFormSubmit(form: any) {
    console.log(form.value);
  }
  
}