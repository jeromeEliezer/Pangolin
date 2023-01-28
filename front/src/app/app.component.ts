import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { setIsAuth } from './state/actions';
import { AppState } from './state/reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Pangolin-network';
  constructor(private store: Store<AppState>) {
    this.store.dispatch(setIsAuth({isAuth: true}));
  }

}
