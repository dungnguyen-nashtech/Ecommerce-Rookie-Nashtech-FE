import { create, StateCreator } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools, persist } from "zustand/middleware";
import { createSelectors } from "../utils/createSelectors.ts";
import { LOCALSTORAGE_USER_STORE } from "../utils/constants.ts";

type UserInfo = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  authorities: string;
};
type TokenInfo = { accessToken: string; refreshToken: string };

export type UserStoreState = {
  token: {
    accessToken: string;
    refreshToken: string;
  };
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    authorities: string;
  };
  isAuthenticated: boolean;
  addToken: (token: TokenInfo) => void;
  addUserInfoAndLogin: (user: any) => void;
  removeUser: () => void;  // Add the removeUser function definition
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
    id: null,
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
    console.log(user);
    set((state) => {
      state.user.id = user.userId;
      state.user.email = user.sub;
      state.user.firstName = user.firstName;
      state.user.lastName = user.lastName;
      state.user.authorities = user.authorities;
      state.isAuthenticated = true;
    });
  },
  removeUser: () => {
    set((state) => {
      state.token.accessToken = null;
      state.token.refreshToken = null;
      state.user.id = null;
      state.user.email = null;
      state.user.firstName = null;
      state.user.lastName = null;
      state.user.authorities = null;
      state.isAuthenticated = false;
    });
  }
});

export const useUserStore = createSelectors(
  create<UserStoreState>()(
    immer(
      devtools(
        persist(createUserSlice, {
          name: LOCALSTORAGE_USER_STORE
        })
      )
    )
  )
);
