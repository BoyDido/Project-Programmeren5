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
  note: Note;
  user : User;
  users : User[] = [];
  categories : string[] = ['--', 'Privé', 'Dringend', 'Common', 'Info'];
  gekozenCategorie: string;
  term:string;
  textareaclass : string;
  isShow = true;
  isShowEdit = false;

  constructor(private backendAppService: BackendAppService, private dialog: MatDialog) {}
    
  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit() : void {
    this.getUsers();
    this.gekozenCategorie = "--";
    this.gekozenUser="--";
    this.textareaclass= "disabled"
    this.notes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.backendAppService.searchNotes
            (term, this.gekozenCategorie, this.gekozenUser)),
    );
    
  }

  getUsers(): void {
    this.backendAppService.getUsers().subscribe(users => this.users = users);
      }

      EditNote(): void {
        this.textareaclass="enabled"
        this.isShow = !this.isShow;
        this.isShowEdit = !this.isShowEdit;
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
            this.backendAppService.deleteNote(id).subscribe((result)=> {
              console.log(result);});}
        });
      }
    
      updateNote(): void {
       this.backendAppService.updateNote(this.note).subscribe();
       this.textareaclass="disabled"
       this.isShow = !this.isShow;
       this.isShowEdit = !this.isShowEdit;
      }
}
