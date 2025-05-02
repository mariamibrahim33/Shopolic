import { Injectable } from '@angular/core';
import { Product } from './components/product-list/product-list.component';

export interface CartItem extends Product {
  quantity: number; 
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: CartItem[] = []; // Use CartItem instead of Product

  constructor() {}

  addToCart(product: CartItem) {
    const existingItem = this.cartItems.find(item => item.id === product.id);
    if (existingItem) {
      // If the item already exists, increment the quantity
      existingItem.quantity += 1;
    } else {
      // Otherwise, add the product with quantity 1
      this.cartItems.push({ ...product, quantity: 1 });
    }
  }

  // Get all items in the cart
  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  // Remove product from cart
  removeFromCart(product: Product) {
    this.cartItems = this.cartItems.filter(item => item.id !== product.id);
  }

  // Get total price of cart items
  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  updateQuantity(product: CartItem, quantity: number) {
    const item = this.cartItems.find(item => item.id === product.id);
    if (item) {
      item.quantity = quantity;
    }
  }
}
