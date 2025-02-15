import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"


 
    cloudinary.config({ 
        cloud_name: process.env.CLOUDNARY_CLOUD_NAME, 
        api_key:  process.env.CLOUDNARY_API_KEY, 
        api_secret:  process.env.CLOUDNARY_API_SECRET 
    });

    
    const uploadCloudnary=async(localfilepath)=>{
try{
    if (!localfilepath) return null; // Fix condition

    const response = await cloudinary.uploader.upload(localfilepath, {
        resource_type: "auto"
    });
    console.log("Files are uploaded on Cloudinary:", response.url);
        return response;
}
catch(error){
fs.unlink(localfilepath)
return null
}
    }
   export {uploadCloudnary}