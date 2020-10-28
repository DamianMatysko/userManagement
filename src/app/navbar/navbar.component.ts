import {Component, OnInit} from '@angular/core';
import {UsersService} from '../services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loggedUser: string = '';


  constructor(private usersService: UsersService) {
  }

  ngOnInit(): void {
    this.usersService.getUserObservable().subscribe(
      userName => this.loggedUser = userName
  );
  }

  logout() {
    this.usersService.logout();
  }
}
