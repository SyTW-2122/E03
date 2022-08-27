import { Component, OnInit } from '@angular/core';

import { MenuItem } from 'primeng/api';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  content?: string;
  items: MenuItem[];
  constructor(private userService: UserService) { }
  ngOnInit() {
    this.items = [
      {label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['']},
      {label: 'Login', icon: 'pi pi-sign-in', routerLink: ['login']},
      {label: 'Register', icon: 'pi pi-sign-out', routerLink: ['register']}
    ];
    this.userService.getPublicContent().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(JSON.stringify(err.error)).message;
      }
    )
  }
}
