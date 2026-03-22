import express from "express";
import { adminLogin, getProfile,  isAuth,  loginuser, logoutUser, registerUser } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const authRoutes=express.Router();

authRoutes.post("/register",registerUser)
authRoutes.post("/login",loginuser)
authRoutes.post("/admin/login",adminLogin)
authRoutes.post("/logout",logoutUser)
authRoutes.get("/profile",protect,getProfile)
authRoutes.get("/is-auth",protect,isAuth);


export default authRoutes