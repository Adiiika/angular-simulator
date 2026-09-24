import { Component, signal } from '@angular/core';
import { ParentComponent } from './parent/parent.component';
import { ChangeDetectionStrategyDefaultComponent } from './change-detection-strategy.default/change-detection-strategy.default.component';
import { ChangeDetectionStrategyOnPushComponent } from './change-detection-strategy-on-push/change-detection-strategy-on-push.component';
@Component({
  selector: 'app-root',
  imports: [ParentComponent, ChangeDetectionStrategyDefaultComponent, ChangeDetectionStrategyOnPushComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {

  protected readonly title = signal('homework-28');

}
