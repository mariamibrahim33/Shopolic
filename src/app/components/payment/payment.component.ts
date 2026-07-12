import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService, CartItem } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-payment',
  imports: [CommonModule, FormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  imageURL = 'http://localhost:3000/assets/';
  shippingFee = 65;
  placing = false;

  paymentMethod: 'cash' | 'credit' = 'cash';

  card = {
    name: '',
    number: '',
    expiry: '',
    cvc: '',
  };

  shipping = {
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    governorate: '',
    phone: '',
  };

  constructor(
    private cart: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  get items(): CartItem[] {
    return this.cart.getCartItems();
  }

  get subtotal(): number {
    return this.cart.getTotalPrice();
  }

  get total(): number {
    return this.subtotal + (this.items.length ? this.shippingFee : 0);
  }

  payNow(form: NgForm) {
    if (this.items.length === 0) {
      alert('Your cart is empty.');
      this.router.navigate(['/home']);
      return;
    }
    if (form.invalid) {
      Object.values(form.controls).forEach(c => c.markAsTouched());
      return;
    }

    this.placing = true;
    const order = {
      items: this.items.map(i => ({
        product: i._id,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
      })),
      subtotal: this.subtotal,
      shippingFee: this.shippingFee,
      total: this.total,
      shipping: this.shipping,
      paymentMethod: this.paymentMethod,
    };

    this.orderService.placeOrder(order).subscribe({
      next: () => {
        this.cart.clearCart();
        this.router.navigate(['/order-sucess']);
      },
      error: (err) => {
        this.placing = false;
        alert(err?.error?.message || 'Could not place your order. Please try again.');
      },
    });
  }
}
