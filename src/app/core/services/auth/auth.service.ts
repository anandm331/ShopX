import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authState = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private router: Router) {
    this.initializeAdminUser();
  }

  private initializeAdminUser(): void {
    const adminUser = {
      username: 'admin@gmail.com',
      password: 'admin123',
      role: 'admin',
    };

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (!users.some((user: any) => user.username === 'admin')) {
      users.push(adminUser);
      localStorage.setItem('users', JSON.stringify(users));
    }
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('authToken');
  }

  signUp(username: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    if (users.some((user: any) => user.username === username)) {
      return false; 
    }

    const newUser = { username, password, role: 'user' }; 
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  }

  signIn(username: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((user: any) => user.username === username && user.password === password);

    if (user) {
      localStorage.setItem('authToken', username);
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      this.authState.next(true);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('loggedInUser');
    this.authState.next(false);
    this.router.navigate(['/signin']);
  }

  getUserRole(): string {
    const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    return user?.role || '';
  }

  isAuthenticated(): Observable<boolean> {
    return this.authState.asObservable();
  }

  isLoggedIn(): boolean {
    return this.authState.value;
  }
}
