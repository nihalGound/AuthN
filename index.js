const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

require("dotenv").config();

app.listen(process.env.PORT,()=>{
    console.log("server started successfully");
})

app.use(express.json());

app.use(cookieParser());

const dbConnect = require("./config/database");
dbConnect();
const authRoutes = require("./routes/authroutes");
app.use("/api/v1",authRoutes);

app.get("/",(req,res)=>{
    res.send("this is our default page");
})
