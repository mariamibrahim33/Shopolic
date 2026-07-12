import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService, CartItem } from '../../services/cart.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [CommonModule]
})
export class CartComponent {
  imageURL = `${environment.apiBase}/assets/`;

  constructor(private cart: CartService, private router: Router) {}

  get cartItems(): CartItem[] {
    return this.cart.getCartItems();
  }

  get totalPrice(): number {
    return this.cart.getTotalPrice();
  }

  increaseQuantity(item: CartItem) {
    this.cart.increaseQuantity(item._id);
  }

  decreaseQuantity(item: CartItem) {
    this.cart.decreaseQuantity(item._id);
  }

  updateQuantity(item: CartItem, event: any) {
    this.cart.setQuantity(item._id, Number(event.target.value));
  }

  removeFromCart(item: CartItem) {
    this.cart.removeFromCart(item._id);
  }

  navigateToPayment() {
    this.router.navigate(['/payment']);
  }

  continueShopping() {
    this.router.navigate(['/home']);
  }
}
