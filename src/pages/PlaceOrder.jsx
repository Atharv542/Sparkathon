import React, { useState } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase-config"; // adjust path as needed


const PlaceOrder = () => {
  const { state } = useLocation();
  const items = state?.products || [];

  const [paymentMethod, setPaymentMethod] = useState("");
  const [address, setAddress] = useState("");

  const total = items.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  const handleConfirmOrder = async() => {
    // const summary = items.map(item =>
    //   `${item.title} (Qty: ${item.quantity || 1}) - $${(item.price * (item.quantity || 1)).toFixed(2)}`
    // ).join("\n");
    if(!paymentMethod || !address) return;

    try{
      const orderDetails = {
        customer : "Dhruvi",address,paymentMethod,
        status : "Pending",
        type : "Online",
        date : new Date().toISOString(), total,
        products : items.map((item)=> ({
          title : item.title,
          price : item.price,
          quantity : item.quantity || 1,
          dimensions : item.dimensions || "N/A",
        })),
      };
      await addDoc(collection(db,"orders"),orderDetails);
       toast.success(`Congratulations! Your order is confirmed!`);
    }catch(err){
      console.error("Firebase error:" ,err);
      toast.error("Failed to send the order. Try again.");
    }
  };

  if (!items.length) {
    return <div className="min-h-screen flex items-center justify-center text-gray-600 text-xl">No items selected for order.</div>;
  }

  

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h2 className="text-3xl font-bold mb-4">Place Order</h2>

        <div className="grid gap-4 mb-6">
          {items.map((item, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-50 p-4 rounded-md shadow-sm">
              <div className="flex items-center space-x-4">
                <img src={item.thumbnail|| item.image} alt={item.title} className="h-16 w-16 object-contain" />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-600">Qty: {item.quantity || 1}</p>
                </div>
              </div>
              <div className="font-bold text-green-700">
                ${(item.price * (item.quantity || 1)).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t pt-4 mb-4">
          <h4 className="text-xl font-bold">Total: ${total.toFixed(2)}</h4>
        </div>

        {/* Payment Method */}
        <div className="mb-4">
          <h4 className="text-lg font-semibold mb-2">Payment Method</h4>
          {["UPI", "Cash on Delivery", "Credit/Debit Card", "Net Banking"].map(method => (
            <label key={method} className="block mb-1">
              <input
                type="radio"
                name="payment"
                value={method}
                checked={paymentMethod === method}
                onChange={e => setPaymentMethod(e.target.value)}
                className="mr-2"
              />
              {method}
            </label>
          ))}
        </div>

        {/* Address */}
        <div className="mb-4">
          <h4 className="text-lg font-semibold mb-2">Delivery Address</h4>
          <textarea
            rows={1}
            className="w-full resize-none border border-gray-400 rounded-md p-2"
            placeholder="Enter your full address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <button
          disabled={!paymentMethod || !address}
          onClick={handleConfirmOrder}
          className={`mt-4 ${
            paymentMethod && address ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"
          } text-white py-2 px-6 rounded-lg cursor-pointer text-lg font-semibold shadow`}
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default PlaceOrder;