import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

import { UsersService, UsersResponse } from '../../services/users';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './users-list.html',
  styleUrl: './users-list.scss',
  animations: [
    trigger('listIn', [
      transition(':enter', [
        query(
          '.user-card',
          [
            style({ opacity: 0, transform: 'translateY(10px)' }),
            stagger(60, animate('260ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class UsersListComponent {
  page = signal(1);

  res$ = computed(() => this.users.getUsersPage(this.page()));
  constructor(private users: UsersService) {}

  prev() {
    this.page.update((p) => Math.max(1, p - 1));
  }

  next(totalPages: number) {
    this.page.update((p) => Math.min(totalPages, p + 1));
  }

  trackById(_: number, u: any) {
    return u.id;
  }
}
