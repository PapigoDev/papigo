const express=require("express")
const router=express.Router()
const Walkers=require("../models/walkersModels");
const Details=require("../models/detailsModels");
const cloudinary = require("../config/cloudinaryConfig")
const multer = require('multer');
const mongoose = require('mongoose');
router.use(express.json());
const authMiddleWare = require("../authMiddleWare/authMiddleWare.jsx");


router.post("/post-walker",authMiddleWare,async(req,res)=>{
    try {
        // req.body.image = ["https://res.cloudinary.com/dmrh8jdqv/image/upload/v1696119218/papigo/engqq3qoxlzsbs7oejsv.png"];
        const newWalkers=new Walkers(req.body)
        const savedWalker =await newWalkers.save()
        res.send({
            succes:true,
            message:"Walkers created succesfull",
            data: savedWalker._id
        })
    } catch (error) {
        res.send({
            succes:false,
            message:error.message,
        })
    }
})
router.get("/get-all-walkers",async(req,res)=>{
    try {
        const walkers=await Walkers.find()
        res.send({
            succes:true,
            message:"Walkers Fetched successfully",
            data:walkers
        })
    } catch (error) {
        res.send({
            succes:false,
            message:error.message
        })
    }
})

router.get("/get-all-walkers-lang-filter",async(req,res)=>{
    let lang = req.query.lang || "en";
    try {
        const walkers=await Walkers.find()

        const filteredWalkersData = walkers.map(walker => {
            return {
                ...walker.toObject(),
                name: walker.name[lang],
                specialty: walker.specialty[lang],
                address: walker.address[lang],
            };
        });
        res.send({
            succes:true,
            message:"Walkers Fetched successfully",
            data:filteredWalkersData
        })
    } catch (error) {
        res.send({
            succes:false,
            message:error.message
        })
    }
})
router.get("/get-current-walker-lang-filter", async (req, res) => {
    const lang = req.query.lang || "en";
    const walkerId = req.query.walkerId;

    try {
        const walker = await Walkers.findById(walkerId);

        if (!walker) {
            return res.status(404).json({
                success: false,
                message: "Walker not found",
            });
        }

        const filteredWalkerData = {
            ...walker.toObject(),
            name: walker.name[lang],
            specialty: walker.specialty[lang],
            address: walker.address[lang],
        };

        res.status(200).json({
            success: true,
            message: "Walkers Fetched successfully",
            data: filteredWalkerData,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});


router.put("/update-walker/:id",authMiddleWare, async (req, res) => {
    const walkerId = req.params.id;
    try {
        const updatedWalker = await Walkers.findByIdAndUpdate(walkerId,req.body,{ new: true });

      if (!updatedWalker) {
        return res.status(404).json({
          success: false,
          message: "Walker not found",
        });
      }
  
      res.status(200).json({
        success: true,
        message: "Walker updated successfully",
        data: updatedWalker,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  });
  router.delete("/delete-walker/:id",authMiddleWare, async (req, res) => {
    try {

        const oldImage = await Walkers.findById(req.params.id);
        const oldImageUrl = oldImage.image[0].split("/").slice(-2).join("/").split(".")[0];
        await cloudinary.uploader.destroy(oldImageUrl);


        const oldDetail = await Details.findOne({ walker: req.params.id });
        for (const imageUrl of oldDetail.images) {
            const public_id = imageUrl.split("/").slice(-2).join("/").split(".")[0];
            await cloudinary.uploader.destroy(public_id);
        }



        await Walkers.findByIdAndDelete(req.params.id)
        res.send({
            success: true,
            message: "Walker delete successfully"
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

  


// ehtiyyat fetch birden lazim olar
router.get("/get-current-walker/:id",async(req,res)=>{
    try {
        const walker = await Walkers.findById(req.params.id)
        res.send({
            success: true,
            data:walker
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

//get image from pc
const storage = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname)
    }
});

router.post("/upload-image-to-walker", multer({ storage: storage }).single("file"), async (req, res) => {
    try {
        //upload image to cloudinary

        const walkerId = req.body.productId
        console.log(walkerId)
        
        const oldImage = await Walkers.findById(walkerId);
        const imageArray = oldImage.image;

        if (Array.isArray(imageArray) && imageArray.length > 0 && imageArray[0]!=="") {   
        const oldImageUrl = imageArray[0].split("/").slice(-2).join("/").split(".")[0];
        await cloudinary.uploader.destroy(oldImageUrl);
        }
        
        console.log("не popal")
        const result = await cloudinary.uploader.upload(req.file.path, { folder: "papigo" })
        await Walkers.findByIdAndUpdate(walkerId, {
            $set: { image: result.secure_url }
        })
        res.send({
            success: true,
            message: "Walker image uploaded successfully",
            data: result.secure_url
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        })
    }
})


module.exports=router