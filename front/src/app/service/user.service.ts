import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TLogin, TSignUp, TUser } from '../data-type';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

export const AUTH_DATA = "auth_data";
@Injectable({
  providedIn: 'root'
})

export class UserService {
  private apiUrl = "http://localhost:4000/api/";
  invalidUserAuth = new EventEmitter<boolean>(false);
  private subject = new BehaviorSubject<TUser | null>(null);

  user$: Observable<TUser | null> = this.subject.asObservable();
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;



  constructor(private http: HttpClient, private router: Router) {
    this.isLoggedIn$ = this.user$.pipe(map(user => !!user));
    this.isLoggedOut$ = this.isLoggedIn$.pipe(map(loggedIn => !loggedIn));

    const user = localStorage.getItem(AUTH_DATA);

    if (user) {

      this.subject.next(JSON.parse(user));
    }
  }

  async userSignUp(data: TSignUp): Promise<Observable<any>> {
    return this.http.post(`${this.apiUrl}user/`, { data })
      .pipe(catchError((error: any) => {
        const err = new Error(error);
        return throwError(() => err);
      }));
  }
  // "Des donnés sont erronnées. Veuillez ressayer ulterieurement"
  userLogin(data: TLogin): Observable<TLogin> {
    return this.http.post<TLogin>(`${this.apiUrl}user/login`, { data })
      .pipe(
        tap((user) => this.subject.next(user)),
        shareReplay()
      );
  }
  logout() {
    this.subject.next(null);
    localStorage.removeItem(AUTH_DATA);
  }

  userAuthReload() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/']);
    }
  }

  getUsers(): Observable<TUser[]> {
    return this.http.get<TUser[]>(this.apiUrl + "user/");
  }

}
