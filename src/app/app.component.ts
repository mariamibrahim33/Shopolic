
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
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
  imports: [
    RouterOutlet,
    FormsModule,
    ProductListComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    PaymentComponent,
    OrderSucessComponent,
    CartComponent,
    WomenComponent,
    KidsComponent,
    BeautyComponent,
    MenComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shopolic';
}
