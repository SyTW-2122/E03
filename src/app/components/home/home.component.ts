import { Component, OnInit } from '@angular/core';

import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  items: MenuItem[];
  activeItem: MenuItem;

  items_breadcrumb: MenuItem[];
  home: MenuItem;

  ngOnInit() {
    this.items = [
      {label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['']},
      {label: 'Login', icon: 'pi pi-sign-in', routerLink: ['login']},
      {label: 'Register', icon: 'pi pi-sign-out', routerLink: ['register']}
    ];

    this.activeItem = this.items[0];

    this.home = {icon: 'pi pi-home'};
  }
}
