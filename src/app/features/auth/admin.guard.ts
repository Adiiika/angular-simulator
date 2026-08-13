import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { UserRole } from './UserRole';
import { IAuthUser } from './IAuthUser';

export const adminGuard: CanActivateFn = () => {

  const authService: AuthService = inject(AuthService);
  const currentUser: IAuthUser | null = authService.getUser();
  const router: Router = inject(Router);

  return currentUser?.role === UserRole.ADMIN ? true : router.navigate(['/']);
}