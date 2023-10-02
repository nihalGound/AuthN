const jwt = require("jsonwebtoken");
const { prependOnceListener } = require("../models/userModel");
require("dotenv").config();


const auth = async(req,res,next)=>{
    try{
        console.log("cookie ",req.cookies.token);
        console.log("body ",req.cookies.body);
        console.log("header ",req.header("Authorization"));
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ","");
        if(!token){
            return res.status(401).json({
                message:"token not found"
            });
        }
        //token found now verify token
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET);
        if(!decodedToken){
            return res.status(401).json({
                message:"token does not match"
            });
        }
        req.user = decodedToken;
        next();
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            message:"internal server error",
            error:err.message,
        });
    }
}

const isStudent = async(req,res,next)=>{
    try{
        if(req.user.role !== "Student"){
            return res.status(401).json({
                message:"this is protected route for student"
            });
        }
        next();
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            message:"internal server error",
            error:err.message,
        });
    }
}

const isAdmin = async(req,res,next)=>{
    try{
        if(req.user.role !== "Admin"){
            return res.status(403).json({
                message:"this is protected route for admin"
            });
        }
        next();
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            message:"internal server error",
            error:err.message,
        });
    }
}

module.exports = {auth,isStudent,isAdmin};