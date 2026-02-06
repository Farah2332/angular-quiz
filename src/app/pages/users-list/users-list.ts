import { Component, signal } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { UsersService, ReqresUser } from '../../services/users';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    AsyncPipe,
    RouterLink,
    MatCardModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './users-list.html',
  styleUrl: './users-list.scss',
})
export class UsersList {
  page = signal(1);
  res$;

  constructor(private users: UsersService) {
    this.res$ = this.users.getUsersPage(this.page());
  }

  onPageChange(e: PageEvent) {
    this.page.set(e.pageIndex + 1);
    this.res$ = this.users.getUsersPage(this.page());
  }

  trackById(_: number, u: ReqresUser) {
    return u.id;
  }
}
