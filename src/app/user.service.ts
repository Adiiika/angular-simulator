import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, finalize } from 'rxjs';
import { UserApiService } from './user-api.service';
import { LoaderService } from './loader.service';
import { MessageService } from './message.service';
import { LocalStorageService } from './local-storage.service';
import { IUser } from '../interfaces/IUser';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private loaderService: LoaderService = inject(LoaderService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private userApi: UserApiService = inject(UserApiService);
  private messageService: MessageService = inject(MessageService);

  usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  users$: Observable<IUser[]> = this.usersSubject.asObservable();

  setUsers(user: IUser[]): void {
    this.usersSubject.next(user);
    this.localStorageService.setItem('users', user);
  }

  getUsers(): IUser[] {
    return this.usersSubject.getValue();
  }

  loadUsers(): Observable<IUser[]> {
    this.loaderService.showLoader();

    const savedUsers: unknown = this.localStorageService.getItem('users');

    if (savedUsers) {
      this.usersSubject.next(savedUsers as IUser[]);
    }

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