import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  _id: string;
  name: string;
  price: number;
  image: string; // filename served from the backend /assets
  quantity: number;
}

const STORAGE_KEY = 'shopolic_cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: CartItem[] = this.load();
  private itemsSubject = new BehaviorSubject<CartItem[]>(this.items);

  /** Stream of the current cart items (for reactive UI like the header badge). */
  items$ = this.itemsSubject.asObservable();

  private load(): CartItem[] {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
      return [];
    }
  }

  private persist(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
    this.itemsSubject.next([...this.items]);
  }

  addToCart(product: any): void {
    const id = product._id;
    const existing = this.items.find(i => i._id === id);
    if (existing) {
      existing.quantity++;
    } else {
      this.items.push({
        _id: id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      });
    }
    this.persist();
  }

  increaseQuantity(id: string): void {
    const item = this.items.find(i => i._id === id);
    if (item) {
      item.quantity++;
      this.persist();
    }
  }

  decreaseQuantity(id: string): void {
    const item = this.items.find(i => i._id === id);
    if (item && item.quantity > 1) {
      item.quantity--;
      this.persist();
    }
  }

  setQuantity(id: string, quantity: number): void {
    const item = this.items.find(i => i._id === id);
    if (item && quantity >= 1 && Number.isInteger(quantity)) {
      item.quantity = quantity;
      this.persist();
    }
  }

  removeFromCart(id: string): void {
    this.items = this.items.filter(i => i._id !== id);
    this.persist();
  }

  clearCart(): void {
    this.items = [];
    this.persist();
  }

  getCartItems(): CartItem[] {
    return this.items;
  }

  getTotalItems(): number {
    return this.items.reduce((sum, i) => sum + i.quantity, 0);
  }

  getTotalPrice(): number {
    return this.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  }
}
