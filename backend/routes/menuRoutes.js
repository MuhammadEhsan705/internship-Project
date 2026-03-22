import express from "express";

import {adminOnly } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.js";
import { addMenuItem, deleteMenuItem, getallmenueitem, updateMenuItem } from "../controllers/menueController.js";


const menuRoutes=express.Router();
 menuRoutes.post("/add",adminOnly,upload.single("image"),addMenuItem)
 menuRoutes.put("/update/:id",adminOnly,upload.single("image"),updateMenuItem)
 menuRoutes.delete("/delete/:id",adminOnly,deleteMenuItem)
 menuRoutes.get("/all",getallmenueitem)



export default menuRoutes;