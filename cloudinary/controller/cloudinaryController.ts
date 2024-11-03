import { Request, Response } from "express";
import { v2 as cloudinary } from 'cloudinary';
import multer from "multer"

const upload = multer({ storage: multer.memoryStorage() });

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
}); 

class CloudinaryController {
    async uploadImage(req: Request, res: Response) {
        const data = req.file
        
        const buffer = await data?.buffer
        const response = await new Promise((resolve, reject) =>{
            cloudinary.uploader.upload_stream({}, (err, result) => {
                if(err) {
                    reject(err)
                }
                resolve(result);
            })
            .end(buffer)
        })
        return res.status(200).json({message: 'Imagen subida correctamente', url: response});
    }
}

export const cloudinaryController = new CloudinaryController();
export const uploadMiddleware = upload.single("image");