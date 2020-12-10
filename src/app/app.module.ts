import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { UserNotesComponent } from './user-notes/user-notes.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { UserSearchComponent } from './user-search/user-search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MaterialModule } from './material.module';
import { NotesComponent } from './notes/notes.component';
import { MatSelectModule } from '@angular/material/select'; 
import { MatInputModule  } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatRadioModule } from '@angular/material/radio';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component'; 
import { MatDialogModule } from '@angular/material/dialog';
import { NotesSearchComponent } from './notes-search/notes-search.component';



@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserNotesComponent,
    MessagesComponent,
    DashboardComponent,
    UserSearchComponent,
    NavBarComponent,
    NotesComponent,
    ConfirmDialogComponent,
    NotesSearchComponent,
  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MaterialModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatRadioModule,
    MatDialogModule,
    ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmDialogComponent
  ],

})
export class AppModule { }
