import { Component, OnInit } from '@angular/core';
import { UrlSegmentGroup } from '@angular/router';
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
  //this.backendappService.getUsers().subscribe((user) => {console.log(user);})


  // this.backendappService.getNotes().subscribe((data) => {console.log(data);})
  // this.backendappService.postNotes(this.note).subscribe(note => this.note.push(note));
  // this.backendappService.patchNote(this.adjustNote).subscribe();
  // this.backendappService.deleteNote(this.note.id).subscribe();

}

// add(name: string): void {
//   name = name.trim();
//   if (!name) { return; }
//   this.backendappService.postUsers({ name }).subscribe(user => {this.user.push(user);});
// }

}

