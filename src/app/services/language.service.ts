import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {

  translateService = inject(TranslateService);
  platfotmId = inject(PLATFORM_ID);
  localStorage = inject(LocalStorageService);

  defaultLang: string = 'en';

  constructor() {

    if (isPlatformBrowser(this.platfotmId)) {
      const savedLang: string | null = this.localStorage.getItem('language');
      if (savedLang) {
        this.defaultLang = savedLang;
      }
      this.translateService.use(this.defaultLang);
    }
  }

  changeLang(lang: string) {
    this.translateService.use(lang);
    if (isPlatformBrowser(this.platfotmId)) {
      this.localStorage.setItem('language', lang);
    }
  }

}
