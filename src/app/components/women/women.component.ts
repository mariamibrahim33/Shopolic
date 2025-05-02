import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-women',
  imports: [CommonModule],
  templateUrl: './women.component.html',
  styleUrl: './women.component.css'
})
export class WomenComponent {

  products = [
    {
      id: 1,
      name: 'Women Dress',
      price: 299.99,
      image: 'assets/products/women-dress.png'
    },
    {
      id: 2,
      name: 'Women Handbag',
      price: 399.99,
      image: 'assets/products/women-handbag.png'
    },
    {
      id: 3,
      name: 'Women Heels',
      price: 449.99,
      image: 'assets/products/women-heels.png'
    },
    {
      id: 4,
      name: 'Women Blazer',
      price: 499.99,
      image: 'assets/products/women-blazer.png'
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
