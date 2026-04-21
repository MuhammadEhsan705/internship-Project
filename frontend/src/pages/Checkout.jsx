import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Checkout = () => {
  const { axios, totalPrice, navigate } = useContext(AppContext);

  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Pay at Hotel");

  const handleCheckout = async () => {
    if (!address) {
      toast.error("Please enter your address");
      return;
    }

    try {
      const { data } = await axios.post("/api/order/place", {
        address,
        paymentMethod,
      });

      if (data.success) {
        toast.success(data.message);

        
        if (paymentMethod === "Stripe") {
          window.location.href = data.url;
        } 
      
        else {
          navigate("/my-orders");
        }
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className='max-w-5xl mx-auto mt-10 grid grid-cols-2 md:grid-cols-1 gap-8 p-6 bg-white shadow-lg rounded-2xl'>

      {/* Left Side - Address */}
      <div>
        <h2 className='text-2xl font-semibold mb-4 text-gray-800'>
          Delivery Address
        </h2>

        <textarea
          rows={5}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder='Enter your full address'
          className='w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:outline-none resize-none'
        />
      </div>

      {/* Right Side */}
      <div className='flex flex-col justify-between'>
        <div>

          <h2 className='text-2xl font-semibold mb-4 text-gray-800'>
            Order Summary
          </h2>

          <div className='bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4'>
            <p className='flex justify-between text-lg font-medium text-gray-700'>
              <span>Total Amount:</span>
              <span className='text-green-600 font-semibold'>
                ${totalPrice}
              </span>
            </p>
          </div>

          <h3 className='text-lg font-medium mb-2 text-gray-800'>
            Payment Method
          </h3>

          <div className='space-y-3'>

            {/* Pay at Hotel */}
            <label className='flex items-center space-x-3'>
              <input
                type='radio'
                name='payment'
                value='Pay at Hotel'
                checked={paymentMethod === "Pay at Hotel"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>Pay at Hotel</span>
            </label>

            {/* Stripe */}
            <label className='flex items-center space-x-3'>
              <input
                type='radio'
                name='payment'
                value='Stripe'
                checked={paymentMethod === "Stripe"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className='text-green-600 focus:ring-green-500'
              />
              <span>Online Payment (Stripe)</span>
            </label>

          </div>
        </div>

        <button
          onClick={handleCheckout}
          className='mt-6 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-medium cursor-pointer'
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;