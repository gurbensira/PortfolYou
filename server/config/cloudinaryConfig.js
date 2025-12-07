import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const config = cloudinary.config();
console.log('🔧 Cloudinary Configuration:');
console.log('  Cloud Name:', config.cloud_name || '❌ Missing');
console.log('  API Key:', config.api_key ? '✅ Set' : '❌ Missing');
console.log('  API Secret:', config.api_secret ? '✅ Set' : '❌ Missing');

if (!config.cloud_name || !config.api_key || !config.api_secret) {
    throw new Error('❌ Cloudinary credentials are missing! Check your env file.');
}

export default cloudinary;