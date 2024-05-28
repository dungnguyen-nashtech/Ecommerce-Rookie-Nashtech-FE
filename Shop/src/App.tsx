import Header from "./components/Header";
import Footer from "./components/Footer";
import SignUp from "./components/Register";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "./components/Login";
import ProductFilter from "./components/ProductFilter";
import NotFoundPage from "./components/Common/NotFoundPage.tsx";
import { MailVerifyCode } from "./components/Mail";

const router = createBrowserRouter([
  {
    path: "/shop",
    element: <ProductFilter />,
    errorElement: <NotFoundPage />
  },
  {
    path: "/sign-up",
    element: <SignUp />
  },
  {
    path: "/sign-in",
    element: <SignIn />
  },
  {
    path: "/mail/verify",
    element: <MailVerifyCode />
  },
  {
    path: "/*",
    element: <NotFoundPage />
  }
]);

function App() {

  return (
    <>
      <Header />
      <RouterProvider router={router} />
      <Footer />
    </>
  );
}

export default App;
