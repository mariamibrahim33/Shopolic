// import { Component, OnInit } from '@angular/core';


// @Component({
//   selector: 'app-cart',
//   templateUrl: './cart.component.html',
//   styleUrls: ['./cart.component.css']
// })
// export class CartComponent implements OnInit {
//   // cartItems: CartItem[] = [];
//   totalPrice: number = 0;

//   constructor(private cartService: CartService) {}

//   ngOnInit(): void {
//     this.cartItems = this.cartService.getCartItems();  // Get cart items
//     this.totalPrice = this.cartService.getTotalPrice();  // Get total price
//   }

//   // Update the quantity of an item
//   updateQuantity(item: CartItem, event: any) {
//     const newQuantity = event.target.value;
//     if (newQuantity >= 1) {
//       item.quantity = newQuantity;
//       this.totalPrice = this.cartService.getTotalPrice();  // Update total price
//     }
//   }

//   // Remove item from cart
//   removeFromCart(item: CartItem) {
//     this.cartService.removeFromCart(item);
//     this.cartItems = this.cartService.getCartItems();
//     this.totalPrice = this.cartService.getTotalPrice();  // Update total price
//   }

//   navigateToPayment() {
//     // Navigate to payment page
//     console.log('Navigating to payment...');
//   }
// }
