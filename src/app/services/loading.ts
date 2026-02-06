import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private pending = signal(0);

  /** true if at least 1 request is in progress */
  readonly isLoading = () => this.pending() > 0;

  start() {
    this.pending.update((n) => n + 1);
  }

  stop() {
    this.pending.update((n) => Math.max(0, n - 1));
  }

  reset() {
    this.pending.set(0);
  }
}
