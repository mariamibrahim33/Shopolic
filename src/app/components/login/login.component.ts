import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule]
})
export class LoginComponent {
  constructor(
    private _authS: AuthService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {}

  login(loginForm: NgForm) {
    if (loginForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    this._authS.login(loginForm.value).subscribe({
      next: () => {
        // If they were sent here mid-checkout, return them there.
        const returnUrl = this._route.snapshot.queryParamMap.get('returnUrl');
        if (returnUrl) {
          this._router.navigateByUrl(returnUrl);
          return;
        }
        // Otherwise: admins to the dashboard, shoppers to the store.
        this._router.navigate([this._authS.isAdmin() ? '/dashboard' : '/home']);
      },
      error: (err) => {
        console.log('Login failed:', err.message);
        alert('Login failed. Please check your email and password.');
      }
    });
  }

  navigateToRegister() {
    const returnUrl = this._route.snapshot.queryParamMap.get('returnUrl');
    this._router.navigate(['/register'], {
      queryParams: returnUrl ? { returnUrl } : {},
    });
  }
}
