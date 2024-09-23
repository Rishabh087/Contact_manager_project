import asyncHandler from "express-async-handler";
import Contact from "../models/contactModels.js";
//@desc Get all the contact 
//@route GET/api/contacts
//@access private
const getContacts = asyncHandler( async(req , res) => {
const contacts = await Contact.find({user_id : req.user.id});
res.status(200).json(contacts);   
});
//@desc Create New contact 
//@route POST/api/contacts
//@access private
const createContact = asyncHandler( async(req , res) => { 
    console.log("User request body:" , req.body);
    const {name , email, phone } = req.body ;
    if(!name || !phone || !email){
        res.status(400);
        throw new Error("All fields are mandatory!");
         // this will give error in the  html format not json so we are 
        //going to change it to json formet. for that we are going to use custom middle ware which is going to accepet
        //the response and request and convert them into json formet .
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id,
    });
    
    res.status(201).json(contact);
  
}); 
//@desc update contact 
//@route PUT/api/contacts
//@access private
const updateContact = asyncHandler( async(req , res) => {

    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not Found");
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have the permission to update other user contact!");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true }
    );

   
    res.status(200).json(updatedContact);
}); 


//@desc Get contact 
//@route GET/api/contacts/:id
//@access private
const getContactbyid = asyncHandler( async(req , res) => {

    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not Found");
    }
   
    res.status(200).json(contact);

});

//@desc Delete contact 
//@route Delete/api/contacts/:id
//@access private
const deleteContact = asyncHandler( async(req , res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not Found");
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have the permission to update other user contact!");
    }
 
await Contact.findByIdAndDelete(req.params.id);
 res.status(200).json(contact);

});
   

export { getContacts , createContact , updateContact ,getContactbyid , deleteContact} ;
