// eslint-disable-next-line import/no-extraneous-dependencies
import AWS from 'aws-sdk';
// eslint-disable-next-line import/no-extraneous-dependencies
import multer from 'multer';
// eslint-disable-next-line import/no-extraneous-dependencies
import multerS3 from 'multer-s3';

const s3 = new AWS.S3();

const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'your-bucket-name',
    acl: 'public-read', // This will make files publicly available
    metadata(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key(req, file, cb) {
      cb(null, new Date().toISOString() + file.originalname);
    },
  }),
  limits: {
    fileSize: 1024 * 1024 * 5, // limits file size to 5MB
  },
  // eslint-disable-next-line no-undef
  fileFilter,
});

export default upload;
