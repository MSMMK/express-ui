import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../modules/auth/auth-service';
import { Router } from '@angular/router';
import { LocalStorage } from '../services/local-storage';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(MessageService);
  const router = inject(Router)
  const storage = inject(LocalStorage)

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unknown error occurred!';
      console.log(error.error);

      if (error instanceof HttpErrorResponse) {
        if (error.status === 401) {
          router.navigate(['/login']);
          storage.clear();
          return throwError(() => new Error('Unauthorized'));
        }

        toastr.add({
          severity: 'error',
          summary: 'Error',
          detail: error?.error?.message || errorMessage,
          life: 3000,
        });
      }
      return throwError(() => new Error(errorMessage));
    })
  );
};
