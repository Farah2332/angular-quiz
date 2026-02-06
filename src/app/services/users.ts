import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay } from 'rxjs';

export type ReqresUser = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

type UsersPageResponse = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: ReqresUser[];
};

type SingleUserResponse = {
  data: ReqresUser;
};

@Injectable({ providedIn: 'root' })
export class UsersService {
private readonly baseUrl = 'https://reqres.in/api';



  private pageCache = new Map<number, Observable<UsersPageResponse>>();
  private userCache = new Map<number, Observable<ReqresUser>>();

  constructor(private http: HttpClient) {}

  getUsersPage(page: number): Observable<UsersPageResponse> {
    const safePage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;

    const cached = this.pageCache.get(safePage);
    if (cached) return cached;

    const req$ = this.http
      .get<UsersPageResponse>(`${this.baseUrl}/users`, { params: { page: safePage } })
      .pipe(shareReplay(1));

    this.pageCache.set(safePage, req$);
    return req$;
  }

  getUserById(id: number): Observable<ReqresUser> {
    const safeId = Number.isFinite(id) && id > 0 ? Math.floor(id) : NaN;

    const cached = this.userCache.get(safeId);
    if (cached) return cached;

    const req$ = this.http.get<SingleUserResponse>(`${this.baseUrl}/users/${safeId}`).pipe(
      map((r) => r.data),
      shareReplay(1)
    );

    this.userCache.set(safeId, req$);
    return req$;
  }
}
