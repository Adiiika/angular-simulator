import { Component, inject } from '@angular/core';
import { APP_CONFIGURATION } from '../app-configuration.token';
import { IConfig } from '../IConfig';
import { LanguageService } from '../services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  imports: [TranslatePipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {

  languageService: LanguageService = inject(LanguageService);
  translateService: TranslateService = inject(TranslateService);

  config: IConfig = inject(APP_CONFIGURATION);
  companyName: string = this.config.companyName;
  
}