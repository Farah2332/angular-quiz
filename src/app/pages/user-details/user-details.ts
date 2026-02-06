import { Component } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { UsersService } from '../../services/users';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './user-details.html',
  styleUrl: './user-details.scss',
})
export class UserDetails {
  user$;

  constructor(private route: ActivatedRoute, private users: UsersService) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.user$ = this.users.getUserById(id);
  }
}
