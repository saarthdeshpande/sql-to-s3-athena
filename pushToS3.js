const s3 = require('./init/s3');
const { rmDir } = require('./directoryFns');
const fs = require('fs');

pushToS3 = async (tables) => {
    for (const table of tables) {
        const fileName = `./data/${table}.json`;
        const fileContent = fs.readFileSync(fileName);

        const params = {
            Key: `${table}/${table}.json`,
            Body: fileContent
        };
        await new Promise((resolve, reject) => {
            s3.upload(params, function(err, data) {
                if (err) {
                    reject(err);
                }
                resolve(console.log(`File uploaded successfully. ${data.Location}`));
            });
        })
    }
    rmDir();
};

module.exports = pushToS3;
