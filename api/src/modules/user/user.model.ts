import { Schema, model } from 'mongoose';

import { enumRoles, IUser } from '../../types/interface';


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false 
    },
    role: {
        type: String,
        default: "Guerrier",
        enum : enumRoles
    }
});

const User = model<IUser>("User", userSchema);

export default User;

