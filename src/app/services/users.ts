import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, shareReplay, tap } from 'rxjs';

export type ReqresUser = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

export type UsersResponse = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: ReqresUser[];
};

export type UserResponse = {
  data: ReqresUser;
};

@Injectable({ providedIn: 'root' })
export class UsersService {
  private http = new HttpClient((null as any));

  // IMPORTANT: Angular DI will replace the fake HttpClient above in runtime
  // (This is only to keep TS happy in some editors if DI isn't resolved).
  // If your editor complains, delete the line above and inject normally as constructor(private http: HttpClient) {}

  private base = 'https://reqres.in/api';

  // If reqres now requires x-api-key for single user endpoints, keep it here:
  // Put your key if you have one; otherwise leave empty.
  private apiKey = 'reqres_edf62570014346bdbea9e8ebef829c27';

  private pageCache = new Map<number, Observable<UsersResponse>>();
  private userCache = new Map<number, Observable<UserResponse>>();

  constructor(realHttp: HttpClient) {
    // swap in the DI http
    (this.http as any) = realHttp;
  }

  private headers(): HttpHeaders | undefined {
    if (!this.apiKey) return undefined;
    return new HttpHeaders({ 'x-api-key': this.apiKey });
  }

  getUsersPage(page: number): Observable<UsersResponse> {
    const cached = this.pageCache.get(page);
    if (cached) {
      console.log(`CACHE HIT → users page ${page}`);
      return cached;
    }

    console.log(`API CALL → users page ${page}`);

    const req$ = this.http
      .get<UsersResponse>(`${this.base}/users?page=${page}`, {
        headers: this.headers(),
      })
      .pipe(
        shareReplay({ bufferSize: 1, refCount: false })
      );

    this.pageCache.set(page, req$);
    return req$;
  }

  getUserById(id: number): Observable<UserResponse> {
    const cached = this.userCache.get(id);
    if (cached) {
      console.log(`CACHE HIT → user id ${id}`);
      return cached;
    }

    console.log(`API CALL → user id ${id}`);

    const req$ = this.http
      .get<UserResponse>(`${this.base}/users/${id}`, {
        headers: this.headers(),
      })
      .pipe(
        shareReplay({ bufferSize: 1, refCount: false })
      );

    this.userCache.set(id, req$);
    return req$;
  }

  // Optional helper if you want to clear cache (not required by quiz)
  clearCache(): void {
    this.pageCache.clear();
    this.userCache.clear();
  }
}
