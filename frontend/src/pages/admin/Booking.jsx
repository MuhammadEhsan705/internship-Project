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
    <div className='py-24 px-3 sm:px-6'>
      <h1 className='text-3xl font-bold text-center my-3'>All BOOKINGS</h1>
      <div className='border border-gray-400 max-w-5xl mx-auto p-3 rounded-lg'>
        {/* Header */}
        <div className='hidden md:grid grid-cols-6 font-semibold text-gray-700 mb-4'>
          <div>Name</div>
          <div>Phone</div>
          <div>Persons</div>
          <div>Date</div>
          <div>Time</div>
          <div>Status</div>
         
        </div>
         {/* item */}
         <ul className="space-y-4">
            {bookings.map((item) => (
              <li key={item._id} className='border rounded-lg p-3 md:p-2'>
                <div className='flex flex-col md:grid md:grid-cols-6 md:items-center gap-2 md:gap-0'>
                  <p className='font-medium text-center md:text-left'>{item?.name}</p>
                  <p className='text-gray-600 hidden md:block'>{item?.phone}</p>
                  <p className='font-medium text-center md:text-left'>{item?.numberOfPeople}</p>
                  <p className='font-medium text-center md:text-left'>{new Date(item?.date).toLocaleDateString("en-Us",{
                    day:"2-digit",
                    month:"short",
                    year:"numeric",
                  })}</p>
                  <p className='font-medium text-center md:text-left'>{item?.time}</p>
                  
                  <div className='flex justify-center md:justify-start items-center gap-2 md:gap-5 mt-2 md:mt-0'>
                    <select className='border rounded-md px-3 py-2' disabled={loading} name='status' value={item.status} onChange={(e)=>handleStatusChange(item._id, e.target.value)} >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  
                  </div>
                  

                </div>
                {/* render menu item */}
                
              </li>
            ))}

          </ul>
      </div>
    </div>
  );
}

export default Booking;
