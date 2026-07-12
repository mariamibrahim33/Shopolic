import { HttpInterceptorFn } from '@angular/common/http';

// Attaches the stored JWT as a Bearer token on outgoing API requests.
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('accessToken');
  if (token && req.url.includes('localhost:3000')) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }
  return next(req);
};
