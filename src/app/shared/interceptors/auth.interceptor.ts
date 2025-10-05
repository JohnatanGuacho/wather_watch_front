import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);
  const token = localStorage.getItem('token');

  const authReq = token 
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      let message = 'Error en la solicitud';
      
      if (error.status === 401) {
        message = 'No autorizado';
        localStorage.removeItem('token');
      } else if (error.status === 403) {
        message = 'Acceso denegado';
      } else if (error.status === 500) {
        message = 'Error del servidor';
      }

      messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: message
      });

      return throwError(() => error);
    })
  );
};