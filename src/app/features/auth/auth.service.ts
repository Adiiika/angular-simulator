import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { LocalStorageService } from '../../services/local-storage.service';
import { MessageService } from '../../services/message.service';
import { IUserData } from './IUserData';
import { ILogin } from './ILogin';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    localStorageService: LocalStorageService = inject(LocalStorageService);
    messageService: MessageService = inject(MessageService);
    http: HttpClient = inject(HttpClient);
    router: Router = inject(Router);

    private readonly api_url: string = 'https://dummyjson.com/auth';

    isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(!!this.localStorageService.getItem('access_token'));
    isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();
  
    login(userData: ILogin): Observable<IUserData> {
        return this.http.post<IUserData>(`${ this.api_url }/login`, userData)
            .pipe(
                tap((response: IUserData) => this.setSession(response))
            )
    }

     refreshToken(): Observable<{ accessToken: string; refreshToken: string; }> {

        const refreshToken: string | null = this.localStorageService.getItem('refresh_token');

        return this.http.post<{ accessToken: string, refreshToken: string}>(`${ this.api_url }/refresh`, {
            refreshToken,
            expiresInMins: 30,
        }).pipe(
            tap((response: { accessToken: string; refreshToken: string; }) => {

                this.localStorageService.setItem('access_token', response.accessToken);

                if (response.refreshToken) {
                    this.localStorageService.setItem('refresh_token', response.refreshToken);
                }
                this.isAuthenticatedSubject.next(true);
            }),
            catchError((error: HttpErrorResponse) => {
                this.logoutToken();
                return throwError(() => error);
            })
        )
    }

    logoutToken(): void {
        this.localStorageService.removeItem('token');
        this.isAuthenticatedSubject.next(false);
        this.router.navigate(['/login']);
    }

     setSession(authResult: IUserData): void {
        this.localStorageService.setItem('access_token', authResult.accessToken);
        this.localStorageService.setItem('refresh_token', authResult.refreshToken);
        this.isAuthenticatedSubject.next(true);
    }

    getToken(): string | null {
        return this.localStorageService.getItem('access_token');
    }

    isAuthenticated(): boolean {
        return this.isAuthenticatedSubject.value;
    }
}