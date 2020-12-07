import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { ActivatedRoute } from '@angular/router';

import { Location } from '@angular/common';
import {BackendAppService} from '../backend-app.service';
import { Note } from '../notes';

@Component({
  selector: 'app-user-notes',
  templateUrl: './user-notes.component.html',
  styleUrls: ['./user-notes.component.css']
})

export class UserNotesComponent implements OnInit {
  user: User;
  note: Note;
  
  constructor(  private route: ActivatedRoute, private backendappService: BackendAppService,
    private location: Location) { }

  ngOnInit(): void {
    this.getUser();
  }

  /** haal user op uit http action */ //werkt
  getUser(): void {
    const id = +this.route.snapshot.paramMap.get('id'); 
    this.backendappService.getUser(id).subscribe(user => {this.user = user; console.log(user)});
  }

  getNote(): void {
      const id = +this.route.snapshot.paramMap.get('id'); // nog GetNoteById inbrengen in glitch
      this.backendappService.getNote(id).subscribe(note => this.note= note);
    }

  getNotes(): void {
    this.backendappService.getNotes().subscribe((data) => {console.log(data);})
    }
    
  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.backendappService.updateUser(this.user).subscribe(() => this.goBack());
  }



}
