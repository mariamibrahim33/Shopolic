import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../cart.service';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
}

export interface CartItem extends Product {
  quantity: number; 
}


@Component({
  selector: 'app-product-list',
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  products: Product[] = [
    {
      id: 1,
      name: 'Wireless Headphones',
      price: 59.99,
      image: 'assets/products/headphones.png',
      description: 'High-quality wireless headphones with noise cancellation.',
    },
    {
      id: 2,
      name: 'Smart Watch',
      price: 99.99,
      image: 'assets/products/smartwatch.png',
      description: 'Smartwatch with heart rate monitoring and fitness tracking.',
    },
    {
      id: 3,
      name: 'Gaming Mouse',
      price: 29.99,
      image: 'assets/products/mouse.png',
      description: 'Ergonomic gaming mouse with customizable buttons.',
    },
    {
      id: 4,
      name: 'Laptop Stand',
      price: 45.00,
      image: 'assets/products/stand.png',
      description: 'Adjustable laptop stand for better ergonomics.',
    },
  ];

  selectedProduct: Product | null = null;

  constructor(private cartService: CartService) {}

  showProductDetails(product: Product) {
    this.selectedProduct = product;
  }

  closeProductDetails() {
    this.selectedProduct = null;
  }

  addToCart(product: Product) {
    this.cartService.addToCart({ ...product, quantity: 1 }); // Adding to cart with quantity
  }
  
}


