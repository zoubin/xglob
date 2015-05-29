var apFilter = require('array-promise-filter');
var promisify = require('node-promisify');
var glob = promisify(require('glob'));
var negationFilter = require('./negation.js');
var xbind = require('xbind');

var isPositive = require('./pattern.js').isPositive;
var isNegation = require('./pattern.js').isNegation;

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

    var ret = apFilter(positive, glob, opts).then(function (files) {
        return [].concat.apply([], files)
                .filter(xbind(negationFilter, null, 1, negation))
                ;
    });
    if (typeof cb === 'function') {
        ret = ret.then(cb.bind(null, null), cb);
    }
    return ret;
};

