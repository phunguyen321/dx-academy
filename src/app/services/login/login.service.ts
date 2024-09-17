import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../model/user';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  readonly API = 'http://localhost:4000/user-info';

  getUserInfo() {
    return this.http.get<User[]>(this.API);
  }

  saveUserInfo(user: User) {
    return this.http.post<User>(this.API, user);
  }
}
