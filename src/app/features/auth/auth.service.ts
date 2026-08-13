import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY, Observable, switchMap, tap } from 'rxjs';
import { LocalStorageService } from '../../services/local-storage.service';
import { IAuthResponse } from './IAuthResponse';
import { ILogin } from './ILogin';
import { IToken } from './IToken';
import { IAuthUser } from './IAuthUser';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private localStorageService: LocalStorageService = inject(LocalStorageService);
    private http: HttpClient = inject(HttpClient);
    private router: Router = inject(Router);

    private readonly API_URL: string = 'https://dummyjson.com/auth';

    currentUserSubject: BehaviorSubject<IAuthUser | null> = new BehaviorSubject<IAuthUser | null>(null);
    isAuthenticated$: Observable<IAuthUser | null> = this.currentUserSubject.asObservable();

    login(userData: ILogin): Observable<IAuthResponse> {
        return this.http.post<IAuthResponse>(`${ this.API_URL }/login`, userData)
            .pipe(
                tap((response: IAuthResponse) => {
                    const { accessToken, refreshToken, ...userInfo } = response;

                    this.setSession(response);
                    this.currentUserSubject.next(response);
                }),
                switchMap(() => this.getCurrentUser())
            )
    }

    refreshToken(): Observable<IToken> {
        const tokens: IToken | null = this.getTokens();

        return this.http.post<IAuthResponse>(`${ this.API_URL }/refresh`, {
            refreshToken: tokens?.refreshToken
        })
        .pipe(
            tap((response: IAuthResponse) => {
                this.setSession(response);
            })
        )  
    }

    getCurrentUser(): Observable<IAuthResponse> {
        return this.http.get<IAuthResponse>(`${ this.API_URL }/me`)
            .pipe(
                tap((result: IAuthResponse) => {
                    this.currentUserSubject.next(result);
                }),
                catchError(() => {
                    this.currentUserSubject.next(null);
                    return EMPTY;
                })
            )
    }

    logout(): void {
        this.localStorageService.removeItem('token');
        this.currentUserSubject.next(null);
        this.router.navigate(['/login']);
    }

    getToken(type: 'access' | 'refresh'): string | null {
        const tokens: IToken | null = this.getTokens();

        if (!tokens) return null;
        return type === 'access' ? tokens.accessToken : tokens.refreshToken;
    }

    setSession(response: IAuthResponse): void {
        const tokens: IToken = { accessToken: response.accessToken, refreshToken: response.refreshToken};
        this.localStorageService.setItem('token', tokens);
    }

    getTokens(): IToken | null {
        return this.localStorageService.getItem('token');
    }

    isAuthenticated(): boolean {
        return !!this.currentUserSubject.value;
    }
 
    getUser(): IAuthUser | null {
        return this.currentUserSubject.value;
    }
}