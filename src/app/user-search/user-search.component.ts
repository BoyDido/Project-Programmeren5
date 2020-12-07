import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import {User} from '../user';
import {BackendAppService} from '../backend-app.service';


@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {
  users$: Observable<User[]>;
  private searchTerms = new Subject<string>();
  
  constructor(private backendAppService: BackendAppService) {}
    
  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit() : void {
    this.users$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.backendAppService.searchUsers(term)),
    );
  }

}
