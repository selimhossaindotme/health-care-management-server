import multer from 'multer'
import crypto from 'crypto'
import path from 'path'
import { v2 as cloudinary } from 'cloudinary'
import { envVars } from '../../config'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), '/uploads'))
  },
  filename: function (req, file, cb) {
    const randomName = crypto.randomBytes(18).toString('hex')
    cb(null, file.fieldname + '-' + randomName)
  }
})

const upload = multer({ storage: storage })


const uploadToCloudinary = async (file: Express.Multer.File) => {
     // Configuration
    cloudinary.config({ 
        cloud_name: envVars.Cloudinary.cloud_name as string, 
        api_key: envVars.Cloudinary.api_key as string, 
        api_secret: envVars.Cloudinary.api_secret as string
    });
    
    // Upload an image
     const uploadResult = await cloudinary.uploader
       .upload(
        file.path, {
            public_id: file.filename
        }
       )
       .catch((error) => {
           console.log(error);
       });
    
    return uploadResult; 
}

export const fileUploader = {
    upload,
    uploadToCloudinary
}



