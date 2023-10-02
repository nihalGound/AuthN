const bcryptjs = require("bcryptjs");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signUp = async(req,res)=>{
    try{
        const {firstName,lastName,email,password,role} = req.body;
        const userExist = await userModel.findOne({email});
        if(userExist){
            return res.json({
                message:`${email} already exist`
            });
        }
        let hashPassword;
        try{
            hashPassword = await bcryptjs.hash(password,10);
        }
        catch(err){
            console.error(err);
            res.json({
                message:"cannot hash the password",
                error:err.message,
            });
        }
        const user = await userModel.create({firstName,lastName,email,password:hashPassword,role
        });
        res.status(200).json({
            success:true,
            user:user,
            message:"user created successfully",
        });
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            success:false,
            message:"internal server error",
            error:err.message,
        });
    }
}

exports.login = async(req,res)=>{
    try{
        const {email,password}=req.body;
        let userExist = await userModel.findOne({email});
        if(!userExist){
            return res.status(401).json({
                success:false,
                message:"user is not registered"
            });
        }
        const ispwdMatch = await bcryptjs.compare(password,userExist.password);
        if(!ispwdMatch){
            return res.json({
                message:"please enter correct passsword"
            });
        }
        const payload={
            user:userExist.name,
            email:userExist.email,
            role:userExist.role,
        }
        const token = jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn : "2h",
        });
        userExist = userExist.toObject();
        userExist.token = token;
        userExist.password = undefined;
        // const options = {
        //     expires : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        //     httpOnly : true,
        // }
        // res.cookie("token",token,options).json({
        //     success:true,
        //     token,
        //     userExist,
        //     message:"user logged in successfully"
        // });
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            success:false,
            message:"internal server error",
            error:err.message,
        });
    }
}