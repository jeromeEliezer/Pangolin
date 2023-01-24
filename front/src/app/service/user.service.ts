import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TLogin, TSignUp, TUser } from '../data-type';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

const apiUrl = "http://localhost:4000/api/";
@Injectable({
  providedIn: 'root'
})

export class UserService {
  invalidUserAuth = new EventEmitter<boolean>(false);
  private subject = new BehaviorSubject<TUser | null>(null);

  user$: Observable<TUser | null> = this.subject.asObservable();
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;



  constructor(private http: HttpClient, private router: Router) {
    this.isLoggedIn$ = this.user$.pipe(map(user => !!user));
    this.isLoggedOut$ = this.isLoggedIn$.pipe(map(loggedIn => !loggedIn));

  }

  async userSignUp(data: TSignUp): Promise<Observable<any>> {
    return this.http.post(`${apiUrl}user/`, { data });
  }
  userLogin(data: TLogin): Observable<TLogin> {
    return this.http.post<TLogin>(`${apiUrl}user/login`, { data })
      .pipe(
        tap((user) => this.subject.next(user)),
        shareReplay()
      );
  }
  logout() {
    this.subject.next(null);
  }

  userAuthReload() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/']);
    }
  }


}
