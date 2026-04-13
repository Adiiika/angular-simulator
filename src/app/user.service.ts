import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, tap, of, finalize } from 'rxjs';
import { UserApiService } from './user-api.service';
import { LoaderService } from './loader.service';
import { IUser } from '../interfaces/IUser';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private loaderService: LoaderService = inject(LoaderService);
  private usersApi: UserApiService = inject(UserApiService);
  private usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  users$: Observable<IUser[]> = this.usersSubject.asObservable();

  setUsers(user: IUser[]): void {
    this.usersSubject.next(user);
  }

  getUsers(user: IUser[]): void {
    this.usersSubject.getValue()
  }

  loadUsers(): Observable<IUser[]> {
    this.loaderService.showLoader()
    return this.usersApi.getUsers()
      .pipe(
        catchError((error) => {
          console.error('ошибка', error);
          return of([] as IUser[]);
        }),
        finalize(() => {
            this.loaderService.hideLoader();
        })
      )
  }

}