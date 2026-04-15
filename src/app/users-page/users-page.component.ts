import { Component, inject } from '@angular/core';
import { IUser } from '../../interfaces/IUser';
import { AsyncPipe } from '@angular/common';
import { Observable, pipe, tap } from 'rxjs';
import { UserService } from '../user.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-users-page',
  imports: [AsyncPipe],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent {

  userService: UserService = inject(UserService);
  messageService: MessageService = inject(MessageService);

  users$: Observable<IUser[]> = this.userService.users$;

  constructor() {
    this.userService.loadUsers().pipe(
      tap((data: IUser[]) => {
        this.userService.setUsers(data)
      })
    ).subscribe();
  }

}