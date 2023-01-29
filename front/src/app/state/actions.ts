import { createAction, props } from '@ngrx/store';

export const setIsAuth = createAction('[USER] check user authentication', props<{isAuth : boolean}>());