import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kids',
  imports: [CommonModule],
  templateUrl: './kids.component.html',
  styleUrl: './kids.component.css'
})
export class KidsComponent {
  products = [
    {
      id: 1,
      name: 'T-Shirt',
      price: 199.99,
      image: 'assets/products/men-tshirt.png'
    },
    {id: 1,
    name: 'Jumpsuit',
    price: 199.99,
    image: 'assets/products/men-tshirt.png'
  },
  {id: 1,
    name: 'Dress',
    price: 199.99,
    image: 'assets/products/men-tshirt.png'
  },
  {id: 1,
    name: 'Trousers',
    price: 199.99,
    image: 'assets/products/men-tshirt.png'
  },]
  selectedProduct: any = null;

  showProductDetails(product: any) {
    this.selectedProduct = product;
  }

  closeProductDetails() {
    this.selectedProduct = null;
  }

}
