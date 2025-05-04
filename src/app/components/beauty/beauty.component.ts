import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopService } from '../../services/shop.service'; 
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-beauty',
  imports: [CommonModule,FormsModule],
  templateUrl: './beauty.component.html',
  styleUrl: './beauty.component.css'
})
export class BeautyComponent {
  products : any[] = [];
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
  
    showProductDetails(product: any): void {
      this.selectedProduct = product;
  
    }
  
    closeProductDetails(): void {
      this.selectedProduct = null;
  
    }
  
    addToCart(product: any): void {
    
      }
  }

