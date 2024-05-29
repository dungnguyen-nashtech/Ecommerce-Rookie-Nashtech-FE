import { Navigate } from "react-router";
import useRetrieveLocalStorage from "../utils/useRetrieveLocalStorage.ts";
import { UserStoreState } from "../stores/userStore.ts";
import { LOCALSTORAGE_USER_STORE } from "../utils/constant.ts";

export function PrivateRoute({ children }) {
  const { state } = useRetrieveLocalStorage<UserStoreState>(LOCALSTORAGE_USER_STORE);
  return state.isAuthenticated ? children : <Navigate to="/sign-in" />;
}