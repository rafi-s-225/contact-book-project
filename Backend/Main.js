const express = require("express");
const cors = require("cors");
const connectDB=require("./config/db");
const Contact = require("./Contact");

const app=express();

connectDB();

app.use(cors());
app.use(express.json())
 
//to create contact
app.post("/api/contacts/",async (req,res)=>{
    const contact  = await Contact.create(req.body)
    res.send(contact);
});



//to get all contacts
app.get("/api/contacts/",async (req,res)=>{
    const contacts  = await Contact.find()
    res.send(contacts);
});



//updating contact
app.put("/api/contacts/:id",async (req,res)=>{
  const contact =await Contact.findByIdAndUpdate(req.params.id,req.body,{
    new:true,
});
    res.send(contact);
});



//Deleting contact
app.delete("/api/contacts/:id",async (req,res)=>{
    await Contact.findByIdAndDelete(req.params.id);
    res.send({message:"Deleted"});
})


app.listen(5000,()=>console.log("Server running on port 5000"));

