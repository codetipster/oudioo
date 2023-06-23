const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const multer = require('multer');
const multerS3 = require('multer-s3-v3');

console.log(multerS3);  // Check what is exported from multer-s3-v3

// Create S3 instance
const s3 = new S3Client({ 
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }
});

// Create multer instance
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'oudioo',
    //acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    },
  })
})

module.exports = {
  s3,
  upload
};
