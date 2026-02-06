import { Routes } from '@angular/router';
import { UsersList } from './pages/users-list/users-list';
import { UserDetails } from './pages/user-details/user-details';

export const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', component: UsersList },
  { path: 'users/:id', component: UserDetails },
  { path: '**', redirectTo: 'users' },
];
