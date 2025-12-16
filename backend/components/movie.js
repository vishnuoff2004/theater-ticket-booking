const {Movies} = require("../db/mongoose")
const express = require("express")
const movieRouter = express.Router()
const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination:(req,file,cb)=>cb(null,path.join(__dirname,"../movieImages")),
    filename:(req,file,cb)=>cb(null,Date.now()+"_"+file.originalname)
})

const upload = multer({storage})

movieRouter.post("/movie",upload.single("image") ,async(req,res)=>{
    try{
        const {movie_name,genre,language,duration} = req.body
        const imagePath  = req.file? req.file.filename :''

        if(!movie_name ||!genre || !language || !duration || !imagePath){
            return res.status(400).json({message:'fill all the feilds'})
        }

        const movie = new Movies({movie_name,genre,language,duration,image:imagePath})
        await movie.save();
        res.status(200).json({message:'successful'})
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"internal server error"})
    }
})

movieRouter.get("/movie",async(req,res)=>{
    try{
        const movie = await Movies.find();
        res.status(200).json({message:'movies end successfully',movie})
    }
    catch(error){
        console.log(error)
    }
})

movieRouter.get("/fetch",async(req,res)=>{
    try{
        const movie = await Movies.find();
        res.status(200).json({message:'movies end successfully',movie})
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:'internal server error'})
    }
})

movieRouter.put("/movie/:id",async(req,res)=>{
    try{
        const {like} = req.body
        const {id} = req.params

        const newLike = like+1

        const updateMovie = await Movies.findByIdAndUpdate({_id:id},{like:newLike},{new:true})
        res.status(200).json({message:"liked successFull",updateMovie})
    }
    catch(error){
        console.log(error)     
    }
})

movieRouter.put("/rating/:id",async(req,res)=>{
try{
   const {inpRating} = req.body;
   const {id} = req.params
   const movieRating = await Movies.findOne({_id:id})
   const ratingCount = Number(movieRating.ratingCount)+1
   const totalPointRating = (Number(movieRating.totRating) + Number(inpRating))  

   const  updatedRating  = (totalPointRating / ratingCount).toFixed(1)

    const updatedMovie = await Movies.findByIdAndUpdate(id,{ratings:updatedRating,totRating:totalPointRating,ratingCount:ratingCount},{new:true}) 

    res.status(200).json({message:"rated value",updatedMovie})
}
catch(error){
 console.log(error)
}
})

module.exports = movieRouter