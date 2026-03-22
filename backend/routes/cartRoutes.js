import express from "express";

import {adminOnly,protect } from "../middlewares/authMiddleware.js";

import { addToCart, getCart, removefromcart } from "../controllers/cartController.js";


const cartRoutes=express.Router();
 
cartRoutes.post("/add",protect,addToCart);
cartRoutes.get("/get",protect,getCart);
cartRoutes.delete("/remove/:menuId",protect,removefromcart);


export default cartRoutes;