import { ProductComponent } from './components/product/product.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AppRoutingModule } from './app-routing.module';
import { MatSortModule } from '@angular/material/sort';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CartComponent } from './components/cart/cart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ManageCustomersComponent } from './components/manage-customers/manage-customers.component';
import { ManagePurchaseComponent } from './components/manage-purchase/manage-purchase.component';
import { PaymentGatewayComponent } from './components/payment-gateway/payment-gateway.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { HomeComponent } from './components/home/home.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductComponent,
    CartComponent,
    AdminLoginComponent,
    AdminDashboardComponent,
    ManageCustomersComponent,
    ManagePurchaseComponent,
    PaymentGatewayComponent,
    OrderSummaryComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatSortModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
