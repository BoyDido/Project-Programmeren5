import { Component, OnInit } from '@angular/core';
//import { UrlSegmentGroup } from '@angular/router';
//import { userInfo } from 'os';
import {BackendAppService} from './backend-app.service';
//import { UserNotesComponent } from './user-notes/user-notes.component';
//import { UsersComponent } from './users/users.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ProjectProg5';
  
  
 

constructor(private backendappService: BackendAppService) {}

ngOnInit(){

}



} 

