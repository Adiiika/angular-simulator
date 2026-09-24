import { Component } from '@angular/core';
import { ChildComponent } from '../child/child.component';
import { IUser } from '../IUser';

@Component({
  selector: 'app-parent',
  imports: [ChildComponent],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.scss',
})
export class ParentComponent {

  user: IUser = {
    name: 'Bagir',
    age: 13,
  };

  changeName(): void {
    this.user = {
      ...this.user,
      name: 'Eugene',
      age: 24,
    };
  }

}
