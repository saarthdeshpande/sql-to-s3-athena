const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET,
    params: { Bucket: process.env.S3_BUCKET},
    region: process.env.S3_REGION
});

module.exports = s3;
