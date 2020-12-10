import { Component, Input, OnInit } from '@angular/core';
import {BackendAppService} from '../backend-app.service';
import { Location } from '@angular/common';
import { Note } from '../notes';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';



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
  categories : string[] = ['Privé', 'Dringend', 'Common', 'Info'];
  gekozenCategorie: string;
  gekozenUser : string;
  textareaclass : string;
  isShow = true;
  isShowEdit = false;

// @Input() model: User;   
//   updateModel() {
//     this.model.id;
//   }

  constructor(private route: ActivatedRoute, private backendappService: BackendAppService,  
    private location: Location, private dialog: MatDialog) { }

  ngOnInit() {
    const id = 26;
    this.backendappService.postNotes("dit is een note", "Privé", "dimi").subscribe((result)=> {console.log(result)
    this.getNotes(id);});
    this.getUsers();
    this.textareaclass= "disabled"
  }

  getNotes(id : number): void {
    this.backendappService.getNotes(id).subscribe(notes => {console.log(notes); this.notes = notes});
      }

  getNote(): void {
    const id = +this.route.snapshot.paramMap.get('id'); 
    this.backendappService.getNote(id).subscribe(note => this.note= note);
  }

  delete(id : number): void {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Remove Note',
        message: 'Are you sure, you want to remove note: ' + id
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.backendappService.deleteNote(id).subscribe((result)=> {
          console.log(result);});}
    });
  }

  EditNote(): void {
    this.textareaclass="enabled"
    this.isShow = !this.isShow;
    this.isShowEdit = !this.isShowEdit;
  }

  updateNote(): void {
   this.backendappService.updateNote(this.note).subscribe();
   this.textareaclass="disabled"
   this.isShow = !this.isShow;
   this.isShowEdit = !this.isShowEdit;
  }

  add(note: string, categorie: string, name: string): void {
    const id = +this.route.snapshot.paramMap.get('id'); 
      if (!note) { return; } 
      this.backendappService.postNotes(note, categorie, name).subscribe((result) => {console.log(result);
        this.backendappService.getNotes(id).subscribe(notes => this.notes = notes);});
  }

  getUsers(): void {
    this.backendappService.getUsers().subscribe(users => this.users = users);
      }
}
