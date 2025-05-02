import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-men',
  templateUrl: './men.component.html',
  styleUrls: ['./men.component.css'],
  imports: [CommonModule]
})
export class MenComponent {
  products = [
    {
      id: 1,
      name: 'Men T-Shirt',
      price: 199.99,
      image: 'assets/products/men-tshirt.png',
      description: 'Stylish and comfortable t-shirt for everyday wear.'
    },
    {
      id: 2,
      name: 'Men Hoodie',
      price: 349.99,
      image: 'assets/products/men-hoodie.png',
      description: 'Warm and soft hoodie perfect for cold days.'
    },
    {
      id: 3,
      name: 'Men Sneakers',
      price: 499.99,
      image: 'assets/products/men-sneakers.png',
      description: 'Trendy sneakers with great grip and comfort.'
    },
    {
      id: 4,
      name: 'Men Jacket',
      price: 599.99,
      image: 'assets/products/men-jacket.png',
      description: 'Durable and fashionable jacket for all seasons.'
    }
  ];

  selectedProduct: any = null;

  showProductDetails(product: any) {
    this.selectedProduct = product;
  }

  closeProductDetails() {
    this.selectedProduct = null;
  }
}

