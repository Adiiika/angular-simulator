import { InjectionToken } from '@angular/core';
import { IConfig } from './IConfig';

export const app_configuration: InjectionToken<IConfig> = new InjectionToken<IConfig>('App-config');