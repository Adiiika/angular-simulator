import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, finalize } from 'rxjs';
import { UserApiService } from './user-api.service';
import { LoaderService } from './loader.service';
import { IUser } from '../interfaces/IUser';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private loaderService: LoaderService = inject(LoaderService);
  private userApi: UserApiService = inject(UserApiService);
  private messageService: MessageService = inject(MessageService);

  private usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  users$: Observable<IUser[]> = this.usersSubject.asObservable();

  setUsers(user: IUser[]): void {
    this.usersSubject.next(user);
  }

  getUsers(): IUser[] {
    return this.usersSubject.getValue();
  }

  loadUsers(): Observable<IUser[]> {
    this.loaderService.showLoader();
    return this.userApi.getUsers()
      .pipe(
        catchError(error => {
          this.messageService.showError('Нет пользователей');
          console.error('ошибка', error);
          return of([]);
        }),
        finalize(() => this.loaderService.hideLoader())
      )
  }

}