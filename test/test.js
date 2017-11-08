var path = require('path');
var informer = require('../');
var assert = require('assert');
var fs = require('fs');
var fileNameExamples = require('./fileNameExamples');
var fileNameParser = require('../lib/file-name-parser');

describe('font-informer', function () {
  it('can parse .ttf files', function (done) {
    informer(path.join(__dirname, 'fonts/pathFont.ttf'))
      .then(function (result) {
        assert.deepEqual(result, require('./expected.ttf.json'));
        done();
      })
      .catch(function (err) {
        done(err);
      });
  });
  it('can parse .woff files', function (done) {
    informer(path.join(__dirname, 'fonts/pathFont.woff'))
      .then(function (result) {
        assert.deepEqual(result, require('./expected.woff.json'));
        done();
      })
      .catch(function (err) {
        done(err);
      });
  });
  it('can parse .eot files', function (done) {
    informer(path.join(__dirname, 'fonts/pathFont.eot'))
      .then(function (result) {
        assert.deepEqual(result, require('./expected.eot.json'));
        done();
      })
      .catch(function (err) {
        done(err);
      });
  });
  it('can parse .svg files', function (done) {
    informer(path.join(__dirname, 'fonts/pathFont.svg'))
      .then(function (result) {
        assert.deepEqual(result, require('./expected.svg.json'));
        done();
      })
      .catch(function (err) {
        done(err);
      });
  });

  describe('parsing buffers', function () {
    it('can parse .ttf buffers', function (done) {
      var file = path.join(__dirname, 'fonts', 'pathFont.ttf');
      informer(fs.readFileSync(file), 'pathFont.ttf')
        .then(function (result) {
          assert.deepEqual(result, require('./expected.ttf.json'));
          done();
        })
        .catch(function (err) {
          done(err);
        });
    });
    it('can parse .woff buffers', function (done) {
      var file = path.join(__dirname, 'fonts', 'pathFont.woff');
      informer(fs.readFileSync(file), 'pathFont.woff')
        .then(function (result) {
          assert.deepEqual(result, require('./expected.woff.json'));
          done();
        })
        .catch(function (err) {
          done(err);
        });
    });
    it('can parse .eot buffers', function (done) {
      var file = path.join(__dirname, 'fonts', 'pathFont.eot');
      informer(fs.readFileSync(file), 'pathFont.eot')
        .then(function (result) {
          assert.deepEqual(result, require('./expected.eot.json'));
          done();
        })
        .catch(function (err) {
          done(err);
        });
    });
    it('can parse .svg buffers', function (done) {
      var file = path.join(__dirname, 'fonts', 'pathFont.svg');
      informer(fs.readFileSync(file), 'pathFont.svg')
        .then(function (result) {
          assert.deepEqual(result, require('./expected.svg.json'));
          done();
        })
        .catch(function (err) {
          done(err);
        });
    });
  });

  describe('parsing filenames', function () {
    it('can parse common filenames', function (done) {
      fileNameExamples.forEach(function (example) {
        const result = fileNameParser(example.input);
        assert.deepEqual(result, example.expected);
      });
      done();
    })
  })
});