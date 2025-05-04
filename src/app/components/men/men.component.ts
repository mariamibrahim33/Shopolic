import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopService } from '../../services/shop.service'; 
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-men',
  templateUrl: './men.component.html',
  styleUrls: ['./men.component.css'],
  imports: [CommonModule, FormsModule]
})
export class MenComponent implements OnInit {
  products :any [] = []
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

