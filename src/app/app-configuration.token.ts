import { InjectionToken } from '@angular/core';
import { IConfig } from './IConfig';

export const APP_CONFIGURATION: InjectionToken<IConfig> = new InjectionToken<IConfig>('App-config');