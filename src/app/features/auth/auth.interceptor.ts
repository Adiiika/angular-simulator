import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {

  const authService: AuthService = inject(AuthService);

  let clonedReq: HttpRequest<unknown> = req;
  const token: string | null = authService.getToken();

  clonedReq = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  });

  return next(clonedReq);
};