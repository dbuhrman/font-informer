var parser = require('opentype-parser');
var Promise = global.Promise || require('es6-promise').Promise;
var fontStyle = require('./font-style.js');

module.exports = function (stream) {
	return new Promise(function(resolve, reject) {
		parser(stream).then(function(results) {
			var name = results.name.nameRecords.English.typographicFamily || results.name.nameRecords.English.fontFamily;
			var subFamily = results.name.nameRecords.English.typographicSubFamily || results.name.nameRecords.English.fontSubFamily;
			if (name.indexOf(subFamily) == -1) {
				name += " - " + subFamily;
			}
			
			// Try to grab the font weight from the normal place.
			var fontWeight = results['OS/2'].weight && results['OS/2'].weight.value;
			if(!fontWeight) {
				// Fall-back to using panose value.
				switch(results['OS/2'].panose.weight) {
					case "Very Light": 	fontWeight = 100; break;
					case "Light":		fontWeight = 200; break;
					case "Thin":		fontWeight = 300; break;
					case "Book":		fontWeight = 400; break;
					case "Medium":		fontWeight = 500; break;
					case "Demibold":	fontWeight = 600; break;
					case "Bold":		fontWeight = 700; break;
					case "Heavy":		fontWeight = 800; break;
					case "Black":		fontWeight = 900; break;
				}
			}

			resolve({
				type: results.type.toLowerCase(),
				name: name,
				weight: fontWeight,
				style: fontStyle(results["OS/2"].selection)
			});
		}, reject);
	});
};
