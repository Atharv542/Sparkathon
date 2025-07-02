import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./pages/Navbar";
import HomePromos from "./pages/HomePromos";
import CategoryPage from "./pages/Category";
import PlaceOrder from "./pages/PlaceOrder";
import ViewCart from "./pages/View-cart";
import Art from "./pages/Art";
import Sports from "./pages/Sports";
import Baby from "./pages/Baby";
import Clothing from "./pages/Clothing";
import Kitchen from "./pages/Kitchen";
import { Toaster } from "react-hot-toast";
import Signin from "./pages/Signin";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const ProtectedRoute = ({ isAuth, children }) => {
  return isAuth ? children : <Navigate to="/signin" />;
};

function App() {
  const [isAuth, setAuth] = useState(false);
  const authToken = cookies.get("auth-token");

  useEffect(() => {
    if (authToken) setAuth(true);
  }, [authToken]);

  return (
    <Router>
      <Toaster />
      {isAuth && <Navbar setIsAuth={setAuth} />}
      <Routes>
        {/* Signin route is always accessible */}
        <Route
          path="/signin"
          element={
            isAuth ? <Navigate to="/" /> : <Signin setIsAuth={setAuth} />
          }
        />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute isAuth={isAuth}>
              <HomePromos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/category/:type"
          element={
            <ProtectedRoute isAuth={isAuth}>
              <CategoryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/category"
          element={
            <ProtectedRoute isAuth={isAuth}>
              <CategoryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/place-order"
          element={
            <ProtectedRoute isAuth={isAuth}>
              <PlaceOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/view-cart"
          element={
            <ProtectedRoute isAuth={isAuth}>
              <ViewCart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/art"
          element={
            <ProtectedRoute isAuth={isAuth}>
              <Art />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sports"
          element={
            <ProtectedRoute isAuth={isAuth}>
              <Sports />
            </ProtectedRoute>
          }
        />
        <Route
          path="/baby"
          element={
            <ProtectedRoute isAuth={isAuth}>
              <Baby />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clothing"
          element={
            <ProtectedRoute isAuth={isAuth}>
              <Clothing />
            </ProtectedRoute>
          }
        />
        <Route
          path="/kitchen"
          element={
            <ProtectedRoute isAuth={isAuth}>
              <Kitchen />
            </ProtectedRoute>
          }
        />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to={isAuth ? "/" : "/signin"} />} />
      </Routes>
    </Router>
  );
}

export default App;
