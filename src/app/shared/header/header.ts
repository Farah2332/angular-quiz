import { Component, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { catchError, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

import { UsersService, ReqresUser } from '../../services/users';
import { LoadingService } from '../../services/loading';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    MatOptionModule,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  search = new FormControl<string>('', { nonNullable: true });
  foundUser = signal<ReqresUser | null>(null);
  notFound = signal(false);

  constructor(
    public loading: LoadingService,
    private users: UsersService,
    private router: Router
  ) {
    this.search.valueChanges
      .pipe(
        debounceTime(250),
        distinctUntilChanged(),
        switchMap((value) => {
          const id = Number(value);
          this.notFound.set(false);
          this.foundUser.set(null);

          if (!value || !Number.isFinite(id) || id <= 0) return of(null);

          return this.users.getUserById(id).pipe(
            catchError(() => {
              this.notFound.set(true);
              return of(null);
            })
          );
        })
      )
      .subscribe((user) => {
        if (user) this.foundUser.set(user);
      });
  }

  goToUser(id: number) {
    this.router.navigate(['/users', id]);
    this.search.setValue('');
    this.foundUser.set(null);
    this.notFound.set(false);
  }
}
