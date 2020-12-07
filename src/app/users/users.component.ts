import { Component, OnInit } from '@angular/core';
import {BackendAppService} from '../backend-app.service';
import { User } from '../user';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

@Injectable({ providedIn: 'root' })


export class UsersComponent implements OnInit {
users: User[] = [];

constructor(private backendappService: BackendAppService) { }
  
  ngOnInit() {
      this.getUsers();
      }


  getUsers(): void {
    this.backendappService.getUsers().subscribe(users => this.users = users);
      }

  add(name: string): void {
    name = name.trim();
      if (!name) { return; }   //push veranderen omdat backend message meegeeft met user name. 
                            //of geef user terug in glitch
      this.backendappService.postUsers(name).subscribe((result) => {console.log(result);});
  }
      
  delete(name : string): void {
      this.backendappService.deleteUser(name).subscribe((result)=> {
        this.backendappService.getUsers().subscribe(users => this.users = users);
      });
      
  }

}

