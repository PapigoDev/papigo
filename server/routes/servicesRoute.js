const express=require("express")
const router=express.Router()
const Services=require("../models/services");
const cloudinary = require("../config/cloudinaryConfig")
const multer = require('multer');
const mongoose = require('mongoose');
router.use(express.json());
const authMiddleWare = require("../authMiddleWare/authMiddleWare.jsx");


router.post("/post-service",authMiddleWare,async(req,res)=>{
    try {
        const newServices=new Services(req.body)
        const savedService =await newServices.save()
        res.send({
            succes:true,
            message:"Services created succesfull",
            data: savedService._id
        })
    } catch (error) {
        res.send({
            succes:false,
            message:error.message,
        })
    }
})
router.get("/get-all-services",async(req,res)=>{
    try {
        const services=await Services.find()
        res.send({
            succes:true,
            message:"Services Fetched successfully",
            data:services
        })
    } catch (error) {
        res.send({
            succes:false,
            message:error.message
        })
    }
})
router.get("/get-all-services-lang-filter",async(req,res)=>{
    let lang = req.query.lang || "en";
    try {
        const services=await Services.find()

        const filteredData = services.map(service => {
            return {
                ...service.toObject(),
                name: service.name[lang],
                specialty: service.specialty[lang],
                address: service.address[lang],
            };
        });
        res.send({
            succes:true,
            message:"Services Fetched successfully",
            data:filteredData
        })
    } catch (error) {
        res.send({
            succes:false,
            message:error.message
        })
    }
})


router.get("/get-current-service-lang-filter", async (req, res) => {
    const lang = req.query.lang || "en";
    const walkerId = req.query.walkerId;

    try {
        const service = await Services.findById(walkerId);

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found",
            });
        }

        const filteredData = {
            ...service.toObject(),
            name: service.name[lang],
            specialty: service.specialty[lang],
            address: service.address[lang],
        };

        res.status(200).json({
            success: true,
            message: "Service Fetched successfully",
            data: filteredData,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});


router.put("/update-service/:id",authMiddleWare, async (req, res) => {
    const serviceId = req.params.id;
    try {
        const updatedService = await Services.findByIdAndUpdate(serviceId,req.body,{ new: true });

      if (!updatedService) {
        return res.status(404).json({
          success: false,
          message: "Service not found",
        });
      }
  
      res.status(200).json({
        success: true,
        message: "Service updated successfully",
        data: updatedService,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  });

  


// ehtiyyat fetch birden lazim olar
router.get("/get-current-service/:id",async(req,res)=>{
    try {
        const service = await Services.findById(req.params.id)
        res.send({
            success: true,
            data:service
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
        const result = await cloudinary.uploader.upload(req.file.path, { folder: "papigo" })
        const productId = req.body.productId
        await Services.findByIdAndUpdate(productId, {
            $set: { image: result.secure_url }
        })
        res.send({
            success: true,
            message: "Image uploaded successfully",
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