const express=require("express")
const router=express.Router()
const Services=require("../models/services");

router.post("/post-services",async(req,res)=>{
    try {
        const newServices=new Services(req.body)
        await newServices.save()
        res.send({
            succes:true,
            message:"Services created succesfull"
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

module.exports=router