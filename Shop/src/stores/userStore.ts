import { create, StateCreator } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools, persist } from "zustand/middleware";
import { createSelectors } from "../utils/createSelectors.ts";

type UserInfo = {
  email: string;
  firstName: string;
  lastName: string;
  authorities: string;
};
type TokenInfo = { accessToken: string; refreshToken: string };

type UserStoreState = {
  token: {
    accessToken: string;
    refreshToken: string;
  };
  user: {
    email: string;
    firstName: string;
    lastName: string;
    authorities: string;
  };
  isAuthenticated: boolean;
  addToken: (token: TokenInfo) => void;
  addUserInfoAndLogin: (user: any) => void;
};

const createUserSlice: StateCreator<
  UserStoreState,
  [
    ["zustand/immer", never],
    ["zustand/devtools", unknown],
    ["zustand/persist", unknown]
  ]
> = (set, get) => ({
  token: {
    accessToken: null,
    refreshToken: null
  },
  user: {
    email: null,
    firstName: null,
    lastName: null,
    authorities: null
  },
  isAuthenticated: false,
  addToken: (token) => {
    set((state) => {
      state.token.accessToken = token.accessToken;
      state.token.refreshToken = token.refreshToken;
    });
  },
  addUserInfoAndLogin: (user) => {
    set((state) => {
      state.user.email = user.sub;
      state.user.firstName = user.firstName;
      state.user.lastName = user.lastName;
      state.user.authorities = user.authorities;
      state.isAuthenticated = true;
    });
  }
});

export const useUserStore = createSelectors(
  create<UserStoreState>()(
    immer(
      devtools(
        persist(createUserSlice, {
          name: "user store"
        })
      )
    )
  )
);
