import { Component, OnInit } from '@angular/core';
import {BackendAppService} from '../backend-app.service';
import { User } from '../user';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

@Injectable({ providedIn: 'root' })


export class UsersComponent implements OnInit {
users: User[] = [];

constructor(private backendappService: BackendAppService, private dialog: MatDialog) { }
  
  ngOnInit() {
      this.getUsers();
      }


  getUsers(): void {
    this.backendappService.getUsers().subscribe(users => this.users = users);
      }

  add(name: string): void {
    name = name.trim();
      if (!name) { return; } 
      this.backendappService.postUsers(name).subscribe((result) => {console.log(result);
        this.backendappService.getUsers().subscribe(users => this.users = users);});
  }
      
  delete(name : string): void {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Remove User',
        message: 'Are you sure, you want to remove user: ' + name
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.backendappService.deleteUser(name).subscribe((result)=> {
          console.log(result);});}; this.getUsers();
    });
    
  }

}

