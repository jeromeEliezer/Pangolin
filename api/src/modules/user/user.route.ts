import { Router } from 'express';
import * as joi from 'joi';

import { isValid } from '../../utils/isValid';
import * as userController from './user.controller';

 const enumRoles = ["Guerrier","Alchimiste","Sorcier", "Espions", "Enchanteur"];

const userRouter = Router();

userRouter.get('/user/', userController.getUsers);
userRouter.post('/user/',
    isValid({
        body: joi.object({
            email: joi.string().required(),
            username: joi.string().required(),
            password: joi.string().min(8).max(245).required(),
            role: joi.string(),
        }),
    }),
    userController.register);
userRouter.post('/user/login',
    isValid({
        body: joi.object({
            email: joi.string().required(),
            password: joi.string().required(),
        }),
    }),
    userController.login);



export default userRouter;