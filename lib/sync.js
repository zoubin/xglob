var glob = require('glob');
var xbind = require('xbind');
var negationFilter = require('./negation.js');

var isPositive = require('./pattern.js').isPositive;
var isNegation = require('./pattern.js').isNegation;

module.exports = function (pattern, opts) {
    if (!Array.isArray(pattern)) {
        return glob.sync.apply(glob, arguments);
    }
    if (typeof opts === 'function') {
        cb = opts;
        opts = {};
    }
    var positive = pattern.filter(isPositive);
    var negation = pattern.filter(isNegation);

    return [].concat.apply([], positive.map(xbind('sync', glob, 1, opts)))
            .filter(xbind(negationFilter, null, 1, negation))
            ;
};

