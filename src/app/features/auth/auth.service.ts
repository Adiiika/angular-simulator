import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY, Observable, tap, throwError } from 'rxjs';
import { LocalStorageService } from '../../services/local-storage.service';
import { MessageService } from '../../services/message.service';
import { IAuthUser } from './IAuthUser';
import { ILogin } from './ILogin';
import { IToken } from './IToken';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private localStorageService: LocalStorageService = inject(LocalStorageService);
    private messageService: MessageService = inject(MessageService);
    private http: HttpClient = inject(HttpClient);
    private router: Router = inject(Router);

    private readonly API_URL: string = 'https://dummyjson.com/auth';

    currentUserSubject: BehaviorSubject<IAuthUser | null> = new BehaviorSubject<IAuthUser | null>(this.localStorageService.getItem('currentUser'));
    isAuthenticated$: Observable<IAuthUser | null> = this.currentUserSubject.asObservable();

    login(userData: ILogin): Observable<IAuthUser> {
        return this.http.post<IAuthUser>(`${ this.API_URL }/login`, userData)
            .pipe(
                tap((response: IAuthUser) => {
                    this.setSession(response);
                })
            )
    }

    refreshToken(): Observable<IToken> {
        const currentUser: IAuthUser | null = this.localStorageService.getItem('currentUser');
        const refreshToken: string | undefined = currentUser?.refreshToken;

        return this.http.post<IToken>(`${ this.API_URL }/refresh`, {
            refreshToken,
            expiresInMins: 30,
        }).pipe(
            tap((response: IToken) => {
                if (currentUser) {
                    const updatedUser: IAuthUser = {
                        ...currentUser,
                        accessToken: response.accessToken,
                        refreshToken: response.refreshToken || currentUser?.refreshToken || ''
                    }
                    this.localStorageService.setItem('currentUser', updatedUser);
                    this.currentUserSubject.next(updatedUser);
                }

            }),
            catchError((error: HttpErrorResponse) => {
                this.logoutToken();
                return throwError(() => error);
            })
        )
    }

    getCurrentUser(): Observable<IAuthUser> {
        return this.http.get<IAuthUser>(`${ this.API_URL }/me`)
            .pipe(
                tap((result: IAuthUser) => {
                    this.currentUserSubject.next(result);
                }),
                catchError(() => {
                    this.currentUserSubject.next(null);
                    return EMPTY;
                })
            )
    }

    logoutToken(): void {
        this.localStorageService.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.router.navigate(['/login']);
    }

    setSession(authResult: IAuthUser): void {
        this.localStorageService.setItem('currentUser', authResult);
        this.currentUserSubject.next(authResult);
    }

    getToken(): string | null {
        const currentUser: IAuthUser | null = this.localStorageService.getItem('currentUser');
        return currentUser?.accessToken || null;
    }

    isAuthenticated(): boolean {
        return !!this.currentUserSubject.value;
    }
}