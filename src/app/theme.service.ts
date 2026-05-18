import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { definePreset } from '@primeuix/themes';
import { Preset } from '@primeuix/themes/types';
import { PrimeNG } from 'primeng/config';
import { SelectButtonChangeEvent } from 'primeng/selectbutton';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeng/themes/lara';
import Nora from '@primeng/themes/nora';

export const auraPreset: Preset = definePreset(Aura, {
  semantic: {
    colorScheme: {
      light: {
        primary: {
          color: '{sky.400}',
          hoverColor: '{sky.500}',
        }
      },
      dark: {
        primary: {
          color: '{sky.300}',
          hoverColor: '{sky.400}',
        }
      }
    }
  }
});

export const laraPreset: Preset = definePreset(Lara, {
  semantic: {
    colorScheme: {
      light: {
        primary: {
          color: '{sky.800}',
          hoverColor: '{sky.900}'
        }
      },
      dark: {
        primary: {
          color: '{sky.600}',
          hoverColor: '{sky.700}'
        }
      }
    }
  }
});

export const noraPreset: Preset = definePreset(Nora, {
  semantic: {
    colorScheme: {
      light: {
        primary: {
          color: '{sky.600}',
          hoverColor: '{sky.500}'
        }
      },
      dark: {
        primary: {
          color: '{sky.400}',
          hoverColor: '{sky.300}',
        }
      }
    }
  }
});

@Injectable({
  providedIn: 'root',
})

export class ThemeService {

  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private primeng: PrimeNG = inject(PrimeNG);

  private themeState: BehaviorSubject<string> = new BehaviorSubject<string>('aura');
  private modeState: BehaviorSubject<string> = new BehaviorSubject<string>('light-mode');

  isDarkMode: boolean = true;

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

  activeTheme(): void {
    const savedTheme: string | null = this.localStorageService.getItem('theme');
    const presets: Record<string, Preset> = {
      nora: noraPreset,
      lara: laraPreset,
      aura: auraPreset,
    };

    if (savedTheme) {
      const currentTheme: Preset = presets[savedTheme] || auraPreset;

      this.localStorageService.setItem('theme', savedTheme);
      this.primeng.theme.set({
        preset: currentTheme, options: { darkModeSelector: false }
      });
      this.themeState.next(savedTheme);
    }
  };

  changeTheme(event: SelectButtonChangeEvent): void {
    const selectedPreset: string | Preset = event.value;

    if (selectedPreset === noraPreset) {
      this.localStorageService.setItem('theme', 'nora');
      this.primeng.theme.set({
        preset: noraPreset, options: { darkModeSelector: false }
      });
    }
    else if (selectedPreset === laraPreset) {
      this.localStorageService.setItem('theme', 'lara');
      this.primeng.theme.set({
        preset: laraPreset, options: { darkModeSelector: false }
      });
    }
    else if (selectedPreset === auraPreset) {
      this.localStorageService.setItem('theme', 'aura');
      this.primeng.theme.set({
        preset: auraPreset, options: { darkModeSelector: false }
      });
    }
  };

  toggleDarkMode(): void {
    if (this.isDarkMode === true) {
      this.localStorageService.setItem('mode', 'dark-mode');
      document.body.classList.add('dark-mode');
    }
    else {
      this.localStorageService.setItem('mode', 'light-mode');
      document.body.classList.remove('dark-mode');
    }
  };

}