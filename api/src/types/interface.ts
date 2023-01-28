export interface IUser {
  email:string;
  username: string;
  password: string;
  role?: string;
  }

  export type TUser = {
    username: string;
    email:string;
    role:string;
  }



export const enumRoles = ["Guerrier","Alchimiste","Sorcier", "Espions", "Enchanteur"];
