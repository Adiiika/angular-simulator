import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, inject } from '@angular/core';

@Component({
  selector: 'app-change-detection-strategy-default',
  imports: [],
  templateUrl: './change-detection-strategy.default.component.html',
  styleUrl: './change-detection-strategy.default.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ChangeDetectionStrategyDefaultComponent implements DoCheck {

  private http = inject(HttpClient);
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  count: number = 0;

  ngDoCheck() {
    console.warn('Change Detection');
}

  changeByClick() {
    this.count++;
  }

  changeBySetTimeout() {
      setTimeout(() => {
      this.count++;
    }, 500);
  }
    
  async changeByPromise() {
    try {
      this.count++ ;
    } catch {
      console.error('error');
    }
  }

  changeByHttp() {
    this.http.get('https://jsonplaceholder.typicode.com/users');
    this.count++;
  }

  changeByInterval() {
    setInterval(() => {
      this.count++;
      this.cdr.markForCheck();
    }, 1000);
  }

   async multipleEventChange() {
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

// 1. Обновился ли интерфейс автоматически?
// Ответ: да, 6 раза

// 2. Сколько раз выполнился ngDoCheck()?
// также 6 раз когда обновлялся интерфейс

// 3.Понадобилось ли использовать ChangeDetectorRef?
// 3 раза

// 4. Что именно, по вашему мнению, стало причиной запуска Change Detection?
// События которые триггерят changeDetectionStrategy.default, которые я написал выше
