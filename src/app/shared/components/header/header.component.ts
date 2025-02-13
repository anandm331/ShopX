import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
 cartVisible : boolean = true;
 cart= signal("Cart");

 router = inject(Router);
 authService = inject(AuthService);
 
 isAuthPage(): boolean {
  return this.router.url === '/signin' || this.router.url === '/signup';
}

logOut(): void {
  this.authService.logout();
}

}
