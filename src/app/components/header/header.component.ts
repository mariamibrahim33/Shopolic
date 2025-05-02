import { Component } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  loggedIn = false;

  constructor(private router: Router) {}

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  toggleLogin() {
    this.loggedIn = !this.loggedIn;

    if (this.loggedIn) {
      // User is logging in, set loggedIn to true and navigate to home page or dashboard
      this.router.navigate(['/']);
   
  }
}
}

