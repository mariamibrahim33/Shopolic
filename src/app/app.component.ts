import { Component } from '@angular/core';
import { RouterModule ,RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { ShopComponent } from './components/shop/shop.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductDetailsComponent } from './components/product-list/product-details/product-details.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { PaymentComponent } from './components/payment/payment.component';
import { OrderSucessComponent } from './components/order-sucess/order-sucess.component';
import { WomenComponent } from './components/women/women.component';
import { KidsComponent } from './components/kids/kids.component';
import { BeautyComponent } from './components/beauty/beauty.component';
import { MenComponent } from './components/men/men.component';
import { ProductListComponent } from './components/product-list/product-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, RouterOutlet, HeaderComponent, HomeComponent, ProductDetailsComponent,
    LoginComponent, FormsModule, ShopComponent, DashboardComponent, PaymentComponent, OrderSucessComponent,WomenComponent,
   KidsComponent, BeautyComponent, MenComponent, ProductListComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shopolic';
}
