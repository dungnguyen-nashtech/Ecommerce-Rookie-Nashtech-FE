import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import SignUp from "./pages/Register";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductFilter from "./pages/ProductFilter";
import NotFoundPage from "./components/NotFoundPage.tsx";
import Home from "./pages/Home";
import SignIn from "./pages/Login";
import { MailVerifyCode } from "./pages/Mail";
import { PrivateRoute } from "./components/PrivateRoute.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFoundPage />
  },
  {
    path: "/home",
    element: <Home />,
    errorElement: <NotFoundPage />
  },
  {
    path: "/shop",
    element: <ProductFilter />,
    errorElement: <NotFoundPage />
  },
  {
    path: "/sign-up",
    element: <SignUp />,
    errorElement: <NotFoundPage />
  },
  {
    path: "/sign-in",
    element: <SignIn />,
    errorElement: <NotFoundPage />
  },
  {
    path: "/mail/verify",
    element: (
      <PrivateRoute>
        <MailVerifyCode />
      </PrivateRoute>
    ),
    errorElement: <NotFoundPage />
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
