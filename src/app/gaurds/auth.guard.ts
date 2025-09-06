import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../modules/auth/auth-service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);


  if(!authService.user){
    router.navigate(['/auth']);
    return false;
  }
  return true;

};
