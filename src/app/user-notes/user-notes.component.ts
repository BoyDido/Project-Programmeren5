import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Location } from '@angular/common';
import { BackendAppService } from '../backend-app.service';
import { Note } from '../notes';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-notes',
  templateUrl: './user-notes.component.html',
  styleUrls: ['./user-notes.component.css']
})

export class UserNotesComponent implements OnInit {
  users: User[] = [];
  user: User;
  note: Note;
  notes: Note[];
  categories: string[] = ['Privé', 'Dringend', 'Common', 'Info'];
  gekozenCategorie: string;
  inputclass: string;
  isShow = true;
  isShowEdit = false;
  editUserInput = true;

  constructor(private route: ActivatedRoute, private backendappService: BackendAppService,
    private location: Location, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUser();
  }

  /** haal user op uit http action */ //werkt
  getUser(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.backendappService.getUser(id).subscribe(user => { this.user = user; console.log(user) });
  }

  goBack(): void {
    this.location.back();
  }

  getUsers(): void {
    this.backendappService.getUsers().subscribe(users => this.users = users);
  }

  EditUser(): void {
    this.isShow = !this.isShow;
    this.isShowEdit = !this.isShowEdit;
    this.editUserInput = !this.editUserInput;
  }

  updateUser(name: string): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.backendappService.updateUser(name, id).subscribe();
    this.isShow = !this.isShow;
    this.isShowEdit = !this.isShowEdit;
    this.editUserInput = !this.editUserInput;
    this.goBack();
    this.getUsers();
  }

  delete(name: string): void {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Remove User',
        message: 'Are you sure, you want to remove user: ' + name
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.backendappService.deleteUser(name).subscribe((result) => {
          console.log(result);
        });
      }; this.goBack(); this.getUsers();
    });
  }

}
