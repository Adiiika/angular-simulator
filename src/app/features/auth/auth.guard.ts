import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  const isAuth: boolean = authService.isAuthenticated();

  return isAuth ? true :  router.createUrlTree(['/login']);
}