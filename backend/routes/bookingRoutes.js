import express from "express";

import {adminOnly,protect } from "../middlewares/authMiddleware.js";
import { creatBooking, getAllBookings, getuserbookings, updateBookingStatus } from "../controllers/bookingcontroller.js";



const bookingRoutes=express.Router();
 
bookingRoutes.post("/create",protect,creatBooking);
bookingRoutes.get("/my-bookings",protect,getuserbookings);
bookingRoutes.get("/bookings", protect,adminOnly,getAllBookings);
bookingRoutes.put("/update-status/:bookingId",protect,adminOnly,updateBookingStatus);


export default bookingRoutes;