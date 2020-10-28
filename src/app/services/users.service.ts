import {Injectable, OnInit} from '@angular/core';
import {User} from '../entities/user';
import {Observable, of, scheduled, Subscriber, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Auth} from '../entities/auth';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private users = [new User('Petra', 'peter@gursky.sk', 12),
    new User('Jana', 'janko@jano.sk', 18)];
  private serverUrl = 'http://localhost:8080/';
  private loggedUserSubscriber: Subscriber<string>;

  get token(): string {
    return localStorage.getItem('token');
  }

  set token(value: string) {
    if (value) {
      localStorage.setItem('token', value);
    } else {
      localStorage.removeItem('token');
    }
  }

  get user(): string {
    return localStorage.getItem('user');
  }

  set user(value: string) {
    this.loggedUserSubscriber.next(value);
    if (value) {
      localStorage.setItem('user', value);
    } else {
      localStorage.removeItem('user');
    }
  }

  constructor(private http: HttpClient) {
  }

  getUserObservable():Observable<string> {
    return new Observable(subscriber => {
      this.loggedUserSubscriber = subscriber;
      subscriber.next(this.user);
    });
  }

  login(auth: Auth): Observable<boolean> {
    return this.http.post(this.serverUrl + 'login', auth, {responseType: 'text'}).pipe(
      map(token => {
        this.token = token;
        this.user = auth.name;
        return true;
      }),
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          this.logout();
          return of(false);
        }
        return throwError(error);
      }),
    );
  }

  logout() {
    this.token = null;
    this.user = null;
  }

  getUsersSynchronne(): User[] {
    return this.users;
  }

  getUsersAsynchronne(): Observable<User[]> {
    return of(this.users);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<Array<any>>(this.serverUrl + 'users').pipe(
      map(usersFromServer => this.mapToUsers(usersFromServer))
    );
  }

  getExtendedUsers(): Observable<User[]> {
    return this.http.get<Array<any>>(this.serverUrl + 'users/' + this.token).pipe(
      map(usersFromServer => this.mapToExtendedUsers(usersFromServer))
    );
  }

  mapToUsers(usersFromServer: Array<any>): User[] {
    return usersFromServer.map(u => new User(u.name, u.email, u.id));
  }

  mapToExtendedUsers(usersFromServer: Array<any>): User[] {
    return usersFromServer.map(u => new User(u.name, u.email, u.id, u.lastLogin, u.active, u.groups));
  }
}
