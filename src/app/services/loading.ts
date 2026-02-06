import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private pending = signal(0);
  isLoading = () => this.pending() > 0;

  start() {
    this.pending.set(this.pending() + 1);
  }

  stop() {
    this.pending.set(Math.max(0, this.pending() - 1));
  }
}
