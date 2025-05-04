import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopService } from '../../services/shop.service'; 
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  imageURL = '';
  selectedProduct: any = null; // ✅ For modal display
  selectedSize: string = '';

  constructor(private shopService: ShopService,
  private cartService: CartService) {}
 

  ngOnInit(): void {
    this.imageURL = this.shopService.uploadURL;
    this.shopService.getProducts().subscribe((data: any[]) => {
      this.products = data;
    });
  }

  showProductDetails(product: any): void {
    this.selectedProduct = product;
    this.selectedSize = '';
  }

  closeProductDetails(): void {
    this.selectedProduct = null;
    this.selectedSize = '';
  }

  addToCart(product: any): void {
  
    }
  

  
    

  // Uncomment when you integrate the cart
  // addToCart(product: any): void {
  //   console.log('Add to cart:', product);
  //   // this.cartService.addToCart(product);
  // }
}

