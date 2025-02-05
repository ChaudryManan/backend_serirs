import mongoose from "mongoose";
import {DB_NAME} from "./constants.js"; // No curly braces needed for default export
import connectDB from "./db/index.js";
import dotenv  from "dotenv"
dotenv.config({
    path:"./env"
})

connectDB()













// import express from "express"
// const app=express()
// (async ()=>{
//     try{
//       await  mongoose.connect(`${process.env.MONGODB_URI}/${DB_Name}`);
//       app.on("error",(error)=>{
//         console.log("error",error)
//         throw error
//       })
//       app.listen(process.env.PORT,()=>{
//         console.log(`App is running on port ${process.env.PORT}`)
//       })
//     }
//     catch(error){
// console.log(error)
//     }
// })()