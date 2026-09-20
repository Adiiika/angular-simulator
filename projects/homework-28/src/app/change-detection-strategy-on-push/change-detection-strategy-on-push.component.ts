import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, inject } from '@angular/core';

@Component({
  selector: 'app-change-detection-strategy-on-push',
  imports: [],
  templateUrl: './change-detection-strategy-on-push.component.html',
  styleUrl: './change-detection-strategy-on-push.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangeDetectionStrategyOnPushComponent {

  private http = inject(HttpClient);
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  count: number = 0;

//   ngDoCheck() {
//     console.warn('Change Detection');
// }

  async changeByMarkForCheck() {



        this.count++;
        this.cdr.reattach(); 
        // this.cdr.markForCheck()
    }
    
  }
  
  // changeValue() {
  //     setTimeout(() => {
  //     this.count = 2;
  //     this.cdr.detectChanges();
  //   }, 500);
  // }
    
  // async promiseValue() {
  //   try {
  //     this.count = 3 ;
  //   } finally {
  //     console.warn('ee2');
  //   }
  // }

  // getValue() {
  //   this.http.get('https://jsonplaceholder.typicode.com/users');
  //   this.count = 4;
  // }

  // setIntervalValue() {
  //   setInterval(() => {
  //     this.count = 5;
  //     this.cdr.detectChanges();
  //   }, 1000);
  // }

  //  async setValue() {
  //  try {
  //   setTimeout(() => {
  //     this.count = 6;
  //     this.cdr.detectChanges();
  //   }, 1500);
  //  } catch {
  //   console.warn('ew');
  //  }

  

// }}
