import { asyncHandler } from "../utils/asynHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import{ApiError}  from "../utils/ApiError.js"
import { User } from "../models/user.model.js";
import {uploadCloudnary} from "../utils/cloudnary.js"
const registerUser=asyncHandler(async(req,res)=>{
  const {fullName,email, username,password}= req.body
  console.log("email",email)
  console.log(password)
if([email,fullName,username,password].some((field)=>field?.trim()==="")){
throw new ApiError(400,"All fields are required")
}
const existedUser=User.find({
   $or:[{username},{email}]
})   
if(existedUser){
  throw new ApiError(409,"user already exist")
}
const avtarLocalPath=req.files?.avtar[0]?.path
const coverImageLocalPath=req.files?.coverImage[0]?.path;
if(!avtar){
throw new ApiError(400,"Avatar file is required")
}
const avtar=await uploadCloudnary(avtarLocalPath)
const coverImage=await uploadCloudnary(coverImageLocalPath)
if(!avtar){
  throw new ApiError(400,"Avatar file is required")
}
const user=await user.create({
  fullName,
  avtar:avtar.url,
  coverImage:coverImage?.url||"",
  email,
  password,
  username:username.toLowerCase()
})
const createdUser=await user.findById(user._id).select("-password -refreshToken")
if(!createdUser){
  throw new ApiError(500,"something went wrong while registering the user")
}return res.status(201).json(
  new ApiResponse(200,createdUser,"user registerd successfully")
)

})
export {registerUser}
