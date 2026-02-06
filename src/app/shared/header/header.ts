import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { UsersService } from '../../services/users';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent {
  private router = inject(Router);
  private users = inject(UsersService);

  searchId = new FormControl<string>('', { nonNullable: true });
  errorMsg = '';

  constructor() {
    // When user types a valid numeric id, fetch + navigate to details
    this.searchId.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter((v) => !!v),
        filter((v) => /^\d+$/.test(v!))
      )
      .subscribe((v) => {
        const id = Number(v);

        this.users.getUserById(id).subscribe({
          next: (res) => {
            // ReqRes single-user response is { data: user }
            const user = (res as any)?.data;
            if (user?.id) {
              this.errorMsg = '';
              this.router.navigate(['/users', user.id]);
            } else {
              this.errorMsg = 'User not found';
            }
          },
          error: () => {
            this.errorMsg = 'User not found';
          },
        });
      });
  }

  clear() {
    // Clear input + error
    this.searchId.setValue('');
    this.errorMsg = '';

    // IMPORTANT: go back to list page
    // If your list route is '/' this is correct:
    this.router.navigate(['/']);
  }
}
