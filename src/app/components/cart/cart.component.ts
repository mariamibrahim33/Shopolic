import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Router } from '@angular/router';

// Define a basic structure for CartItem (you can replace this with your real structure)
interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [CommonModule,]
})


export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  constructor(private router: Router) {}  

  ngOnInit(): void {
    // Mock data for cart items
    this.cartItems = [
      {
        id: 1,
        name: 'Product 1',
        image: 'https://m.media-amazon.com/images/I/71gbYy1I2JL._AC_SL1500_.jpg',
        price: 10.99,
        quantity: 1
      },
      {
        id: 2,
        name: 'Product 2',
        image: 'https://via.placeholder.com/100',
        price: 20.50,
        quantity: 2
      }
    ];

    // Calculate the total price
    this.updateTotalPrice();
  }

  updateQuantity(item: CartItem, event: any) {
    const newQuantity = Number(event.target.value);
    if (newQuantity >= 1 && Number.isInteger(newQuantity)) {
      item.quantity = newQuantity;
      this.updateTotalPrice();
    }
  }
  

  increaseQuantity(item: CartItem) {
    item.quantity++;
    this.updateTotalPrice();
  }
  
  decreaseQuantity(item: CartItem) {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateTotalPrice();
    }
  }
  

  // Remove item from cart
  removeFromCart(item: CartItem) {
    this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== item.id);
    this.updateTotalPrice(); // Update total price after removal
  }

  // Update the total price based on cart items
  updateTotalPrice() {
    this.totalPrice = this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  // Navigate to payment (this can be replaced with actual navigation logic)
  navigateToPayment() {
    console.log('Navigating to payment...');
    this.router.navigate(['/payment']);
  }
}
