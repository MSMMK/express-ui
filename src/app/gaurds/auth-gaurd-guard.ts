import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../modules/auth/auth-service';
import { inject } from '@angular/core';
import { LocalStorage } from '../services/local-storage';
import { constants } from 'node:fs/promises';

export const authGaurd: CanActivateFn = (route, state) => {
   const storage = inject(LocalStorage);
    const router = inject(Router);
    const STORAGE_KEY = 'user';
   if (storage.has(STORAGE_KEY)) {
     return true;
   } else {
     return router.createUrlTree(['login']);
   }
};
