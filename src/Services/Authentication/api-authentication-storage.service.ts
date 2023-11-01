import { Injectable } from '@angular/core';

const user_key = 'user';

@Injectable({
  providedIn: 'root',
})
export class ApiAuthenticationStorageService {
  constructor() {}

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveEmail(email: string): void {
    window.sessionStorage.removeItem('email');
    window.sessionStorage.setItem('email', email);
  }

  public getEmail(): any {
    return window.sessionStorage.getItem('email');
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(user_key);
    window.sessionStorage.setItem(user_key, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(user_key);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  public getUserToken(): string {
    const user = this.getUser();
    return user.token;
  }

  public getuserID(): any {
    const user = this.getUser();

    return user.userID;
  }

  public isLoggedIn(): boolean {
    const user = this.getUser();
    return user && user.token;
  }
}
