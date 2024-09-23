//in order to connect to our mongodb db we need mongoos wich is a object model desing schema 
// for our enteties like contacts and it help us to communicate with our mongo db database 
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config(); 

const connectDb = async() =>{   

    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Datbase connected:" , connect.connection.host , connect.connection.name);
        
    } catch (err) {
        console.log(err);
        process.exit(1);    
    }

};
export default connectDb;