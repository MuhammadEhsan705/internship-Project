import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { toast } from "react-hot-toast";

const Orders = () => {
  const { admin, axios, loading, setLoading } = useContext(AppContext);
  const [orders, setOrders ] = useState([]);
  console.log("orders", orders);

  const fetchorder = async () => {
    try {
      const { data } = await axios.get("/api/order/orders");
      console.log("dataa", data);
      
      if (data.success) {
        setOrders(data.orders)
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }

  }
  useEffect(() => {
    if (admin) {
      fetchorder();
    }

  }, [])

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setLoading(true);
      const { data } = await axios.put(`/api/order/update-status/${orderId}`, {
        status: newStatus,
      });

      if (data.success) {
        toast.success(data.message);
        fetchorder();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="py-24 px-4 sm:px-6">
    <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
      All Orders
    </h1>
  
    <div className="border border-gray-300 max-w-5xl mx-auto p-4 sm:p-6 rounded-lg">
      
      {/* Header */}
      <div className="hidden md:grid grid-cols-5 gap-4 font-semibold text-gray-700 mb-4 text-sm">
        <div>Name</div>
        <div>Address</div>
        <div>Total</div>
        <div>Payment</div>
        <div>Status</div>
      </div>
  
      {/* Orders */}
      <ul className="space-y-4">
        {orders.map((item) => (
          <li key={item._id} className="border rounded-xl p-4 md:p-3">
            
            {/* Top Section */}
            <div className="flex flex-col md:grid md:grid-cols-5 md:items-center gap-3 md:gap-4">
              
              <p className="font-medium">{item?.user?.name}</p>
  
              <p className="text-gray-600 text-sm break-words">
                {item?.address}
              </p>
  
              <p className="font-medium">${item?.totalAmount}</p>
  
              <p className="font-medium">{item?.paymentMethod}</p>
  
              <div>
                <select
                  className="w-full md:w-auto border rounded-md px-3 py-2 text-sm"
                  disabled={loading}
                  value={item.status}
                  onChange={(e) =>
                    handleStatusChange(item._id, e.target.value)
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="Preparing">Preparing</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
  
            </div>
  
            {/* Products */}
            <div className="mt-4 space-y-3">
              {item.items.map((menu, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-gray-50 border rounded-lg p-2 min-w-0"
                >
                  
                  {/* Image */}
                  <img
                    className="w-16 h-16 rounded object-cover flex-shrink-0"
                    src={menu?.menuItem?.image}
                    alt={menu?.menuItem?.name}
                  />
  
                  {/* Text FIXED */}
                  <div className="min-w-0">
                    
                    {/* ✅ FIX: show NAME instead of IMAGE */}
                    <p className="font-semibold text-sm truncate">
                      {menu?.menuItem?.name}
                    </p>
  
                    <p className="text-xs text-gray-600">
                      QTY: {menu?.quantity}
                    </p>
  
                    <p className="text-xs text-gray-600">
                      $ {menu?.menuItem?.price}
                    </p>
  
                  </div>
                </div>
              ))}
            </div>
  
          </li>
        ))}
      </ul>
    </div>
  </div>
  );
}

export default Orders;
