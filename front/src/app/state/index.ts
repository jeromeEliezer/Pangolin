import { createFeatureSelector, createSelector } from "@ngrx/store";
import { StateNameEnum } from "../enum/state-name-enum";
import { AppState } from "./reducer";

const getAppState = createFeatureSelector<AppState>(StateNameEnum.AppState);

export const getUserIsAuth = createSelector(getAppState, state => state.isAuth);