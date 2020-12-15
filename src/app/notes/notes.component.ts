import { Component, Input, OnInit } from '@angular/core';
import {BackendAppService} from '../backend-app.service';
import { Location } from '@angular/common';
import { Note } from '../notes';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatButton, MatButtonModule } from '@angular/material/button';



@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})

 

export class NotesComponent implements OnInit {
  notes: Note[] = [];
  note: Note;
  user : User;
  users : User[] = [];
  categorie: string;
  categories : string[] = ['Privé', 'Dringend', 'Common', 'Info'];
  gekozenCategorie: string;
  gekozenUser : string;
  textareaclass : string;
  notitie : string;
  isShow = true;
  isShowEdit = false;

  constructor(private route: ActivatedRoute, private backendappService: BackendAppService,  
    private location: Location, private dialog: MatDialog) { }

  ngOnInit() {
    this.getUsers();
    this.textareaclass= "disabled"
  }

  elementSelectionChange(name: string) {
    let value = this.users.find(x => x.name === name)
    console.log(value.id);
    this.getNotes(value.id);
  }

  getNotes(id : number): void {
    this.backendappService.getNotes(id).subscribe(notes => {console.log(notes); this.notes = notes});
      }

  delete(id : number, userId: number): void {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Remove Note',
        message: 'Are you sure, you want to remove note: ' + id
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.backendappService.deleteNote(id).subscribe((result)=> {
          console.log(result);this.getNotes(userId)
        });}
    });
  }

  EditNote(): void {
    this.textareaclass="enabled"
    this.isShow = !this.isShow;
    this.isShowEdit = !this.isShowEdit;
  }

  updateNote(categorie: string, content: string, id: number): void {
   this.backendappService.updateNote(categorie, content, id).subscribe();
   this.textareaclass="disabled"
   this.isShow = !this.isShow;
   this.isShowEdit = !this.isShowEdit;
  }

  add(text: string, categorie: string, name: string): void {
      if (!text) { return; } 
      this.backendappService.postNotes(text, categorie, name).subscribe((result) => {console.log(result);
        this.backendappService.getNotes(2).subscribe(notes => this.notes = notes);});
        this.notitie= "";
  }

  getUsers(): void {
    this.backendappService.getUsers().subscribe(users => this.users = users);
      }
}
