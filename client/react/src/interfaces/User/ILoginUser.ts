export interface ILoginUser {
  username: string;
  password: string;
}
export interface ILoginUserResponse {
  login: boolean;
  user: {
    id: number;
    name: string;
    email: string;
    birthdate: string;
    nDni: number;
  };
}
