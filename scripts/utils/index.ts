const fs = require('fs');
const { promisify } = require('util');

exports.readDirAsync = promisify(fs.readdir);
exports.writeFileAsync = promisify(fs.writeFile);
