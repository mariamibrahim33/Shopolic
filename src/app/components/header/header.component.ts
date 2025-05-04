import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // adjust path as needed
import { CommonModule } from '@angular/common'; // Import CommonModule for ngIf

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [CommonModule] // Add CommonModule here
})
export class HeaderComponent implements OnInit {
  loggedIn = false;
  userName: string | null = null;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.loggedIn = this.authService.isLoggedIn();
    console.log('Logged In:', this.loggedIn);  // Check the console
    if (this.loggedIn) {
      this.userName = this.authService.getUserName();
      console.log('User Name:', this.userName);  // Check the console
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.authService.logout();
    this.loggedIn = false;
    this.userName = null;
    this.router.navigate(['/login']);
  }
}
