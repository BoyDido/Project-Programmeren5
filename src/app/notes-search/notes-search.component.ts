import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { User } from '../user';
import { BackendAppService } from '../backend-app.service';
import { Note } from '../notes';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-notes-search',
  templateUrl: './notes-search.component.html',
  styleUrls: ['./notes-search.component.css']
})

export class NotesSearchComponent implements OnInit {
  notes$: Observable<Note[]>;
  private searchTerms = new Subject<string>();
  gekozenUser: string;
  notes: Note[] = [];
  filteredNotes: Note[] = [];
  notesFromUser: Note[] = [];
  filteredNotesOfUser: Note[] = [];
  errorMessage: string;
  note: Note;
  user : User;
  users : User[] = [];
  categories : string[] = ['--', 'Privé', 'Dringend', 'Common', 'Info'];
  gekozenCategorie: string;
  term:string;
  textareaclass : string;
  isShow = true;
  isShowEdit = false;
  bool = false;

  constructor(private backendAppService: BackendAppService, private dialog: MatDialog) {}


  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit() : void {
    this.getUsers();
    this.gekozenCategorie = "--";
    this.gekozenUser="--";
    this.textareaclass= "disabled";
    if (this.gekozenUser !== "--"){
    this.notes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.backendAppService.searchNotes(term)),
    );}
  }

  searchInNotesFromUser(zoekterm : string){
    this.backendAppService.searchNotes(zoekterm).subscribe(filteredNotesOfUser => 
      {console.log(filteredNotesOfUser); this.filteredNotesOfUser = filteredNotesOfUser})
    this.bool = true;
  }
    
  filterNotesFromUserOnCategorie(gekozenCategorie : string) : Note[]{
  this.filteredNotes = this.notesFromUser.filter(note => note.categorie === gekozenCategorie);
        console.log(gekozenCategorie);console.log(this.filteredNotes);
  return this.filteredNotes;
}

  elementSelectionChange () : void{
    this.gekozenCategorie = "--";
    this.bool= false;
  }

  elementSelectionChange2 (gekozenUser: string) : void{
    this.getNotesFromUser(gekozenUser);console.log(gekozenUser);
  }

  getUsers(): void {
    this.backendAppService.getUsers().subscribe(users => this.users = users);
  }

  getNotes(id : number): void {
    this.backendAppService.getNotes(id).subscribe(notesFromUser => 
      {console.log(notesFromUser); this.notesFromUser = notesFromUser; 
        this.filteredNotesOfUser= notesFromUser})
    }

  getNotesFromUser(name: string) : void{
    this.backendAppService.getNotesFromUser(name).subscribe(notesFromUser => 
      {console.log(notesFromUser); this.notesFromUser = notesFromUser;
        this.filteredNotes = this.notesFromUser})
  }

  EditNote(): void {
    this.textareaclass="enabled"
    this.isShow = !this.isShow;
    this.isShowEdit = !this.isShowEdit;
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
            this.backendAppService.deleteNote(id).subscribe((result)=> {
              console.log(result); this.getNotes(userId);
            });
          }
      });
  }
    
  updateNote(categorie: string, content: string, id: number): void {
    this.backendAppService.updateNote(categorie, content, id).subscribe();
    this.textareaclass="disabled"
    this.isShow = !this.isShow;
    this.isShowEdit = !this.isShowEdit;
  }

}
