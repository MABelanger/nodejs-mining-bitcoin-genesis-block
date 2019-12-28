'use strict';

const path = require('path');
const fs = require('fs');

function getBlockJsonFiles(cb) {
  const directoryPath = path.join(__dirname, '../../', 'blocks');
  //passsing directoryPath and callback function
  fs.readdir(directoryPath, function (err, files) {
      //handling error
      if (err) {
          return console.log('Unable to scan directory: ' + err);
      }
      //listing all files using forEach
      const blocks = files.map(function (file) {
          const absolutePath = directoryPath + '/' + file;
          const jsonData = fs.readFileSync(absolutePath);
          return JSON.parse(jsonData);
      });

      cb(blocks);
  });
}

module.exports = {
  getBlockJsonFiles
}
