const fs = require('fs');

const dir = './data/';

mkDir = () => {
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
};

rmDir = () => {
    if (fs.existsSync(dir)){
        fs.rmSync(dir, { recursive: true });
    }
};

module.exports = { mkDir, rmDir };
