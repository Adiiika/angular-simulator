import { Directive, HostBinding, HostListener, Input } from '@angular/core';
import { IGradientSettings } from '../../interfaces/IGradientSettings';

@Directive({
  selector: '[appGradient]',
})

export class GradientDirective {

  @Input() gradientConfiguration: IGradientSettings = {
    delay: 1000,
    colors: ['#ee7752', '#23d5ab'],
    thickness: 2,
  };

  isActive!: boolean;

  @HostBinding('style.border-image')
  get elementBorder(): string | null {
    if (this.isActive) {
      return `linear-gradient(${ this.gradientConfiguration.colors }) ${ this.gradientConfiguration.thickness }`;
    } else {
      return null;
    }
  }

  @HostListener('mouseenter')
  onEnter(): void {
    setTimeout(() => {
      this.isActive = true;
    }, this.gradientConfiguration.delay);
  }

  @HostListener('mouseleave')
  onLeave(): void {
    this.isActive = false;
    clearTimeout(this.gradientConfiguration.delay);
  }

}
