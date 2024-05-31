import { Navigate } from "react-router";
import { useUserStore } from "../../stores/userStore.ts";

export function PrivateRoute({ children }) {
  const userStore = useUserStore();
  return userStore.isAuthenticated ? children : <Navigate to="/sign-in" />;
}