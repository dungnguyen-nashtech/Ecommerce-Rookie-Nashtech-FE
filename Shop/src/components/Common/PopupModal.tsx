import { ToastContainer } from "react-toastify";

export const PopupModal = () => {
  return <ToastContainer limit={3} autoClose={1000} pauseOnFocusLoss={false} />;
};