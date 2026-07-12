import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(
    public router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

   navigateToHome() {
    this.router.navigate(['/']);}

  postData(form:NgForm){
    if(form.invalid){
      // Touch all fields so validation messages show
      Object.values(form.controls).forEach(c => c.markAsTouched());
      return;
    }

    const { username, email, password } = form.value;
    this.authService.register({ name: username, email, password }).subscribe({
      next: () => {
        // Return them to checkout if that's where they came from.
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        this.router.navigateByUrl(returnUrl || '/home');
      },
      error: (err) => {
        const msg = err?.error?.message || 'Registration failed. Please try again.';
        alert(msg);
      }
    });
  };

}


