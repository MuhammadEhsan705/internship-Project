import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { toast } from "react-hot-toast";

const Booking = () => {
  const { admin, axios, loading, setLoading } = useContext(AppContext);
  const [bookings, setBooking ] = useState([]);
  

  const fetchbookings = async () => {
    try {
      const { data } = await axios.get("/api/booking/bookings");
      console.log("dataa", data);
      
      if (data.success) {
        setBooking(data.bookings)
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }

  }
  useEffect(() => {
    if (admin) {
      fetchbookings();
    }

  }, [])

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      setLoading(true);
      const { data } = await axios.put(`/api/booking/update-status/${bookingId}`, {
        status: newStatus,
      });

      if (data.success) {
        toast.success(data.message);
        fetchbookings();
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
    <div className="py-16 sm:py-20 px-4 sm:px-6">
  <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
    All BOOKINGS
  </h1>

  <div className="border border-gray-300 max-w-5xl mx-auto p-4 sm:p-6 rounded-lg">
    
    {/* Header */}
    <div className="hidden md:grid grid-cols-6 gap-4 font-semibold text-gray-700 mb-4 text-sm">
      <div>Name</div>
      <div>Phone</div>
      <div>Persons</div>
      <div>Date</div>
      <div>Time</div>
      <div>Status</div>
    </div>

    {/* Items */}
    <ul className="space-y-3">
      {bookings.map((item) => (
        <li
          key={item._id}
          className="border rounded-lg p-4 md:p-3"
        >
          <div className="flex flex-col md:grid md:grid-cols-6 md:items-center gap-3 md:gap-4">

            {/* Name */}
            <div className="space-y-1">
              <p className="text-xs text-gray-500 md:hidden">Name</p>
              <p className="font-medium">{item?.name}</p>
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <p className="text-xs text-gray-500 md:hidden">Phone</p>
              <p className="text-gray-600">{item?.phone}</p>
            </div>

            {/* Persons */}
            <div className="space-y-1">
              <p className="text-xs text-gray-500 md:hidden">Persons</p>
              <p className="font-medium">{item?.numberOfPeople}</p>
            </div>

            {/* Date */}
            <div className="space-y-1">
              <p className="text-xs text-gray-500 md:hidden">Date</p>
              <p className="font-medium">
                {new Date(item?.date).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>

            {/* Time */}
            <div className="space-y-1">
              <p className="text-xs text-gray-500 md:hidden">Time</p>
              <p className="font-medium">{item?.time}</p>
            </div>

            {/* Status */}
            <div className="space-y-1">
              <p className="text-xs text-gray-500 md:hidden">Status</p>

              <select
                className="w-full md:w-auto border rounded-md px-3 py-2 text-sm"
                disabled={loading}
                value={item.status}
                onChange={(e) =>
                  handleStatusChange(item._id, e.target.value)
                }
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

          </div>
        </li>
      ))}
    </ul>
  </div>
</div>
  );
}

export default Booking;
