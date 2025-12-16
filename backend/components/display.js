const express = require('express');
const Display = express.Router();
const path = require("path")
const {carouselItems} = require("../db/mongoose")
const multer =  require("multer")


const diskStorage = multer.diskStorage({
    destination:(req,file,cb)=>cb(null, path.join(__dirname, "../uploads")),
    filename:(req,file,cb)=>cb(null,Date.now() +"_" +file.originalname),
})

const upload = multer({storage:diskStorage})

Display.post("/dis",upload.single("image"),async(req,res)=>{
try{
    const {title,action,crime,thriller,comedy,date,duration,movieType,director,stars,theme} = req.body
    const image = req.file ? req.file.filename : '';
    const carouItem = new carouselItems({title,action,crime,thriller,comedy,date,duration,movieType,director,stars,theme,image})
    await carouItem.save();
    res.status(201).json({message:'successful',carouItem})
}
catch(error){
    res.status(200).json({message:"internal server error"})
}
})

Display.get("/dis",async (req,res)=>{
    const carouItems = await carouselItems.find()
    res.status(200).json({carouItems})
})

Display.delete("/dis/:id",async(req,res)=>{
    const {id} = req.params;

    const deleteCarouselItems =  await carouselItems.findByIdAndDelete(id)
    res.status(200).json({msg:'deleted successfully'})
})

Display.put("/updateCarousel/:id",upload.single("image"),async(req,res)=>{
    try{
        const imagefound = req.file
        if(!imagefound){
            return res.status(404).json({msg:'image file not found'})
        }
        const image = req.file.filename
        const {id} = req.params
        const {title,date,duration,movieType,director,stars, theme} = req.body

        const updateCarousel =  await carouselItems.findByIdAndUpdate(id,{title,date,duration,movieType,director,stars, theme,image},{new:true})
        res.status(200).json({msg:'update successfully',updateCarousel})
    }
    catch(error){
        console.log(error);
        res.status(500).json({msg:'internal server error'})
    }
})


module.exports = Display