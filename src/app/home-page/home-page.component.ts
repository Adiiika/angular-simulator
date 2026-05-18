import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../message.service';
import { MessageType } from '../../enums/MessageType';
import { IOffer } from '../../interfaces/IOffer';
import { IPath } from '../../interfaces/IPaths';
import { IBlog } from '../../interfaces/IBlog';
import { ISearchQuery } from '../../interfaces/ISearchQuery';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPeopleLine, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-home-page',
  imports: [FormsModule, FontAwesomeModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {

  messageService: MessageService = inject(MessageService);

  faPeopleLine: IconDefinition = faPeopleLine;
  faSave: IconDefinition = faSave;
  faYoutube: IconDefinition = faYoutube;
  selectedOfferId: number | null = null;
  msgType: typeof MessageType = MessageType;
  liveInputValue: string = '';

  offers: IOffer[] = [
    {
      id: 1,
      icon: faPeopleLine,
      title: 'Опытный гид',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.'
    },
    {
      id: 2,
      icon: faSave,
      title: 'Безопасный поход',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.'
    },
    {
      id: 3,
      icon: faYoutube,
      title: 'Лояльные цены',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.'
    },
  ];

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
    },
  ];

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
      image: 'street',
      title: 'Как подготовиться к путешествию в одиночку?',
      description: 'Для современного мира базовый вектор развития предполагает.',
      date: '01/04/2023'
    },
    {
      id: 4,
      image: 'india',
      title: 'Индия ... летим?',
      description: 'Для современного мира базовый.',
      date: '01/04/2023'
    },
  ];

  searchQuery: ISearchQuery = {
    townName: '',
    tourDate: '',
    humanCount: '',
  };

  selectOfferCard(offerId: number): void {
    this.selectedOfferId = offerId;
  };

}