export interface TSignUp {
    username: string;
    email: string;
    password: string;
    role: string;
  }
  export interface TLogin {
    email: string;
    password: string;
  }
  
  export interface TUser {
    [key: string]: any;
    _id?:string;
    username?: string;
    email: string;
    role?: string;
  }