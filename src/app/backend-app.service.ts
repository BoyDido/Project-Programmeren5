import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from './user';
import { Note } from './notes';
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root'})
export class BackendAppService {

    private usersUrl = 'https://glitch.com/~ubiquitous-distinct-friday';  // URL to web api
    private notesUrl = 'https://glitch.com/~ubiquitous-distinct-friday';  // URL to web api
    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient, private messageService: MessageService) { }
    
    getUsers =() => {
      return this.http.get<User[]>(this.usersUrl).pipe(tap(_ => this.log('fetched users')),
        catchError(this.handleError<User[]>('getUsers', []))
      ); 
    }
    
    getUser(id: number): Observable<User> {
      return this.http.get<User>('${this.usersUrl}/${id}').pipe(
        tap(_ => this.log(`fetched user id=${id}`)),
        catchError(this.handleError<User>(`getUser id=${id}`))
      );
    }

      /** PUT: update the user on the server */
    updateUser(user: User): Observable<any> {
      return this.http.put((this.usersUrl), user, this.httpOptions).pipe(
        tap(_ => this.log(`updated user id=${user.id}`)),
        catchError(this.handleError<any>('updateUser'))
      );
    }

    postUsers = (user: User) =>  {
      return this.http.post<User>(this.usersUrl, user).pipe(
        tap((newUser: User) => this.log(`added user w/ id=${newUser.id}`)),
        catchError(this.handleError<User>('addUser'))
      );
    }
    
    deleteUser(user: User | number): Observable<User>{
      const id = typeof user === 'number' ? user : user.id;
      const url = '${this.usersUrl}/${id}';
      return this.http.delete<User>(url, this.httpOptions).pipe(
        tap(_ => this.log(`deleted user id=${id}`)),
        catchError(this.handleError<User>('deleteUser'))
        );
    }

    getNotes =() => {
      return this.http.get<Note[]>(this.notesUrl).pipe(tap(_ => this.log('fetched notes')),
        catchError(this.handleError<User[]>('getNotes', []))
      ); 
    }

    getNote(id: number): Observable<Note> {
      return this.http.get<Note>('${this.notesUrl}/${id}').pipe(
        tap(_ => this.log(`fetched note id=${id}`)),
        catchError(this.handleError<Note>(`getNote id=${id}`))
      );
    }

    postNotes(note: any):Observable<any> {
      return this.http.post('https://glitch.com/~phantom-cord-perch/user', note)
    }
    
    patchNote(adjustNote){ 
      return this.http.patch('https://glitch.com/~phantom-cord-perch/user', adjustNote)
    }

    deleteNote(id: number): Observable<{}>{
      const urlbase = 'https://glitch.com/~phantom-cord-perch/user';
      const url = urlbase + '/' + [id];
      return this.http.delete(url);
    }

  /** Log a UserService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`BackendAppService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
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



}


