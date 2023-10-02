const mongoose = require("mongoose");

require("dotenv").config();

const dbConnect = ()=>{ mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser :true,
    useUnifiedTopology: true
})
.then(()=>console.log("connected with database"))
.catch((err)=>{
    console.log("issue in connection with database");
    console.error(err.message);
})}

module.exports = dbConnect;