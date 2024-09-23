 import express from "express" ;
 //imports the express module, which is a popular web application framework for Node.js.
 // It provides a robust set of features to build web and mobile applications.

 const router = express.Router();
// using the express.Router() class to create a modular, mountable route handler

//express.Router() creates a new instance of a router.
//This router instance is a mini Express application, capable of handling routes and middleware.
//It allows you to define routes and middleware in a modular way, separating them from the main application logic.
import  { getContacts  ,  createContact , updateContact ,  getContactbyid , deleteContact } from "../controlers/contactControler.js" ;
import validateToken from "../middlewares/validateTokenHandler.js";

router.use(validateToken);

router.route("/").get(getContacts).post(createContact);


router.route("/:id").get(getContactbyid).put(updateContact).delete(deleteContact);



export default router;
    
    
            

