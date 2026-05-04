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

  deleteUsers(id: number): void {
    const currentUsers: IUser[] = this.usersSubject.value;
    const updatedUsers: IUser[] = currentUsers.filter((user: IUser) => user.id !== id);
    this.usersSubject.next(updatedUsers);
  }

  addUsers(newUser: IUser): void {
    const currentUsers: IUser[] = this.usersSubject.value;
    this.usersSubject.next([newUser, ...currentUsers]);

    const updatedUsers: IUser[] = [...currentUsers, newUser];
    this.setUsers(updatedUsers);
  }

  setUsers(user: IUser[]): void {
    this.usersSubject.next(user);
    this.localStorageService.setItem('users', user);
  }

  getUsers(): IUser[] {
    return this.usersSubject.getValue();
  }

  loadUsers(): Observable<IUser[]> {
    this.loaderService.showLoader();

    const savedUsers: null | IUser[] = this.localStorageService.getItem('users');
    this.usersSubject.next(savedUsers as IUser[]);
  
    return this.userApi.getUsers()
      .pipe(
        catchError((error): Observable<IUser[]> => {
          this.messageService.showError('Нет пользователей');
          console.error('ошибка', error);
          return of([]);
        }),
        finalize(() => this.loaderService.hideLoader())
      )
  }

}