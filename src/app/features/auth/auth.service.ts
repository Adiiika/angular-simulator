import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY, Observable, tap,  } from 'rxjs';
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
                    const { accessToken, refreshToken, ...userInfo }: IAuthResponse = response;
                    this.setSession(response);
                    this.currentUserSubject.next(userInfo);
                })
            )
    }

    refreshToken(): Observable<IToken> {
        const tokens: IToken | null = this.getToken();

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
        this.localStorageService.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.router.navigate(['/login']);
    }

    getAccessToken(): string | null {
        const tokens: IToken | null = this.getToken();
        return tokens?.accessToken ?? null;
    }

    getRefreshToken(): string | null {
        const tokens: IToken | null = this.getToken();
        return tokens?.refreshToken ?? null;
    }

    setSession(response: IAuthResponse): void {
        const tokens: IToken = { accessToken: response.accessToken, refreshToken: response.refreshToken };
        this.localStorageService.setItem('currentUser', tokens);
    }

    getToken(): IToken | null {
        return this.localStorageService.getItem('currentUser');
    }

    isAuthenticated(): boolean {
        return !!this.currentUserSubject.value;
    }
}