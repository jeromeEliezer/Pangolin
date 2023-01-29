import { createFeatureSelector, createSelector, createReducer, on, Action, ActionReducer, ActionReducerMap } from '@ngrx/store';
import * as fromActions from './actions'


export interface MainState {
    isAuth: boolean;
}

export const mainStateInitial: MainState = {
    isAuth: false
}

const _mainReducer = createReducer(
    mainStateInitial,
    on(fromActions.setIsAuth, (state, { isAuth }): MainState => ({ isAuth })),
)

const mainReducer = (state: MainState | undefined , actions: Action) => {
    return _mainReducer(state, actions);
}

export interface AppState {
    main: MainState;
}

export const appStateInitial : AppState = {
    main: mainStateInitial
}


export const appReducer: ActionReducerMap<AppState> = {
    main: mainReducer
}