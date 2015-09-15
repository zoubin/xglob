var glob = require('glob');
var negationFilter = require('./negation');
var isPositive = require('./pattern').isPositive;
var isNegation = require('./pattern').isNegation;

module.exports = function (pattern, opts) {
  if (!Array.isArray(pattern)) {
    return glob.sync.apply(glob, arguments);
  }
  var positive = pattern.filter(isPositive);
  var negation = pattern.filter(isNegation);

  var res = [];
  positive.forEach(function (pat) {
    res = res.concat(glob.sync(pat, opts));
  });
  return res.filter(Boolean).filter(function (file) {
    return negationFilter(file, negation);
  });
};

