import { Component, inject } from '@angular/core';
import { APP_CONFIGURATION } from '../app-configuration.token';
import { IConfig } from '../IConfig';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {

  config: IConfig = inject(APP_CONFIGURATION);
  companyName: string = this.config.companyName;
  
}