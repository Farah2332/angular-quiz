import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';

import { MatProgressBarModule } from '@angular/material/progress-bar';

import { HeaderComponent } from './shared/header/header';
import { LoadingService } from './services/loading';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, HeaderComponent, MatProgressBarModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class AppComponent {
  loading = inject(LoadingService);
}
