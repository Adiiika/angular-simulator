import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  inject,
} from '@angular/core';

@Component({
  selector: 'app-change-detection-strategy-default',
  imports: [],
  templateUrl: './change-detection-strategy.default.component.html',
  styleUrl: './change-detection-strategy.default.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ChangeDetectionStrategyDefaultComponent implements DoCheck {

  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private http = inject(HttpClient);
  count: number = 0;

  ngDoCheck(): void {
    console.warn('Change Detection');
  }

  changeByClick(): void {
    this.count++;
  }

  changeBySetTimeout(): void {
    setTimeout(() => {
      this.count++;
    }, 500);
  }

  async changeByPromise(): Promise<void> {
    try {
      this.count++;
    } catch {
      console.error('error');
    }
  }

  changeByHttp(): void {
    this.http.get('https://jsonplaceholder.typicode.com/users');
    this.count++;
  }

  changeByInterval(): void {
    setInterval(() => {
      this.count++;
      this.cdr.markForCheck();
    }, 1000);
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

}
