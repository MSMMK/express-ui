import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../modules/auth/auth-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const userService = inject(AuthService);



  const excludedUrls = ['/login'];
  const isExcluded = excludedUrls.some(url => req.url.includes(url));

  // If the token exists, clone the request and add the Authorization header
  if (!isExcluded) {
     const token = userService.token
     const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(clonedReq);  // Forward the modified request
  }

  // If there's no token, just forward the original request
  return next(req);
};
