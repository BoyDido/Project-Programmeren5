import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { UserNotesComponent } from './user-notes/user-notes.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { UserSearchComponent } from './user-search/user-search.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserNotesComponent,
    MessagesComponent,
    DashboardComponent,
    UserSearchComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
