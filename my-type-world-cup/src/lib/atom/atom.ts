import { AtomEffect, atom } from "recoil";

const sessionStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key: string) =>
  ({ setSelf, onSet }) => {
    if (typeof window !== "undefined") {
      const savedValue = sessionStorage.getItem(key);
      if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
      }

      onSet((newValue, _, isReset) => {
        isReset
          ? sessionStorage.removeItem(key)
          : sessionStorage.setItem(key, JSON.stringify(newValue));
      });
    }
  };

export interface User {
  id: number;
  email: string;
  nickname: string;
  providerType: string;
}

export const userState = atom<User | null>({
  key: "userState",
  default: null,
  effects: [sessionStorageEffect("user_data")],
});

export const accessTokenState = atom<string | null>({
  key: "accessTokenState",
  default: null,
  effects: [sessionStorageEffect("access_token")],
});
