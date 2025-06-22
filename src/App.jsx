import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './pages/Navbar';
import HomePromos from './pages/Home';
import CategoryPage from './pages/Category';
import PlaceOrder from './pages/PlaceOrder';
import ViewCart from './pages/View-cart';
import { Toaster } from 'react-hot-toast';
import Signin from './pages/Signin';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

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
        {!isAuth ? (
          <>
            <Route path="/signin" element={<Signin setIsAuth={setAuth} />} />
            <Route path="*" element={<Navigate to="/signin" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<HomePromos />} />
            <Route path="/category/:type" element={<CategoryPage />} />
            <Route path="/place-order" element={<PlaceOrder />} />
            <Route path="/view-cart" element={<ViewCart />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
