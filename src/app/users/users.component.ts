import {Component, OnInit} from '@angular/core';
import {User} from '../entities/user';
import {UsersService} from '../services/users.service';
import {Observable} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users = [new User('Peter', 'peter@gursky.sk', 1),
    new User('Jano', 'janko@jano.sk', 10)];
  selectedUser: User;
  users$: Observable<User[]>;
  errorMessage = '';

  constructor(private usersService: UsersService) {
  }

  ngOnInit(): void {
//    this.users = this.usersService.getUsers();
    this.users$ = this.usersService.getUsers();
    this.usersService.getUsers().subscribe(
      usersFromService => {
        console.log("Prišli dátat zo servera: ", usersFromService);
        this.users = usersFromService;
      },
      error => {
        if (error instanceof HttpErrorResponse) {
          if (error?.status === 0) {
            this.errorMessage = 'Server je nedostupny';
          } else {
            if (error.status >= 400 && error.status < 500) {
              this.errorMessage = JSON.stringify(error);
            } else {
              this.errorMessage = 'Chyba servera' + error.message;
            }
          }
        } else {
          this.errorMessage = 'Chyba programatora :' + JSON.stringify(error);
        }
        console.log('Error from server: ', error);
      },
      () => console.log('Request from server endded')); // subscribe - function which will register that observe function
  }

// tslint:disable-next-line:typedef
  selectUser(user: User) {
    this.selectedUser = user;
  }
}
