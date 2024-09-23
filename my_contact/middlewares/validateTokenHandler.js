import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
//import dotenv from "dotenv";
import Dotenv from "dotenv";
const env = Dotenv.config(); 
//env.config();

const validateToken = asyncHandler(async(req , res , next ) =>{
let token ;
let  authHeader = req.headers.authorization  || req.headers.Authorization;
if(authHeader && authHeader.startsWith("Bearer")){
    token = authHeader.split(" ")[1]; 
    jwt.verify(token , process.env.ACCESS_TOKEN_SECRET, (err , decoded) =>{
        if(err){
            res.status(401);
            throw new  Error("User is not authorized");
        }
     req.user = decoded.user ;
     next();
    });

    if(!token){
        res.status(401);
        throw new Error("User is not autherised ot token is missing ");
    }
}
});

export default validateToken ;