import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const ViewCart = () => {
  const [cart, setCart] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(stored);
    setSelectedItems(stored.map((_, i) => true)); // default: all checked
  }, []);

  const handleRemove = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);

    const updatedSelection = [...selectedItems];
    updatedSelection.splice(index, 1);
    setSelectedItems(updatedSelection);
  };

  const handleCheckboxChange = (index) => {
    const updated = [...selectedItems];
    updated[index] = !updated[index];
    setSelectedItems(updated);
  };

  const handleOrderAll = () => {
    const itemsToOrder = cart.filter((_, i) => selectedItems[i]);
    if (itemsToOrder.length === 0) return alert("Please select at least one item to order.");

    navigate("/place-order", { state: { products: itemsToOrder } });

    // For multiple orders, ideally navigate to a multi-order page and pass all itemsToOrder
  };

  const total = cart.reduce((acc, item, i) => {
    if (selectedItems[i]) {
      return acc + item.price * (item.quantity || 1);
    }
    return acc;
  }, 0);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-6">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="max-w-5xl mx-auto space-y-6">
          {cart.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-white p-4 rounded-lg shadow relative"
            >
              {/* Remove Button */}
              <button
                onClick={() => handleRemove(index)}
                className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
              >
                <FaTimes />
              </button>

              {/* Item Info */}
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  checked={selectedItems[index] || false}
                  onChange={() => handleCheckboxChange(index)}
                  className="accent-blue-600"
                />
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="h-20 w-20 object-contain"
                />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-500">Qty: {item.quantity || 1}</p>
                </div>
              </div>
              <div className="font-bold text-green-600">
                ${(item.price * (item.quantity || 1)).toFixed(2)}
              </div>
            </div>
          ))}

          <div className="text-right font-bold text-xl text-gray-800">
            Total: ${total.toFixed(2)}
          </div>

          <div className="text-right">
            <button
              onClick={handleOrderAll}
              className="mt-4 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg text-lg font-semibold shadow"
            >
              Order Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewCart;
