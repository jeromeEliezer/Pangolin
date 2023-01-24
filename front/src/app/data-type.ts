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
  
  export type TUser = {
    username?: string;
    email: string;
    role?: string;
    password: string;
  }