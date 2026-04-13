import Booking from "../models/bookingModel.js";


export const creatBooking=async(req,res)=>{
    try {
        const {id}=req.user;
        const{name,phone,numberOfPeople,date,time,note}=req.body;
        if(!name || !phone || !numberOfPeople ||!date ||!time ){
               return res.status(400).json({message:"All fields are required", success:false});
        }

        // check for overlapping booking
        const existingBooking=await Booking.findOne({
            date,time,
            status:{$ne:"Cancelled"},
            
        });
        if(existingBooking)
            return res 
         .status(400)
         .json({message:"This time slot is already booked",success:false});



        const booking=await Booking.create({
            user:id,
            name,phone,numberOfPeople,date,time,note
        });
        res.status(201)
        .json({
            success:true, message:"Table booked successfully",booking
        });

    } catch (error) {

        console.log(error)
      return res.json({message:"LOGIN or Register",success:false})
        
    }
}


// getuserbookings see
export const getuserbookings=async(req,res)=>{
    try {
        const {id}=req.user;
        const bookings=await Booking.find({user:id}).sort({
            createdAt:-1,
        });
        res.status(200).json({bookings, success:true});
    } catch (error) {
        
        console.log(error)
      return res.json({message:"Internal server error",success:false})
    }
}
//   get admin see booking

export const getAllBookings=async(req,res)=>{
    try {
        const bookings=await Booking.find().populate("user","name email")
        res.status(200).json({bookings ,success:true});
    } catch (error) {
        console.log(error)
        return res.json({message:"Internal server error",success:false})
        
    }
}

// change statuse booking 
export const updateBookingStatus = async (req, res) => {
    try {
      const { bookingId } = req.params;
  
      const { status } = req.body;
      const booking = await Booking.findById(bookingId);
      if (!booking) return res.status(404).json({ message: "Booking not found" });
      booking.status = status;
      await booking.save();
      res
        .status(200)
        .json({ success: true, message: "Booking status updated", booking });
    } catch (error) {
      console.log(error);
      return res.json({ message: "Internal server error", success: false });
    }
  };