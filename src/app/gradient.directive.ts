import { Directive, HostBinding, HostListener, Input } from '@angular/core';
import { IBorderSetting } from '../interfaces/IBorder';

@Directive({
  selector: '[appGradient]',
})
export class GradientDirective {

  @Input('gradientConfiguration') animatedGradient: IBorderSetting = {
    delay: 1000,
    colors: ['#ee7752', '#23d5ab'],
    thickness: 2,
  };

  isActive!: boolean;

  @HostBinding('style.border-image')
  get elementBorder(): string | null {
    if (this.isActive) {
      return `linear-gradient(${this.animatedGradient.colors}) ${this.animatedGradient.thickness}`;
    } else {
      return null
    }
  }

  @HostListener('mouseenter')
  onEnter(): void {
    setTimeout(() => {
      this.isActive = true;
    }, this.animatedGradient.delay);
  }

  @HostListener('mouseleave')
  onLeave(): void {
    this.isActive = false;
    clearTimeout(this.animatedGradient.delay);
  }
  
}
