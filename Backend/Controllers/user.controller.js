const userModel=require("../Models/user.model.js");
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
require('dotenv').config({
    path:"../config/.env"
})
const registerUsercontroller=async(req,res)=>{
    const {username,email,password}=req.body;
    try {
        const existingUser=await userModel.findOne({email});
        if (existingUser) {
            return res.status(400).json({message:"User already exists"});
        }
        else if (!username || !email || !password) {
            return res.status(400).json({message:"Please fill all the fields"});
        }
        const newUser=new userModel({
            username,
            email,
            password:await bcrypt.hash(password,10)
        })
        await newUser.save();
        return res.status(201).json({message:"User registered successfully"});
    } catch (error) {
        return res.status(500).json({message:"Internal server error"});
    }
}
const loginUsercontroller=async(req,res)=>{
    const {email,password}=req.body;
    try {
        const existingUser=await userModel.findOne({email});
        if (!existingUser) {
            return res.status(400).json({message:"User does not exist"});
        }
        const isPasswordValid=await bcrypt.compare(password,existingUser.password);
        if (!isPasswordValid) {
            return res.status(400).json({message:"Invalid credentials"});
        }
        const token=jwt.sign({id:existingUser._id},process.env.JWT_SECRET,{expiresIn:"1h"});
        return res.status(200).json({message:"User logged in successfully",token});
    } catch (error) {
        return res.status(500).json({message:"Internal server error"});
    }
}
module.exports={registerUsercontroller,loginUsercontroller};