import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // adjust path as needed
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common'; // Import CommonModule for ngIf

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [CommonModule, RouterLink, RouterLinkActive]
})
export class HeaderComponent implements OnInit {
  loggedIn = false;
  isAdmin = false;
  userName: string | null = null;
  cartCount = 0;

  constructor(
    private router: Router,
    private authService: AuthService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    // React to login/logout so the header updates without a page refresh.
    this.authService.getAccessToken().subscribe(() => {
      this.loggedIn = this.authService.isLoggedIn();
      this.isAdmin = this.loggedIn && this.authService.isAdmin();
      this.userName = this.loggedIn ? this.authService.getUserName() : null;
    });

    // Keep the cart badge in sync with the cart.
    this.cartService.items$.subscribe(items => {
      this.cartCount = items.reduce((sum, i) => sum + i.quantity, 0);
    });
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
