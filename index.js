var fs = require('fs');
var Promise = global.Promise || require('es6-promise').Promise;
Promise.any = require('promise-any-ext');
var parsers = require('./lib/parsers.js');
var fileNameParser = require('./lib/file-name-parser');
var path = require('path');

module.exports = function (file, filename) {
  return new Promise(function (resolve, reject) {
    // If we're passed a buffer, parse it.
    if (Buffer.isBuffer(file)) {
      resolve(file);
    } else {
      filename = path.relative(path.dirname(file), file);
      // Otherwise read the file.
      fs.readFile(file, function (err, contents) {
        if (err) return reject({
          error: 'unable to read file',
          innerException: err,
          filename: filename
        });

        resolve(contents);
      });
    }
  }).then(function (contents) {
    return Promise.any(parsers(contents))
      .then(function (result) {
        // console.log('FILENAME: ', filename);
        if (filename) {
          // Trust fileNameParser weight, format, and style (if they exist in filename) over file parsers
          var fileNameParserResult = fileNameParser(filename);
          // console.log('FILENAME RESULT:', fileNameParserResult);
          if (fileNameParserResult) {
            if (fileNameParserResult.weight) result.weight = fileNameParserResult.weight;
            if (fileNameParserResult.format) result.format = fileNameParserResult.format;
            if (fileNameParserResult.style) result.style = fileNameParserResult.style;
          }
        }
        return result;
      })
      .catch(function (err) {
        reject({
          error: 'Failed to parse font, all parsers returned an error',
          innerException: err
        });
      });
  });
};