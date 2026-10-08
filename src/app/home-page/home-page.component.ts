import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../services/message.service';
import { MessageType } from '../../enums/MessageType';
import { IOffer } from '../../interfaces/IOffer';
import { IPath } from '../../interfaces/IPaths';
import { IBlog } from '../../interfaces/IBlog';
import { ISearchQuery } from '../../interfaces/ISearchQuery';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPeopleLine, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { TranslateService, TranslateDirective } from '@ngx-translate/core';
import { LanguageService } from '../services/language.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-home-page',
  imports: [FormsModule, FontAwesomeModule, TranslatePipe, TranslateDirective],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {

  messageService: MessageService = inject(MessageService);
  translateService: TranslateService = inject(TranslateService)
  languageService: LanguageService = inject(LanguageService);

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
      title: 'sectionOffer.offerCardTitle.experiencedGuide',
      description: 'sectionOffer.offerCardDescription',
    },
    {
      id: 2,
      icon: faSave,
      title: 'sectionOffer.offerCardTitle.safeTrip',
      description: 'sectionOffer.offerCardDescription',
    },
    {
      id: 3,
      icon: faYoutube,
      title: 'sectionOffer.offerCardTitle.fairPrices',
      description: 'sectionOffer.offerCardDescription',
    },
  ];

  // paths: IPath[] = [
  //   {
  //     id: 1,
  //     rating: '4.9',
  //     image: 'blue-lake',
  //     title: 'Озеро возле гор',
  //     subtitle: 'романтическое приключение',
  //     price: '480',
  //   },
  //   {
  //     id: 2,
  //     rating: '4.5',
  //     image: 'starry-sky',
  //     title: 'Ночь в горах',
  //     subtitle: 'в компании друзей',
  //     price: '500',
  //   },
  //   {
  //     id: 3,
  //     rating: '5.0',
  //     image: 'mountain-yoga',
  //     title: 'Растяжка в горах',
  //     subtitle: 'для тех, кто забоится о себе',
  //     price: '230',
  //   },
  // ];


  paths: IPath[] = [
    {
      id: 1,
      rating: 'sectionPath.pathRating.firstPhoto',
      image: 'blue-lake',
      title: 'sectionPath.pathsTitle.lake',
      subtitle: 'sectionPath.pathsSubtitile.romanticAdventure',
      price: 'sectionPath.pathPrice.firstPhoto',
    },
    {
      id: 2,
      rating: 'sectionPath.pathRating.secondPhoto',
      image: 'starry-sky',
      title: 'sectionPath.pathsTitle.night',
      subtitle: 'sectionPath.pathsSubtitile.groupOfFriends',
      price: 'sectionPath.pathPrice.secondPhoto',
    },
    {
      id: 3,
      rating: 'sectionPath.pathRating.thirdPhoto',
      image: 'mountain-yoga',
      title: 'sectionPath.pathsTitle.stretching',
      subtitle: 'sectionPath.pathsSubtitile.caresAboutSelf',
      price: 'sectionPath.pathPrice.thirdPhoto',
    },
  ];



  blogs: IBlog[] = [
    {
      id: 1,
      image: 'italy-city',
      title: 'sectionBlog.blogCardTitle.beautifulItaly',
      description:
        'sectionBlog.blogCardDescription.medium',
      date: 'sectionBlog.blogCardDate',
    },
    {
      id: 2,
      image: 'plane-view',
      title: 'sectionBlog.blogCardTitle.awayWithDoubts',
      description:
        'sectionBlog.blogCardDescription.long',
      date: 'sectionBlog.blogCardDate',
    },
    {
      id: 3,
      image: 'street',
      title: 'sectionBlog.blogCardTitle.prepareSoloTrip',
      description:         'sectionBlog.blogCardDescription.medium',
      date: 'sectionBlog.blogCardDate',
    },
    {
      id: 4,
      image: 'india-mosque',
      title: 'sectionBlog.blogCardTitle.flyIndia',
      description:         'sectionBlog.blogCardDescription.veryShort',
      date: 'sectionBlog.blogCardDate',
    },
  ];

  searchQuery: ISearchQuery = {
    townName: '',
    tourDate: '',
    humanCount: '',
  };

  selectOfferCard(offerId: number): void {
    this.selectedOfferId = offerId;
  }

}