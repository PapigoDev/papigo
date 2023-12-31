const express=require("express")
const router=express.Router()
const bcrypt = require("bcryptjs")
require('dotenv').config();
const jwt = require("jsonwebtoken");
const User=require("../models/usersModels");
const authMiddleWare = require("../authMiddleWare/authMiddleWare.jsx");

router.post("/register",async(req,res)=>{
    try {
        const user=await User.findOne({email:req.body.email})
        if(user){
            throw new Error("User already exists")
        }

        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(req.body.password,salt)
        req.body.password=hashedPassword

        //save user
        const newUser=new User(req.body)
        await newUser.save()
        res.send({
            succes:true,
            message:"User created succesfull"
        })
    } catch (error) {
        res.send({
            succes:false,
            message:error.message,
        })
    }
})

router.post("/login",async(req,res)=>{
    const user=await User.findOne({email:req.body.email})

    //chech if the user exists
    try {
        if (!user){
            throw new Error("User not found")
        }
          
        //compare password
        const validPassword=await bcrypt.compare(
            req.body.password,
            user.password
        )
        if(!validPassword){
            throw new Error("Invalid password")
        }
        
        if(user.status==="block"){
            throw new Error("User is blocked.Contack to Admin")
        }
        //create and assign token
        const token=jwt.sign({userId:user._id},process.env.jwt_secret,{expiresIn:"1h"})
        
        //send response
        res.send({
            succes:true,
            message:"User login successful",
            data:token
        })
    } catch (error) {
        res.send({
            succes:false,
            message:error.message,
        })
    }
})

router.get("/get-current-user",authMiddleWare,async(req,res)=>{
    try {
        const user=await User.findById(req.body.userId)
        res.send({
            succes:true,
            message:"Fetched successfully",
            data:user
        })
    } catch (error) {
        res.send({
            succes:false,
            message:error.message
        })
    }
})

router.get("/get-all-users",authMiddleWare, async (req, res) => {
    try {
        const user=await User.findById(req.body.userId)
        // Проверяем роль пользователя
        if (user.role !== 'admin') {
            return res.status(403).send({
                success: false,
                message: "У вас нет прав доступа к этому ресурсу."
            });
        }

        const users = await User.find();
        res.send({
            success: true,
            message: "Users Fetched successfully",
            data: users
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        });
    }
});

router.put("/update-user-status/:id",authMiddleWare, async (req, res) => {
    try {
        const{status}=req.body
        await User.findByIdAndUpdate(req.params.id, {status})
        res.send({
            success: true,
            message: "User status update successfully"
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

module.exports=router