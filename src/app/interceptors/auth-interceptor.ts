import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  let token: string | null = null;

  // --- START DEBUGGING LOGS ---
  console.log(`[Interceptor] Running on platform: ${isPlatformBrowser(platformId) ? 'Browser' : 'Server'}`);
  // --- END DEBUGGING LOGS ---

  // Only access localStorage if the code is running in a browser
  if (isPlatformBrowser(platformId)) {
    token = localStorage.getItem('token');
    // --- START DEBUGGING LOGS ---
    console.log(`[Interceptor] In Browser. Token found: ${token ? 'Yes' : 'No'}`);
    // --- END DEBUGGING LOGS ---
  }

  const excludedUrls = ['/login'];
  const isExcluded = excludedUrls.some(url => req.url.includes(url));

  // If the token exists, clone the request and add the Authorization header
  if (token && !isExcluded) {
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
