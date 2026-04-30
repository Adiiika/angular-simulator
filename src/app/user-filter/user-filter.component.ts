import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs';

@Component({
  selector: 'app-user-filter',
  imports: [ReactiveFormsModule],
  templateUrl: './user-filter.component.html',
  styleUrl: './user-filter.component.scss',
})
export class UserFilterComponent {

  @Output() searchUser: EventEmitter<string | null> = new EventEmitter<string | null>();

  userName: FormControl = new FormControl('');

  ngOnInit(): void {

    this.userName.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap((value: any) => {
          value.toLowerCase().trim();
          this.searchUser.emit(value);
        }),
      ).subscribe();

  }

}