import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/authGuard/auth.guard';

export const routes: Routes = [
  {
    path: 'signin',
    loadComponent: () =>
      import('./features/auth/components/signin/signin.component').then(
        (com) => com.SigninComponent
      ),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./features/auth/components/signup/signup.component').then(
        (com) => com.SignupComponent
      ),
  },
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then(
        (com) => com.HomeComponent
      ),
      canActivate: [AuthGuard],
  },
];
