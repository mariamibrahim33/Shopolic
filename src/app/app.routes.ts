import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
// import { CartComponent } from './components/cart/cart.component';
import { ReactiveFormsComponent } from './components/reactive-forms/reactive-forms.component';
import { PaymentComponent } from './components/payment/payment.component';
import { OrderSucessComponent } from './components/order-sucess/order-sucess.component';
import { WomenComponent } from './components/women/women.component';
import { MenComponent } from './components/men/men.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { KidsComponent } from './components/kids/kids.component';
import { BeautyComponent } from './components/beauty/beauty.component';

export const routes: Routes = [
{ path: '', redirectTo: '/home', pathMatch: 'full' },
{path: 'home',component: HomeComponent},
{ path: 'login', component: LoginComponent },
{ path: 'register', component: RegisterComponent },
{path: 'dashboard', component: DashboardComponent},
// {path: 'cart', component: CartComponent},
{path: 'reactiveForms', component:ReactiveFormsComponent},
{path: 'payment', component: PaymentComponent},
{path: 'order-sucess', component: OrderSucessComponent},
{path: 'women', component: WomenComponent},
{path: 'kids', component: KidsComponent},
{path: 'beauty', component: BeautyComponent},
{path: 'men', component: MenComponent},
{path: 'product-list', component : ProductListComponent}
];