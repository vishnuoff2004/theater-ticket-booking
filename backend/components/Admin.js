const express = require("express");
const adminRouter = express.Router();
const {Admin} = require("../db/mongoose");
const bcrypt = require("bcrypt")


adminRouter.post("/login",async (req,res)=>{
    try{
        const {name,password} = req.body;
        if(!name || !password){
           return res.status(400).json({message:'fill out all the feilds'})
        }

        const existAdmin = await Admin.findOne({name})

        if(!existAdmin){
            return res.status(404).json({message:"admin not found"})
        }

        if(! await(bcrypt.compare(password,existAdmin.password))){
            return res.status(400).json({message:"password doesn't match"})
        }

        res.status(200).json({message:"Admin login successful"})
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"internal server"})
    }
})

adminRouter.get("/admindetails", async(req,res)=>{
    try{
        const adminDetail = await Admin.find();
        res.status(200).json({msg:'admin fetched successfully',adminDetail})
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"internal server"})
    }
})

module.exports = adminRouter