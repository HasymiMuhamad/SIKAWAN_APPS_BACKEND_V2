const multer = require('multer'),
  cloudinary = require('cloudinary'),
  cloudinaryStorage = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'sikawan',
  allowedFormats: ['jpg', 'png', 'jpeg'],
  transformation: [{width: 500, height: 500, crop: 'limit'}],
  filename: function(req, file, cb){
    cb(undefined, file.originalname);
  }
});

const upload = multer({ storage: storage});

module.exports = upload;

