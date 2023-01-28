import { Schema, model } from 'mongoose';

import { enumRoles, IUser } from '../../types/interface';


const userSchema = new Schema<IUser>({
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


export default model<IUser>("User", userSchema);

