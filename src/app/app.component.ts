import { Component } from '@angular/core';

import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Cinemart';

  constructor() { }

  items_breadcrumb: MenuItem[];
  home: MenuItem;

  ngOnInit() {
    this.home = {icon: 'pi pi-home', routerLink: ['']};
  }
}
