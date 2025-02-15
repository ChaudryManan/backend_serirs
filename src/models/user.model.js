import mongoose,{Schema} from "mongoose"
import jwt from "jsonwebtoken";
const { sign } = jwt;

import bcrypt from "bcrypt"
const UserSchema=new Schema({
userName:{
    type:String,
    required:true,
    unique:true,
    trim:true,
    lowercase:true,
    index:true,
},
email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true
},
fullname:{
    type:String,
    required:true,
    trim:true,
    index:true
},
avtar:{
    type:String, //from cloud url
    required:true,
},
coverimage:{
type:String
},
watchHistory:[{
    type:Schema.Types.ObjectId,
    ref:"Video"
}],
password:{
    type:String,
    required:[true,"passward is required"]
},
refreshToken:{
    type:String
}

},{timestamps:true})

UserSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    
this.password=await bcrypt.hash(this.password,10)
next()
})
UserSchema.methods.isPasswordCorrect= async function(password){
 return await bcrypt.compare(password,this.password)
}
UserSchema.methods.generateAccessToken=function(){
    return jwt.sign(
          { 
           _id:this._id,
           userName:this.user,
           fullname:this.fullname,
           email:this.email
       },
       process.env.ACCESS_TOKEN_SECRET,
       {
           expiresIn:process.env.ACCESS_TOKEN_EXPIRY,
       }
       )
}
UserSchema.method.generateRefreshToken=function(){
    return jwt.sign(
         { 
           _id:this._id,
           userName:this.userName,
           fullname:this.fullname,
           email:this.email
       },
       process.env.REFRESH_TOKEN_SECRET,
       {
           expiresIn:process.env.REFRESH_TOKEN_EXPIRY,
       }
       )
}
export const User=mongoose.model("User",UserSchema)