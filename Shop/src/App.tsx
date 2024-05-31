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
import { RouterProvider } from "react-router";
import Footer from "./components/Footer";
import Header from "./components/Header";
import React, { ReactNode } from "react";
import SignUp from "./pages/Register";
import SignIn from "./pages/Login";
import { PrivateRoute } from "./components/Common/PrivateRoute.tsx";
import { MailVerifyCode } from "./pages/Mail";

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
      <Layout>
        <Home />
      </Layout>
    ),
    errorElement: <NotFoundPage />
  },
  {
    path: "/test",
    element: (
      <Layout>
        <div style={{ minHeight: "700px" }}>Zoom in Zoom out xem có bị vỡ footer header không</div>
      </Layout>
    ),
    errorElement: <NotFoundPage />
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
        <WishList />
      </Layout>
    ),
    errorElement: <NotFoundPage />
  },
  {
    path: "/info",
    element: (
      <Layout>
        <Info />
      </Layout>
    ),
    errorElement: <NotFoundPage />
  },
  {
    path: "/search",
    element: (
      <Layout>
        <Search />
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
      <Checkout />
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
