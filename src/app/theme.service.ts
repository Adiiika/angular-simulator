import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { usePreset } from '@primeuix/themes';
import { laraPreset, noraPreset, auraPreset } from '../assets/themes-preset';
import { ITheme } from '../interfaces/ITheme';
import { Theme } from '../enums/Theme';

@Injectable({
  providedIn: 'root',
})

export class ThemeService {

  private localStorageService: LocalStorageService = inject(LocalStorageService);

  private themeState: BehaviorSubject<ITheme | null> = new BehaviorSubject<ITheme | null>(this.getSavedTheme());
  private isDarkModeSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.getSavedMode());
  isDarkMode$: Observable<boolean> = this.isDarkModeSubject.asObservable();

  themes: ITheme[] = [
    {
      theme: Theme.NORA,
      preset: noraPreset,
    },
    {
      theme: Theme.AURA,
      preset: auraPreset,
    },
    {
      theme: Theme.LARA,
      preset: laraPreset,
    },
  ];

  getSavedMode(): boolean {
    const savedMode: boolean | null = this.localStorageService.getItem('mode');
    const isDark: boolean = savedMode === true;

    if (isDark) {
      document.body.classList.add('dark-mode');
    }

    return isDark;
  };

  getSavedTheme(): ITheme | null {
    return this.localStorageService.getItem('theme');
  };

  changeTheme(theme: Theme): void {
    const currentTheme: ITheme | undefined = this.themes.find((preset: ITheme) => preset.theme === theme);

    if (currentTheme) {
      usePreset(currentTheme.preset);
      this.localStorageService.setItem('theme', theme);
    }
  };

  toggleDarkMode(value: boolean): void {
    this.isDarkModeSubject.next(value);
    this.localStorageService.setItem('mode', value);

    value ? document.body.classList.add('dark-mode') : document.body.classList.remove('dark-mode');
  };

}