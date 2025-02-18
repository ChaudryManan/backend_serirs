import mongoose,{Schema} from "mongoose"
import mongooseAggregatePaginate from "mongoose-paginate-v2"
const videoSchema=new Schema({
videofile:{
      type:String,//cloudnary 
      required:true,
},
thumbnail:{
    type:String, //cloudnary,
    required:true,
},
title:{
    type:String,
    required:true
},
description:{
    type:String,
    required:true
},
duration:{
    type:Number,
    required:true,
},
views:{
    type:Number,
    default:0
},
ispublished:{
    type:Boolean,
    default:true,
},
owner:{
type:Schema.Types.ObjectId,
ref:"User"
}

})
export const Video=mongoose.model("video",videoSchema)