import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import Nora from '@primeuix/themes/nora';
import Lara from '@primeuix/themes/lara';
import { Theme } from '../enums/Theme';
import { Preset } from '@primeuix/themes/types';

const initTheme = (): Preset => {
  const themeFromStorage: Theme | null = localStorage.getItem('theme') as Theme;
  const savedTheme: Theme = themeFromStorage ? JSON.parse(themeFromStorage) : Theme.AURA;

  switch (savedTheme) {
    case Theme.NORA: return Nora;
    case Theme.LARA: return Lara;
    default: return Aura;
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideZoneChangeDetection(),
    providePrimeNG({
      theme: {
        preset: initTheme(),
        options: {
          darkModeSelector: false,
        }
      }
    })
  ]
};