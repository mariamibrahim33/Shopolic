import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopService } from '../../services/shop.service'; // ✅ ensure the path is correct

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  imageURL = '';
  selectedProduct: any = null; // ✅ For modal display

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.imageURL = this.shopService.uploadURL;
    this.shopService.getProducts().subscribe((data: any[]) => {
      this.products = data;
    });
  }

  showProductDetails(product: any): void {
    this.selectedProduct = product;
  }

  closeProductDetails(): void {
    this.selectedProduct = null;
  }

  // Uncomment when you integrate the cart
  // addToCart(product: any): void {
  //   console.log('Add to cart:', product);
  //   // this.cartService.addToCart(product);
  // }
}
