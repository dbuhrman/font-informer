var fileExt = ['ttf', 'odt', 'eot', 'svg', 'woff', 'woff2'];
var weightWords = ['thin', 'extralight', 'light', 'regular', 'medium', 'semibold', 'bold', 'extrabold', 'black'];
var styleWords = ['italic', 'oblique', 'normal'];

var fileRegex = new RegExp('^([a-z ]*)[- ]?('+weightWords.join('|')+')?(' + styleWords.join('|') + ')?\.('+fileExt.join('|')+')$', 'i');

var formatFor = function(ext) {
    switch(ext.toLowerCase()) {
        case 'ttf': // fall-through
        case 'odt': return 'truetype';
        case 'eot': return 'embedded-opentype';
        case 'svg': // fall-through
        case 'woff': // fall-through
        case 'woff2': return ext;
    }
}

var weightFor = function(weightName) {
    switch(weightName.toLowerCase()) {
        case 'thin': return 100;
        case 'extralight': return 200;
        case 'light': return 300;
        case 'regular': return 400;
        case 'medium': return 500;
        case 'semibold': return 600;
        case 'bold': return 700;
        case 'extrabold': return 800;
        case 'black': return 900;
    }
}

module.exports = function(filename) {
    var match = filename.match(fileRegex);
    if(!match) return null;

    var fontName = match[1];
    var fontWeight = match[2] || 'Regular';
    var fontStyle = match[3] || 'Normal';
    var fontExt = match[4];

    return {
        format: formatFor(fontExt),
        type: fontExt.toLowerCase(),
        name: fontName,
        weight: weightFor(fontWeight),
        style: fontStyle.toLowerCase()
    };
}