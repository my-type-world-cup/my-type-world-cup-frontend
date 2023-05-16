import { atom } from "recoil";

export interface User {
  id: number;
  email: string;
  nickname: string;
  providerType: string;
}

export const userState = atom<User | null>({
  key: "userState",
  default: null,
});

export const accessTokenState = atom<string | null>({
  key: "accessTokenState",
  default: null,
});
