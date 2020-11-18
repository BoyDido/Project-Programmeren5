import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import {BackendAppService} from '../backend-app.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  users: User[] = [];

  constructor(private backendappService: BackendAppService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.backendappService.getUsers()
      .subscribe(users => this.users = users.slice(0, 4));
  }
}