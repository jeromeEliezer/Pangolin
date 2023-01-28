import { createAction, props } from '@ngrx/store';
import { TUser } from '../data-type';

export const setIsAuth = createAction('[USER] check user authentication', props<{isAuth : boolean}>());