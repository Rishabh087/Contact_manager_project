import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Dotenv from "dotenv";
const env = Dotenv.config(); 
//@desc Register a  User
//@route GET/api/users/register
//@access public
const registerUser = asyncHandler( async  (req , res) =>{

    const  {username , email , password}  = req.body ;
if(!username || !email || !password){
    res.status(400);
    throw new Error("All fields are mandatory!");
}

const userAvailable = await User.findOne({email});

if(userAvailable){
    res.status(400);
    throw new Error("Already registered! ");
}
//Hash Password 
const  hashedPassword = await bcrypt.hash(password , 10); // here 10 is salt rounds
console.log("Haseded password :" , hashedPassword );

const user =  await User.create({
    username,
    email,
    password : hashedPassword ,
});

if(user){
    res.status(201).json({_id:user.id , email:user.email});
}else { 
    res.status(400);
    throw new Error("User data is not valid!");
}

res.json({message : "Register the user"});
});


//@desc User login
//@route GET/api/user/login
//@access public
const loginUser = asyncHandler( async (req , res) =>{
    const {email, password } =  req.body ;

    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    const user = await User.findOne({email});
//compare  password with hased password 
if(user && (await bcrypt.compare(password , user.password))){
    const accessToken = jwt.sign({
        user:{
            username : user.username , 
            email : user.email,
            id:user.id ,
        },      
    } ,
     process.env.ACCESS_TOKEN_SECRET,
     { expiresIn: "15m" }
    );
    res.status(200).json({accessToken}) ;
}else{
  res.status(400);
  throw new Error("Password is not valid") ;
}

});


//@desc Get Current user Info  
//@route GET/api/users/current
//@access public
const currentUser = asyncHandler( async (req , res) =>{
    res.json(req.user);
});


export {registerUser , loginUser , currentUser}