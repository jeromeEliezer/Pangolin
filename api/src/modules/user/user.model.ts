import { Schema, model } from 'mongoose';

import { IUser } from '../../types/interface';

const enumRoles = ["Guerrier","Alchimiste","Sorcier", "Espions", "Enchanteur"];

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
        required: true,
        enum : enumRoles,
        default: "Guerrier"
    }
});

const User = model<IUser>("User", userSchema);

export default User;

