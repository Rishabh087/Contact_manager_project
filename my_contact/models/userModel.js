import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type : String ,
        required : [true  , "Please add the user name"],
    } ,

    email:{
        type : String ,
        required : [true , "Please add the user email address"] ,
        unique : [true , "Email address is already taken"],

    }, 
    password:{
        type: String,
        required : [true , "Please enter the user password"],
    },
},{
timestamp : true ,
});


export default mongoose.model("User", userSchema);