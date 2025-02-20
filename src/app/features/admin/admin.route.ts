import { Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/authGuard/auth.guard';


export const ADMIN_ROUTES: Routes = [
    {
        path: '', 
        loadComponent: () =>
          import('../admin/admin-home/admin-home.component').then(
            (com) => com.AdminHomeComponent
          ),
        canActivate: [AuthGuard], 
        data: { role: 'admin' } 
     },
];