import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { usePreset } from '@primeuix/themes';
import { Preset } from '@primeuix/themes/types';
import { laraPreset, noraPreset, auraPreset } from '../assets/themes-preset';
import { ITheme } from '../interfaces/IThemes';
import { Theme } from '../enums/Theme';

@Injectable({
  providedIn: 'root',
})

export class ThemeService {
  
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  private themeState: BehaviorSubject<ITheme | null> = new BehaviorSubject<ITheme | null>(this.activeTheme());
  private modeState: BehaviorSubject<string> = new BehaviorSubject<string>('light-mode');

  isDarkMode: boolean = true;

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
      this.isDarkMode = (savedMode === 'dark-mode');

      this.localStorageService.setItem('mode', savedMode);
      document.body.classList.add(savedMode);
      this.modeState.next(savedMode);
    }
  };

  activeTheme(): ITheme | null {
    return this.localStorageService.getItem('theme');
  };

  changeTheme(theme: Theme): void {
    const themes: { Aura: Preset, Lara: Preset, Nora: Preset } = {
      [Theme.AURA]: auraPreset,
      [Theme.LARA]: laraPreset,
      [Theme.NORA]: noraPreset,
    };

    const preset: Preset = themes[theme];
    usePreset(preset);
    this.localStorageService.setItem('theme', theme);
  };

  toggleDarkMode(value: boolean): void {
    if (this.isDarkMode === value) {
      this.localStorageService.setItem('mode', 'dark-mode');
      document.body.classList.add('dark-mode');
    }
    else {
      this.localStorageService.setItem('mode', 'light-mode');
      document.body.classList.remove('dark-mode');
    }
  };

}