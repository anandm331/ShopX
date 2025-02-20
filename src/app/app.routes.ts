import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/authGuard/auth.guard';
import { ADMIN_ROUTES } from './features/admin/admin.route';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full',
  },
  {
    path: 'admin',
    children: ADMIN_ROUTES, 
    canActivate: [AuthGuard], 
    data: { role: 'admin' }
  },
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
    path: 'home', 
    loadComponent: () =>
      import('./features/home/home.component').then(
        (com) => com.HomeComponent
      ),
    canActivate: [AuthGuard], 
    data: { role: 'user' } 
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./features/cart/cart.component').then(
        (com) => com.CartComponent
      ),
      canActivate: [AuthGuard], 
      data: { role: 'user' } 
  },
  {
    path: 'product/:id',
    loadComponent: () =>
      import('./features/product-details/product-details.component').then(
        (com) => com.ProductDetailsComponent
      ),
      canActivate: [AuthGuard],
      data: {role: 'user'}
  },
  
  {
    path: '**', 
    redirectTo: 'signin',
  },
];
