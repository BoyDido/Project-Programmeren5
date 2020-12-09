import { Component, Input, OnInit } from '@angular/core';
import {BackendAppService} from '../backend-app.service';
import { Location } from '@angular/common';
import { Note } from '../notes';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})

 

export class NotesComponent implements OnInit {
  notes: Note[] = [];
  note: Note;
  opties : string[] = ['Privé', 'Dringend', 'Common', 'Info'];
  gekozenOptie : string;

@Input() model: User;   
  updateModel() {
    this.model.id;
  }

  constructor(private route: ActivatedRoute, private backendappService: BackendAppService,  private location: Location ) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.backendappService.postNotes("dit is een note", "Privé", "dimi").subscribe((result)=> {console.log(result)
    this.getNotes(id);});
  }

  getNotes(id : number): void {
    this.backendappService.getNotes(id).subscribe(notes => {console.log(notes); this.notes = notes});
      }

  
  getNote(): void {
    const id = +this.route.snapshot.paramMap.get('id'); 
    this.backendappService.getNote(id).subscribe(note => this.note= note);
  }

  add(note: string, categorie: string, name: string): void {
    const id = +this.route.snapshot.paramMap.get('id'); 
      if (!note) { return; } 
      this.backendappService.postNotes(note, categorie, name).subscribe((result) => {console.log(result);
        this.backendappService.getNotes(id).subscribe(notes => this.notes = notes);});
  }
  
  delete(id : number): void {
    this.backendappService.deleteNote(id).subscribe((result)=> {
      console.log(result);});
  }

  updateNote(): void {
   this.backendappService.updateNote(this.note).subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
