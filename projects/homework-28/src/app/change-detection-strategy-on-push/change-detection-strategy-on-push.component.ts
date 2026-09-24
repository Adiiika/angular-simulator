import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  inject,
} from '@angular/core';

@Component({
  selector: 'app-change-detection-strategy-on-push',
  imports: [],
  templateUrl: './change-detection-strategy-on-push.component.html',
  styleUrl: './change-detection-strategy-on-push.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeDetectionStrategyOnPushComponent implements DoCheck {
  
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  count: number = 0;

  ngDoCheck(): void {
    console.warn('Change Detection');
  }

  changeByMarkForCheck(): void {
    setTimeout(() => {
      this.count++;
      this.cdr.markForCheck();
    }, 500);
  }

  changeByDetectChanges(): void {
    setTimeout(() => {
      this.count++;
      this.cdr.detectChanges();
    }, 500);
  }

  changeByDetach(): void {
    this.cdr.detach();
  }

  async multipleEventChange(): Promise<void> {
    try {
      setTimeout(() => {
        this.count++;
        this.cdr.markForCheck();
      }, 1000);
    } catch {
      console.error('error');
    }
  }

  changeByReattach(): void {
    this.count++;
    this.cdr.reattach();
  }

}