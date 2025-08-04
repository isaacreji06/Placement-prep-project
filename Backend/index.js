const express=require('express');
const app=express();
const mongoose=require('mongoose');
const userSchema=require('./Models/user.model.js');
app.use(express.json());
const cors=require('cors');
app.use(cors());
require('dotenv').config({
    path:"./config/.env"
});
const MONGO_DB_URL=process.env.MONGO_DB_URL;
mongoose.connect(MONGO_DB_URL)
.then(()=>{
    console.log("Connected to MongoDB");
})
.catch((error) => {
    console.error("MongoDB connection error:", error);
});

const PORT=process.env.PORT;
app.get("/test",(req,res)=>{
    res.send("Server is running")
})
app.listen(PORT,()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
})