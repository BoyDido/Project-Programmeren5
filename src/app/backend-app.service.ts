import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from './user';
import { Note } from './notes';
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root'})
export class BackendAppService {

    private usersUrl = 'https://ubiquitous-distinct-friday.glitch.me';  // URL to web api
    
    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient, private messageService: MessageService) { }

    getUsers =(): Observable<User[]>  => {   // werkt
      return this.http.get<User[]>(`${this.usersUrl}/users`)
      .pipe(tap(_ => this.log('fetched users')),
        catchError(this.handleError<User[]>('getUsers', []))
      );
    }
    
    getUser = (id: number): Observable<User> => {   // werkt
      return this.http.get<User>(`${this.usersUrl}/user?id=${id}`).pipe(
        tap(_ => this.log(`fetched user id=${id}`)),
        catchError(this.handleError<User>(`getUser id=${id}`))
      );
    }
 
    deleteUser = (name : string): Observable<User> =>{ // werkt
      console.log(name);
      return this.http.get<User>(`${this.usersUrl}/remove?name=${name}`).pipe(
        tap(_ => this.log(`deleted user name=${name}`)),
        catchError(this.handleError<User>('deleteUser'))
        );
    }

      /** PUT: update the user on the server */ // werkt
    updateUser= (name: string, id: number) => {
      return this.http.put<User>(`${this.usersUrl}/users?id=${id}`, {'name': name}).pipe(
        tap(_ => this.log(`updated user ${name}`)),
        catchError(this.handleError<any>('updateUser'))
      );
    }

    postUsers = (name: string) =>  {   // werkt
      return this.http.post(`${this.usersUrl}/users`, { 'name': name}).pipe(
        tap((newUser: User) => this.log(`added user w/ id=${newUser.id}`)),
        catchError(this.handleError<User>('addUser'))
        );
    }
    
    getNotes = (id : number) => {  //om te testen
      return this.http.get<Note[]>(`${this.usersUrl}/notes?id=${id}`)
        .pipe(tap(_ => this.log('fetched notes')),
        catchError(this.handleError<Note[]>('getNotes', []))
      ); 
    }

    getNote(id: number): Observable<Note> {
      return this.http.get<Note>(`${this.usersUrl}/${id}`).pipe(
        tap(_ => this.log(`fetched note id=${id}`)),
        catchError(this.handleError<Note>(`getNote id=${id}`))
      );
    }

    postNotes = (note: string, categorie: string, name: string) =>  {
      return this.http.post(`${this.usersUrl}/users/notes`, { 'content': note, 'categorie': categorie, 'name': name}).pipe(
        tap((newNote: Note) => this.log(`added note w/ id=${newNote.id}`)),
        catchError(this.handleError<Note>('addNote'))
        );
      }
    
    updateNote(note: Note): Observable<any> {
        return this.http.put((this.usersUrl), note).pipe(
          tap(_ => this.log(`updated note id=${note.id}`)),
          catchError(this.handleError<any>('updateNote'))
        );
      }

    deleteNote = (id : number): Observable<Note> =>{ 
      console.log(id);
      return this.http.get<Note>(`${this.usersUrl}/deleteNote?id=${id}`).pipe(
        tap(_ => this.log(`deleted note id=${id}`)),
        catchError(this.handleError<Note>('deleteNote'))
        );
    }

    /** Log a UserService message with the MessageService */
    private log(message: string) {
      this.messageService.add(`BackendAppService: ${message}`);
    }

    /**
     * Handle Http operation that failed. Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {

        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead

        // TODO: better job of transforming error for user consumption
        this.log(`${operation} failed: ${error.message}`);

        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }

    /* GET users whose name contains search term */
    searchUsers(term: string): Observable<User[]> {
      if (!term.trim()) {
        // if not search term, return empty user array.
        return of([]);
      }
      return this.http.get<User[]>(`${this.usersUrl}/users/?name=${term}`).pipe(
        tap(x => x.length ?
          this.log(`found users matching "${term}"`) :
          this.log(`no users matching "${term}"`)),
        catchError(this.handleError<User[]>('searchUsers', []))
      );
    }

    /* GET notes whose user or categorie or content contains search term */
    searchNotes(term: string, categorie:string, name: string): Observable<Note[]> {
      if (!term.trim()) {
        // if not search term, return empty notes array.
        return of([]);
      }
      return this.http.get<Note[]>(`${this.usersUrl}/notes/?term=${term}&categorie=${categorie}&name=${name}`)
        .pipe(tap(x => x.length ?
          this.log(`found notes matching "${term} or ${categorie} or ${name}"`) :
          this.log(`no notes matching "${term} or ${categorie} or ${name}"`)),
        catchError(this.handleError<Note[]>('searchUsers', []))
      );
    }
}


