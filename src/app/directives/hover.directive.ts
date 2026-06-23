import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appHover]',
})
export class HoverDirective {

  @HostBinding('style.font-weight') fontWeight: string = 'normal';

  @HostListener('mouseenter')
  mouseEnter(): void {
    this.fontWeight = 'bold';
  }

  @HostListener('mouseleave')
  mouseLeave(): void {
    this.fontWeight = 'normal';
  }
}