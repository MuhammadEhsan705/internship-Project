import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import {connectDB} from "./config/db.js"
 import  authRoutes from "./routes/authRoutes.js"
 import  categoryRoutes from "./routes/categoryRoutes.js"
 import  cartRoute from "./routes/cartRoutes.js"
 import connectCloudinary from "./config/cloudinary.js";
 import menuRoutes from "./routes/menuRoutes.js";
 import orderRoutes from "./routes/orderRoutes.js";
 import bookingRoutes from "./routes/bookingRoutes.js";
dotenv.config()


const app =express();

// database connection 
connectDB()
connectCloudinary()
//middleware
app.use(express.json());
app.use(
    cors({
      // origin: "https://internship-project-d7ho.vercel.app",
      origin: "http://localhost:5174",
      credentials: true,
    })
  );
app.use(cookieParser());


const PORT=process.env.PORT || 5000;
app.get("/",(req,res)=>{
    res.send("Hello from server")
});
app.use("/api/auth",authRoutes)
app.use("/api/category",categoryRoutes)
app.use("/api/menu",menuRoutes)
app.use("/api/cart",cartRoute)
app.use("/api/order",orderRoutes)
app.use("/api/booking",bookingRoutes)

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})