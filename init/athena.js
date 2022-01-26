const AWS = require('aws-sdk');

let athena = new AWS.Athena({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET,
    region: process.env.S3_REGION
});

module.exports = athena;
