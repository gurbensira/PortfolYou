import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import cloudinary from '../config/cloudinaryConfig.js';

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'portfolyou/projects',
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'],
        transformation: [{ width: 1200, height: 1200, crop: 'limit' }],
    },
});

const uploadImage = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {

        const allowedMimes = [
            'image/jpeg',
            'image/jpg',
            'image/png',
            'image/gif',
            'image/webp',
            'image/svg+xml'
        ];

        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only JPEG, PNG, GIF, WEBP, and SVG are allowed.'));
        }
    }
});


export const uploadSingle = uploadImage.single('image');
export const uploadMultiple = uploadImage.array('images', 5);
export { cloudinary };