import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';

import { UsersService } from '../../services/users';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './user-details.html',
  styleUrl: './user-details.scss',
})
export class UserDetailsComponent {
  private route = inject(ActivatedRoute);
  private users = inject(UsersService);

  user$ = this.route.paramMap.pipe(
    switchMap((pm) => this.users.getUserById(Number(pm.get('id'))))
  );
}
