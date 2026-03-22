import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const BookTable = () => {
  const { axios, navigate } = useContext(AppContext);
  const [formData, setFormdata] = useState({
    name: "",
    email: "",
    phone: "",
    numberOfPeople: "",
    date: "",
    time: "",
    note: "",
  });
  const handlechange = (e) => {
    setFormdata({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async (e) => {
    
    e.preventDefault();
    console.log("Form Data being sent:", formData);
    try {
      const { data } = await axios.post("/api/booking/create", formData);
      if (data.success) {
        toast.success(data.message);
        navigate("/my-bookings");
      } else {
        toast.error(data.message);
      }
    } catch (error) {

      console.log(error);
      toast.error("Something went wrong!");
    }
  };
  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-2xl font-semibold text-center mb-6">Booke a Tabel</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-col-1 sm:grid-cols-2 gap-4">
          <input
            required
            type="text"
            name="name"
            value={formData.name}
            onChange={handlechange}
            placeholder="Your Name"
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
          <input
            required
            type="email"
            name="email"
            value={formData.email}
            onChange={handlechange}
            placeholder="Your Email"
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
        </div>
        <div className="grid grid-col-1 sm:grid-cols-2 gap-4">
          <input
            required
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handlechange}
            placeholder="Your Phone"
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
          <input
            required
            type="number"
            name="numberOfPeople"
            value={formData.numberOfPeople}
            onChange={handlechange}
            placeholder="Number of Guest"
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
        </div>
        <div className="grid grid-col-1 sm:grid-cols-2 gap-4">
          <input
            required
            type="date"
            name="date"
            value={formData.date}
            onChange={handlechange}
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
          <input
            required
            type="time"
            name="time"
            value={formData.time}
            onChange={handlechange}
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
        </div>
        <textarea
          name="note"
          value={formData.note}
          onChange={handlechange}
          placeholder="Special Request (Optional)"
          rows="3"
          className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-500 focus:outline-none"
        >
          {" "}
        </textarea>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-600 transition font-medium"
        >
          ConfirmBooking
        </button>
      </form>
    </div>
  );
};

export default BookTable;
