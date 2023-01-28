import { createFeatureSelector, createSelector, createReducer, on, Action } from '@ngrx/store';
import * as fromActions from './actions' 
export interface AppState {
    isAuth: boolean;
}


const AppStateInitial: AppState = {
    isAuth: false
}

const reducer = createReducer(
    AppStateInitial,
    on(fromActions.setIsAuth, (state, { isAuth }): AppState => ({ isAuth })),
)

export function appReducer(state: AppState, action: Action) {
    return reducer(state, action);
  }