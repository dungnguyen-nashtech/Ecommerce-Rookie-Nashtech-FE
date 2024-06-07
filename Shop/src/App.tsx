import Search from "./pages/Search";
import Home from "./pages/Home";
import { createBrowserRouter } from "react-router-dom";
import NotFoundPage from "./components/Common/NotFoundPage.tsx";
import ProductFilter from "./pages/ProductFilter";
import Cart from "./pages/Cart";
import WishList from "./pages/WishList";
import Info from "./pages/Info";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import { Navigate, RouterProvider } from "react-router";
import Footer from "./components/Footer";
import Header from "./components/Header";
import React, { ReactNode } from "react";
import SignUp from "./pages/Register";
import SignIn from "./pages/Login";
import { PrivateRoute } from "./components/Common/PrivateRoute.tsx";
import { MailVerifyCode } from "./pages/Mail";
import Filter from "./pages/SearchFilter";
import Category from "./pages/SearchCategory";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

const Layout: React.FC<{ children: ReactNode; }> = ({ children }) =>
  (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Navigate to={"/home"} />
    )
  },
  {
    path: "/home",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
    errorElement: <NotFoundPage />
  },
  {
    path: "/sign-in",
    element: (
      <Layout>
        <SignIn />
      </Layout>
    ),
    errorElement: <NotFoundPage />
  },
  {
    path: "/forgot-password",
    element: (
      <Layout>
        <ForgotPassword />
      </Layout>
    ),
    errorElement: <NotFoundPage />
  },
  {
    path: "/reset-password/:code/:email",
    element: (
      <Layout>
        <ResetPassword />
      </Layout>
    ),
    errorElement: <NotFoundPage />
  },
  {
    path: "/sign-up",
    element: (
      <Layout>
        <SignUp />
      </Layout>
    ),
    errorElement: <NotFoundPage />
  },
  {
    path: "/shop",
    element: (
      <Layout>
        <ProductFilter />
      </Layout>
    ),
    errorElement: <NotFoundPage />
  },
  {
    path: "/cart",
    element: (
      <Layout>
        <PrivateRoute>
          <Cart />
        </PrivateRoute>
      </Layout>
    ),
    errorElement: <NotFoundPage />
  },
  {
    path: "/wishlist",
    element: (
      <Layout>
        <PrivateRoute>
          <WishList />
        </PrivateRoute>
      </Layout>
    ),
    errorElement: <NotFoundPage />
  },
  {
    path: "/info",
    element: (
      <Layout>
        <PrivateRoute><Info /></PrivateRoute>

      </Layout>
    ),
    errorElement: <NotFoundPage />
  },
  {
    path: "/search/:productName",
    element: (
      <Layout>
        <Search />
      </Layout>
    ),
    errorElement: <NotFoundPage />
  },
  {
    path: "/filter",
    element: (
      <Layout>
        <Filter />
      </Layout>
    ),
    errorElement: <NotFoundPage />
  },
  {
    path: "/category/:categoryName",
    element: (
      <Layout>
        <Category />
      </Layout>
    ),
    errorElement: <NotFoundPage />
  },
  {
    path: "/product/:id",
    element: (
      <Layout>
        <ProductDetail />
      </Layout>
    ),
    errorElement: <NotFoundPage />
  },
  {
    path: "/mail/verify",
    element: (
      <Layout>
        <MailVerifyCode />
      </Layout>
    ),
    errorElement: <NotFoundPage />
  },
  {
    path: "/checkout",
    element: (
      <PrivateRoute><Checkout /></PrivateRoute>

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
      <RouterProvider router={router} />
    </>
  );
}

export default App;
