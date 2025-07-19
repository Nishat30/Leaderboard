const cloudinary = require('cloudinary').v2;
    const { CloudinaryStorage } = require('multer-storage-cloudinary');
    const multer = require('multer');

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
    const storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
            folder: 'leaderboard_avatars',
            format: async (req, file) => 'png', 
            public_id: (req, file) => `avatar-${Date.now()}-${file.originalname.split('.')[0]}`, 
            transformation: [{ width: 150, height: 150, crop: 'fill', gravity: 'face' }]
        },
    });

    const upload = multer({ storage: storage });

    module.exports = upload;
    