import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, NgZone } from "@angular/core";
import { MessageService } from "primeng/api";
import { Observable, catchError, throwError } from "rxjs";
import { LocalStorage } from "./local-storage";
import { Router } from "@angular/router";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private messageService: MessageService,
    private storage: LocalStorage,
    private ngZone: NgZone
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (typeof window !== 'undefined' && error.error instanceof ErrorEvent) {
          // Client-side / network error (only in the browser environment)
          errorMessage = `Client Error: ${error.error.message}`;
          this.displayError(errorMessage);
        } else {
          // Backend error
          switch (error.status) {
            case 0:
              errorMessage = 'Network error: Unable to connect to the server.';
              this.displayError(errorMessage);
              break;

            case 401:
              errorMessage = 'Unauthorized: Token is missing or invalid.';
              this.displayError(errorMessage);
              this.handleLogout();
              break;

            case 403:
              errorMessage = 'Forbidden: You don’t have permission to access this resource.';
              this.displayError(error.message);
              break;

            case 498: // Custom token expired status
              errorMessage = 'Token expired. Please login again.';
              this.displayError(errorMessage);
              this.handleLogout();
              break;

            default:
              // If API returns error object with message
              errorMessage = error.error?.message || `Error ${error.status}: ${error.message}`;
              this.displayError(errorMessage);
              break;
          }
        }

        console.error('Interceptor Error:', errorMessage, error);
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  private displayError(message: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message
    });
  }

  private handleLogout(): void {
    this.storage.clear();
    this.router.navigate(['/login']);
  }
}
