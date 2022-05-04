import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { GetUserComponent } from './components/get-user/get-user.component';
import { GetUsersComponent } from './components/get-users/get-users.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { MoviesComponent } from './components/movies/movies.component';
import { ComingSoonComponent } from './components/coming-soon/coming-soon.component';
import { MenuComponent } from './components/menu/menu.component';

// Providers
import { authInterceptorProviders } from './helpers/auth.interceptor';

// Modulo PrimeNG
import { AvatarModule } from "primeng/avatar";
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule} from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PrimeNgModule } from './prime-ng/prime-ng.module';
import { TabMenuModule } from 'primeng/tabmenu';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [
    AppComponent,
    GetUserComponent,
    GetUsersComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    MoviesComponent,
    ComingSoonComponent,
    MenuComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    TabMenuModule,
    PrimeNgModule,
    AvatarModule,
    BreadcrumbModule,
    InputTextModule,
    ButtonModule,
    BsDatepickerModule.forRoot()
  ],
/*   exports: [
    LoginComponent,
    HomeComponent,
    RegisterComponent
  ], */
  providers: [ authInterceptorProviders ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
