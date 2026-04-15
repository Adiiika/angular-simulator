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
  private usersApi: UserApiService = inject(UserApiService);
  private messagesService: MessageService = inject(MessageService);

  private usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  users$: Observable<IUser[]> = this.usersSubject.asObservable();

  setUsers(user: IUser[]): void {
    this.usersSubject.next(user);
  }

  getUsers(user: IUser[]): void {
    this.usersSubject.getValue();
  }

  loadUsers(): Observable<IUser[]> {
    this.loaderService.showLoader();
    return this.usersApi.getUsers()
      .pipe(
        catchError((error): Observable<IUser[]> => {
          this.messagesService.showError('Нет пользователей');
          console.error('ошибка', error);
          return of([]);
        }),
        finalize(() => { this.loaderService.hideLoader })
      )
  }

}