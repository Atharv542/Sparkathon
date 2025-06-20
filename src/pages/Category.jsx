import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";

const CategoryPage = () => {
  const { type } = useParams();
  const [items, setItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();

  // Initialize quantity for each item
  const initializeQuantities = (products) => {
    const initial = {};
    products.forEach((item) => {
      initial[item.id] = 1;
    });
    setQuantities(initial);
  };

  // Handle quantity increment
  const increaseQty = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] + 1,
    }));
  };

  // Handle quantity decrement
  const decreaseQty = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1,
    }));
  };

  const handleAddToCart = (item) => {
    const qty = quantities[item.id] || 1;
    const cartItem = { ...item, quantity: qty };

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...existingCart, cartItem];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success(`${item.title} (x${qty}) added to cart!`);
  };

  const handlePlaceOrder = (item) => {
    const qty = quantities[item.id] || 1;
    navigate("/place-order", { state: { product: { ...item, quantity: qty } } });
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        let combined = [];

        if (type === "electronics") {
          const [phonesRes, laptopsRes] = await Promise.all([
            fetch("https://dummyjson.com/products/category/smartphones").then((res) => res.json()),
            fetch("https://dummyjson.com/products/category/laptops").then((res) => res.json()),
          ]);
          combined = [...phonesRes.products, ...laptopsRes.products];
        } else if (type === "women") {
          const [dressesRes, shoesRes] = await Promise.all([
            fetch("https://dummyjson.com/products/category/womens-dresses").then((res) => res.json()),
            fetch("https://dummyjson.com/products/category/womens-jewellery").then((res) => res.json()),
          ]);
          combined = [...dressesRes.products, ...shoesRes.products];
        } else if (type === "men") {
          const [shirtsRes, shoesRes] = await Promise.all([
            fetch("https://dummyjson.com/products/category/mens-watches").then((res) => res.json()),
            fetch("https://dummyjson.com/products/category/mens-shoes").then((res) => res.json()),
          ]);
          combined = [...shirtsRes.products, ...shoesRes.products];
        } else {
          const res = await fetch(`https://dummyjson.com/products/category/${type}`);
          const data = await res.json();
          combined = data.products;
        }

        setItems(combined);
        initializeQuantities(combined);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchItems();
  }, [type]);

  return (
    <div className="p-6 min-h-screen bg-gray-300">
      <h2 className="text-3xl font-bold capitalize mb-6 text-center">{type}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-gray-200 border p-4 rounded-xl shadow hover:shadow-md transition duration-300"
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              className="h-40 w-full object-contain rounded-md bg-gray-200 p-2"
            />
            <h3 className="mt-3 text-sm font-semibold">{item.title}</h3>
            <p className="text-green-700 font-bold mb-2">${item.price}</p>

            {/* Quantity Controls */}
            <div className="flex items-center  justify-between mb-3">
              <span className="text-sm font-medium">Quantity:</span>
              <div className="flex px-1 py-1 rounded-lg items-center gap-2">
                <button
                  onClick={() => decreaseQty(item.id)}
                  className="bg-red-500 text-white text-lg px-2 cursor-pointer  rounded"
                >
                  -
                </button>
                <span className="px-2">{quantities[item.id]}</span>
                <button
                  onClick={() => increaseQty(item.id)}
                  className="bg-blue-500 text-white px-2 text-lg cursor-pointer rounded"
                >
                  +
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-row gap-x-2 mt-2">
              <button
                onClick={() => handleAddToCart(item)}
                className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white py-1 px-3 rounded-md text-sm w-1/2"
              >
                Add to Cart
              </button>
              <button
                onClick={() => handlePlaceOrder(item)}
                className="bg-green-600 cursor-pointer hover:bg-green-700 text-white py-1 px-3 rounded-md text-sm w-1/2"
              >
                Place Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;


