import { NgModule } from '@angular/core';

// PrimeNg
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';

@NgModule({
    imports: [
      ButtonModule,
      PasswordModule
    ]
  })
  export class PrimeNgModule { }