import express from "express";
import connectDb from "./config/dbconnection.js";
import dotenv from "dotenv";
import router from "./routes/contactRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import router1 from "./routes/userRoutes.js";
connectDb();

dotenv.config(); 

const app = express();
const port = process.env.PORT ||5000; // this is static port  but in this project we are going to create a environmental variable file
//define the port

app.use(express.json()); 
// using middle ware which provide body parser that help us to pass the data stream 
//recieved from user to pass to the server .

app.use("/api/contacts" , router);
app.use("/api/users" , router1);
app.use(errorHandler);
app.listen(port , ()=>{
    console.log(`Server is running on port ${port}`);  
});

//port defined either by an environment variable or defaulting to 3000.


// we are using controller folder whic includes all the logic for the request response and also it is 
//going to connect with our database.