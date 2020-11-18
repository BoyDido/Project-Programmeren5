import { Component, OnInit } from '@angular/core';
import {BackendAppService} from '../backend-app.service';
import { User } from '../user';
import { MessageService } from '../message.service';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

@Injectable({ providedIn: 'root' })


export class UsersComponent implements OnInit {
  users : User[];

constructor(private backendappService: BackendAppService) { }
  
ngOnInit(): void {
    this.getUsers();
    }
  
getUsers(): void {
  this.backendappService.getUsers().subscribe((data) => {console.log(data);})
    //this.backendappService.getUsers().subscribe(users => this.users = users);
  }


    add(username: string): void {
    username = username.trim();
    if (!username) { return; }
    this.backendappService.postUsers({ username } as User)
      .subscribe(user => {this.users.push(user);
      });
    }
    
  delete(user: User): void {
    this.users = this.users.filter(u => u !== user);
    this.backendappService.deleteUser(user.id).subscribe();
  }




  }

