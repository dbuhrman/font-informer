var parser = require('eot-parser');
var Promise = global.Promise || require('es6-promise').Promise;

module.exports = function (stream) {
  return new Promise(function (resolve, reject) {
    parser(stream)
      .then(function (results) {
        var name = results.familyName;
        var postScriptName = results.fullName;
        if (name.indexOf(results.styleName) === -1) {
          name += " - " + results.styleName;
        }

        resolve({
          format: 'embedded-opentype',
          type: "eot",
          name: name,
          postScriptName: postScriptName,
          weight: results.weight.value,
          style: results.italic ? "italic" : "normal"
        });
      })
      .catch(function (err) {
        reject({
          error: 'Failed to parse eot font',
          innerException: err
        });
      });
  });
};