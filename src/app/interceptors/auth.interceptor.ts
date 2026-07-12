import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

// Attaches the stored JWT as a Bearer token on outgoing API requests.
// In dev the API is on localhost:3000; in prod it is same-origin (apiBase '').
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('accessToken');
  const isApiRequest =
    environment.apiBase
      ? req.url.startsWith(environment.apiBase)
      : req.url.startsWith('/'); // same-origin relative URLs in production

  if (token && isApiRequest) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }
  return next(req);
};
