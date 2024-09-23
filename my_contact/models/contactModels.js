//to create a schema model for our contacts 
import mongoose from "mongoose";
// import User from "";

const contactSchema = new mongoose.Schema({
user_id:{
    type: mongoose.Schema.Types.ObjectId ,
    required:true,
    ref:"User"
},
   name :  {
    type : String,
    required : [true , "Please add the contact name "],
    },

    email :  {
        type : String,
        required : [true , "Please add the contact email "],
        },
    
        
        phone :  {
            type : String,
            required : [true , "Please add the contact phone number"],
            },
            
},
{
    timestamp : true ,
}
);

export default mongoose.model("Contact",contactSchema);
