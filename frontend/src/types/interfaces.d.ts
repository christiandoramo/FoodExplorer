export declare global {
  interface User {
    id: string;
    name: string;
    email: string;
    role: string;
  }
  interface UserRegisterData {
    name: string;
    email: string;
    password: string;
  }
  interface UserLoginData {
    email: string;
    password: string;
  }
}
