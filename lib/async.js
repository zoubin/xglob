var glob = require('glob');
var asyncMap = require('slide').asyncMap;
var negationFilter = require('./negation');
var isPositive = require('./pattern').isPositive;
var isNegation = require('./pattern').isNegation;

module.exports = function (pattern, opts, cb) {
  if (!Array.isArray(pattern)) {
    return glob.apply(null, arguments);
  }

  if (typeof opts === 'function') {
    cb = opts;
    opts = {};
  }

  var positive = pattern.filter(isPositive);
  var negation = pattern.filter(isNegation);

  asyncMap(positive, function (pat, done) {
    glob(pat, opts, done);
  }, function (err, res) {
    if (err) {
      return cb(err);
    }
    cb(null, res.filter(function (file) {
      return negationFilter(file, negation);
    }));
  });
};

