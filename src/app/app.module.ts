import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { GetUserComponent } from './components/get-user/get-user.component';
import { GetUsersComponent } from './components/get-users/get-users.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';

// Modulo PrimeNG
import { PrimeNgModule } from './prime-ng/prime-ng.module';
import { TabMenuModule } from 'primeng/tabmenu';
import { AvatarModule } from "primeng/avatar";
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule} from 'primeng/button';


@NgModule({
  declarations: [
    AppComponent,
    GetUserComponent,
    GetUsersComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    TabMenuModule,
    PrimeNgModule,
    AvatarModule,
    BreadcrumbModule,
    InputTextModule,
    ButtonModule
  ],
  exports: [
    LoginComponent,
    HomeComponent,
    RegisterComponent
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
