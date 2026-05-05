import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BehaviorSubject, map, Observable, tap, combineLatest } from 'rxjs';
import { IUser } from '../../interfaces/IUser';
import { UserService } from '../user.service';
import { UserCardComponent } from '../user-card/user-card.component';
import { UserCreateComponent } from "../user-create/user-create.component";
import { UserFilterComponent } from '../user-filter/user-filter.component';

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [AsyncPipe, RouterOutlet, UserCardComponent, UserCreateComponent, UserFilterComponent],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent {

  userService: UserService = inject(UserService);
  filterSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  users$: Observable<IUser[]> = this.userService.users$;
  filteredUsers$: Observable<IUser[]> = combineLatest([
    this.users$,
    this.filterSubject,
  ]).pipe(
    map(([users, filterItems]: [IUser[], string]) => {
      const userfilter: string = (filterItems || '').trim().toLowerCase();
      return users.filter((user: IUser) =>
        user.name.toLowerCase().includes(userfilter));
    }
    ));

  ngOnInit(): void {
    this.userService.loadUsers()
      .pipe(
        tap((data: IUser[]) => this.userService.setUsers(data))
      ).subscribe();
  }

  onFilter(value: string): void {
    this.filterSubject.next(value);
  }

}