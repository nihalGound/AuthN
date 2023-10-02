const express = require("express");
const router = express.Router();

const {signUp,login}= require("../controllers/Auth");
const {auth,isStudent,isAdmin} = require("../middleware/auth");

router.post("/signUp",signUp);
router.post("/login",login);

router.get("/test",auth,(req,res)=>{
    res.status(200).json({
        message:"user is authorized",
    });
})

//protected routes
router.get("/student",auth,isStudent,(req,res)=>{
    res.status(200).json({
        message:"Welcome to student protected page",
    });
})

router.get("/admin",auth,isAdmin,(req,res)=>{
    res.status(200).json({
        message:"Welcome to admin protected page",
    });
})

module.exports = router;