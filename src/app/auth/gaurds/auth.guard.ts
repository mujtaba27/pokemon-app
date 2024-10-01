import { CanActivateFn, ResolveFn, Router } from '@angular/router';
import { AuthService, User } from '../services/auth.service';
import { map } from 'rxjs/operators';
import { inject } from '@angular/core';
import { Observable, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.getUser()?.isSubscribed) {
    return true;
  }
  router.navigate(['/info']);
  return false;
};

export const infoResolver: ResolveFn<Observable<boolean>> = (route) => {
  const authService = inject(AuthService);
  if (authService.getUser()?.isSubscribed) {
    return of(false);
  } else if (authService.getUser()) {
    return of(true);
  }
  return of(false);
};
