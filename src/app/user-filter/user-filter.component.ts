import { Component, DestroyRef, EventEmitter, inject, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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

  userNameControl: FormControl = new FormControl('');
  destroyRef: DestroyRef = inject(DestroyRef)

  ngOnInit(): void {
    this.userNameControl.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef),
        tap((value: string | '') => {
          value.toLowerCase().trim();
          this.searchUser.emit(value);
        }),
      ).subscribe();
    }

}