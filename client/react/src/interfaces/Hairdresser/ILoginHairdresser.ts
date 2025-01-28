export interface ILoginHairdresser {
  username: string;
  password: string;
}
export interface ILoginHairdresserResponse {
  login: boolean;
  hairdresser: {
    id: number;
    name: string;
    img: string;
    price: number;
  };
}
