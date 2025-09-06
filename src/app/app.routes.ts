import { Routes } from '@angular/router';
import { authGuard } from './gaurds/auth.guard';

export const routes: Routes = [
  {path: 'home', loadChildren: () => import('./home-page/home.routes').then(m => m.routes), canActivate: [authGuard]},
  {path: 'auth', loadChildren: () => import('./modules/auth/auth.routes').then(m => m.routes)},
  {path: '**', redirectTo: 'auth'},
];
