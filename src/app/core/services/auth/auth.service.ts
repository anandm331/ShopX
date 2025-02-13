import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authState = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private router: Router) {}

  private hasToken(): boolean {
    return !!localStorage.getItem('authToken');
  }

  signUp(username: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    if (users.some((user: any) => user.username === username)) {
      return false; 
    }

    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  }

  signIn(username: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((user: any) => user.username === username && user.password === password);

    if (user) {
      localStorage.setItem('authToken', username);
      this.authState.next(true);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.authState.next(false);
    this.router.navigate(['/signin']);
  }

  isAuthenticated(): Observable<boolean> {
    return this.authState.asObservable();
  }

  isLoggedIn(): boolean {
    return this.authState.value;
  }
}
