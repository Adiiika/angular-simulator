import Aura from '@primeuix/themes/aura';
import Lara from '@primeng/themes/lara';
import Nora from '@primeng/themes/nora';
import { Preset } from '@primeuix/themes/types';
import { definePreset } from '@primeuix/themes';

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
