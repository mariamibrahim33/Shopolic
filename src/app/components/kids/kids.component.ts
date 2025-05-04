import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopService } from '../../services/shop.service'; 
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-kids',
  imports: [CommonModule,FormsModule],
  templateUrl: './kids.component.html',
  styleUrl: './kids.component.css'
})
export class KidsComponent implements OnInit{
  products :any[] = [];
  imageURL = '';
  selectedProduct: any = null;

  constructor(private shopService: ShopService,
    private cartService: CartService) {}

    ngOnInit(): void {
      this.imageURL = this.shopService.uploadURL;
      this.shopService.getProducts().subscribe((data: any[]) => {
        this.products = data;
      });
    }

  showProductDetails(product: any) {
    this.selectedProduct = product;
  }

  closeProductDetails() {
    this.selectedProduct = null;
  }

  addToCart(product: any): void {
  
  }

}
