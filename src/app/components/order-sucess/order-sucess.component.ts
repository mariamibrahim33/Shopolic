import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-sucess',
  imports: [],
  templateUrl: './order-sucess.component.html',
  styleUrl: './order-sucess.component.css'
})
export class OrderSucessComponent {
  constructor(private router: Router) {}
  goHome() {
    this.router.navigate(['/']);
  }

}
