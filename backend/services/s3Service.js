// eslint-disable-next-line import/no-extraneous-dependencies
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
// eslint-disable-next-line import/no-extraneous-dependencies
const multer = require('multer');
const multerS3 = require('multer-s3-v3');

// Create S3 instance
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Create multer instance
const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'oudioo',
    // acl: 'public-read',
    metadata(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key(req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});

async function getPresignedUrl(fileKey) {
  try {
    const command = new GetObjectCommand({
      Bucket: 'oudioo',
      Key: fileKey,
    });

    const url = await getSignedUrl(s3, command, { expiresIn: 900 });
    return url;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {
  s3,
  upload,
  getPresignedUrl,
};
