import { Component, OnInit } from '@angular/core';
import {UsersService} from '../services/users.service';
import {User} from '../entities/user';

@Component({
  selector: 'app-extended-users',
  templateUrl: './extended-users.component.html',
  styleUrls: ['./extended-users.component.css']
})
export class ExtendedUsersComponent implements OnInit {
  users: User[];

  constructor(private usersService: UsersService) {
  }

  ngOnInit(): void {
    this.usersService.getExtendedUsers().subscribe(u  => this.users = u);
  }


}
