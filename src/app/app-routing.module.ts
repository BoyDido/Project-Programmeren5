import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserNotesComponent } from './user-notes/user-notes.component';
import { NotesComponent } from './notes/notes.component';
import { NotesSearchComponent } from './notes-search/notes-search.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'users', component: UsersComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'user-notes/:id', component: UserNotesComponent },
  { path: 'notes', component: NotesComponent },
  { path: 'notes-search', component: NotesSearchComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }