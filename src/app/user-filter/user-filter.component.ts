import { Component, DestroyRef, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs';
import { UserService } from '../services/user.service';
import { AsyncPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { PluralPipe } from '../pipes/plural.pipe';

@Component({
  selector: 'app-user-filter',
  imports: [ReactiveFormsModule, AsyncPipe, CommonModule, PluralPipe],
  templateUrl: './user-filter.component.html',
  styleUrl: './user-filter.component.scss',
})
export class UserFilterComponent implements OnInit {

  @Output() filterUser: EventEmitter<string> = new EventEmitter<string>();

  destroyRef: DestroyRef = inject(DestroyRef);
  userService: UserService = inject(UserService);

  userNameControl: FormControl = new FormControl('');

  ngOnInit(): void {
    this.userNameControl.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef),
        tap((value: string) => {
          value.toLowerCase().trim();
          this.filterUser.emit(value);
        }),
      )
      .subscribe();
  }

}
