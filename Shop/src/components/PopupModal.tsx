import { ToastContainer } from "react-toastify";
import * as React from "react";

export const PopupModal = () => {
  return <ToastContainer limit={3} autoClose={1000} pauseOnFocusLoss={false} />;
};