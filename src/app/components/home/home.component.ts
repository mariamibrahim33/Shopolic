import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']  // 🔧 corrected this too
})
export class HomeComponent {
  constructor(private router: Router) {}

  navigateToShop() {
    this.router.navigate(['/shop']);
  }
}
