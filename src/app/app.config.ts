import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideAppInitializer,
  provideZoneChangeDetection,
  inject,
} from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import Nora from '@primeuix/themes/nora';
import Lara from '@primeuix/themes/lara';
import { Preset } from '@primeuix/themes/types';
import { Theme } from '../enums/Theme';
import { requestInterceptor } from './interceptors/request.interceptor';
import { errorHandlingInterceptor } from './interceptors/error-handling.interceptor';
import { authInterceptor } from './features/auth/auth.interceptor';
import { AuthService } from './features/auth/auth.service';
import { IConfig } from './IConfig';
import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { APP_CONFIGURATION } from './app-configuration.token';

const applicationConfig: IConfig = {
  companyName: 'румТибет',
  enableLogs: true,
  enableNotifications: true,
  enableTheming: true,
  sessionTimeout: 600,
};

const initTheme = (): Preset => {
  const themeFromStorage: Theme | null = localStorage.getItem('theme') as Theme;
  const savedTheme: Theme = themeFromStorage ? JSON.parse(themeFromStorage) : Theme.AURA;

  switch (savedTheme) {
    case Theme.NORA:
      return Nora;
    case Theme.LARA:
      return Lara;
    default:
      return Aura;
  }
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([requestInterceptor, errorHandlingInterceptor, authInterceptor]),
    ),
    provideBrowserGlobalErrorListeners(),
    {
      provide: DATE_PIPE_DEFAULT_OPTIONS,
      useValue: {
        dateFormat: 'dd.MM.yyyy HH:mm',
      }
    },
    {
      provide: APP_CONFIGURATION,
      useValue: applicationConfig,
    },
    provideRouter(routes),
    provideAnimationsAsync(),
    provideZoneChangeDetection(),
    providePrimeNG({
      theme: {
        preset: initTheme(),
        options: {
          darkModeSelector: false,
        },
      },
    }),
    provideAppInitializer(() => {
      const authService: AuthService = inject(AuthService);
      return authService.getCurrentUser();
    }),
  ],
};