import React, { useEffect, useState } from "react";
import {
  FaMapMarkerAlt,
  FaSearch,
  FaShoppingCart,
  FaUser,
  FaHeart,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";
import { signOut } from "firebase/auth";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const Navbar = ({ setIsAuth }) => {
  const [cartCount, setCartCount] = useState(0);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Get logged-in user name
    const user = auth.currentUser;
    if (user) {
      setUserName(user.displayName || user.email.split("@")[0]);
    }

    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(cart.length);
    };

    updateCartCount();
    window.addEventListener("cartUpdated", updateCartCount);
    return () => window.removeEventListener("cartUpdated", updateCartCount);
  }, []);

  const signUserOut = async () => {
    try {
      await signOut(auth);
      cookies.remove("auth-token");
      setIsAuth(false);
      navigate("/signin");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className="bg-[#0053E2] px-6 py-4 shadow-md flex flex-wrap items-center justify-between">
      {/* Left: Logo + Location */}
      <div className="flex items-center gap-4">
        <img
          src="/Logo.png"
          alt="Logo"
          className="h-10 w-auto cursor-pointer"
          onClick={() => navigate("/")}
        />
        <div className="flex items-center text-sm text-white">
          <FaMapMarkerAlt className="mr-1" />
          <span>Deliver to <strong>Your Location</strong></span>
        </div>
      </div>

      {/* Center: Search Bar */}
      <div className="flex-1 max-w-xl mx-4">
        <div className="flex h-12 bg-white rounded-full overflow-hidden shadow-sm border border-gray-300">
          <input
            type="text"
            placeholder="Search everything at Walmart online and in store"
            className="px-4 py-2 w-full text-sm focus:outline-none"
          />
          <button className="bg-blue-600 px-4 text-white flex items-center justify-center">
            <FaSearch />
          </button>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-6 text-white text-sm">
        {/* Reorder */}
        <div className="hidden sm:flex flex-col items-center hover:text-blue-300 cursor-pointer">
          <div className="flex items-center gap-1">
            <FaHeart className="text-lg" />
            <span className="text-lg font-medium">Reorder</span>
          </div>
          <span className="text-xs">My Items</span>
        </div>

        {/* User Name */}
        <div className="flex flex-col items-center">
          <FaUser className="text-xl mb-0.5" />
          <span className="text-xs">{userName || "Guest"}</span>
        </div>

        {/* Sign Out */}
        <button
          onClick={signUserOut}
          className="bg-blue-800 hover:bg-red-600 text-white px-3 py-1 rounded-full text-sm"
        >
          Sign Out
        </button>

        {/* Cart */}
        <div
          onClick={() => navigate("/view-cart")}
          className="relative cursor-pointer flex items-center hover:text-blue-300"
        >
          <FaShoppingCart className="text-xl" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
              {cartCount}
            </span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
