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

  private themeState: BehaviorSubject<ITheme | null> = new BehaviorSubject<ITheme | null>(this.activeTheme());
  private modeState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isDarkMode$: Observable<boolean> = this.modeState.asObservable();

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

  constructor() {
    this.activeTheme();
    this.activeMode();
  }

  activeMode(): void {
    const savedMode: string | null = this.localStorageService.getItem('mode');

    if (savedMode) {
      const isDark: boolean = savedMode === 'dark-mode';
      this.modeState.next(isDark);
      this.localStorageService.setItem('mode', savedMode);
      document.body.classList.add(savedMode);
    }
  };

  activeTheme(): ITheme | null {
    return this.localStorageService.getItem('theme');
  };

  changeTheme(theme: Theme): void {
    const currentTheme: ITheme | undefined = this.themes.find(preset => preset.theme === theme);

    if (currentTheme) {
    usePreset(currentTheme.preset);
    this.localStorageService.setItem('theme', theme);
    }
  };

  toggleDarkMode(value: boolean): void {
    this.modeState.next(value);
    if (value) {
      this.localStorageService.setItem('mode', 'dark-mode');
      document.body.classList.add('dark-mode');
    }
    else {
      this.localStorageService.setItem('mode', 'light-mode');
      document.body.classList.remove('dark-mode');
    }
  };

}