import { Component, inject } from '@angular/core';
import { app_configuration } from '../app-configuration.token';
import { IConfig } from '../IConfig';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {

  config: IConfig = inject(app_configuration);
  companyName: string = this.config.companyName;
  
}