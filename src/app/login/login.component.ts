import {Component, OnInit} from '@angular/core';
import {Auth} from '../entities/auth';
import {UsersService} from '../services/users.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  auth = new Auth();
  errorMessage = '';

  constructor(private userService: UsersService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  get printAuth() {
    return JSON.stringify(this.auth);
  }

  changeName(event) {
    this.auth.name = event.target.value;
  }

  onSubmit() {
    this.userService.login(this.auth).subscribe(success => {
      if (success) {
        console.log('Login successful');
        this.router.navigateByUrl('/extended-users');
      } else {
        this.errorMessage = 'Zly login alebo heslo';
        setTimeout(() => this.errorMessage = '', 3000);
      }
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
      });

  }
}
