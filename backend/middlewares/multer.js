import AWS from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';

const s3 = new AWS.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'your-bucket-name',
    acl: 'public-read', // This will make files publicly available
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, new Date().toISOString() + file.originalname);
    }
  }),
  limits: {
    fileSize: 1024 * 1024 * 5  // limits file size to 5MB
  },
  fileFilter: fileFilter
});

export default upload;

