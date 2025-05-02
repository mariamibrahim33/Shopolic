import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-beauty',
  imports: [CommonModule],
  templateUrl: './beauty.component.html',
  styleUrl: './beauty.component.css'
})
export class BeautyComponent {
  products = [
    {
      id: 1,
      name: 'Mascara',
      price: 299.99,
      image: 'assets/products/women-dress.png'
    },
    {
      id: 2,
      name: 'Makeup Remover',
      price: 399.99,
      image: 'assets/products/women-handbag.png'
    },
    {
      id: 3,
      name: 'Facial Cleanser',
      price: 449.99,
      image: 'assets/products/women-heels.png'
    },
    {
      id: 4,
      name: 'Body Splash',
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
