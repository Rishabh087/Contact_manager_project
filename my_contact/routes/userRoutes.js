import express from "express";
import {registerUser , loginUser ,currentUser } from "../controlers/usersControler.js";
import validateToken from "../middlewares/validateTokenHandler.js";

const router1 = express.Router();

router1.post("/register" , registerUser);

router1.post("/login" , loginUser);

router1.get("/current" , validateToken , currentUser);

export default router1 ; 