import { createFeatureSelector, createSelector } from "@ngrx/store";
import { StateNameEnum } from "../enum/state-name-enum";
import { AppState } from "./reducer";

const getAppState = createFeatureSelector<AppState>(StateNameEnum.AppState);
const getMainState = createSelector(getAppState, state => state?.main);
export const getUserIsAuth = createSelector(getMainState, state => state?.isAuth);