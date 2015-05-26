var isFunction = require('util').isFunction;
var apFilter = require('array-promise-filter');
var promisify = require('node-promisify');
var glob = promisify(require('glob'));
var negationFilter = require('./negation.js');
var customNegationFilter = require('./customNegation.js');
var xbind = require('xbind');

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
    var customNegation = pattern.filter(isFunction);
    var ret = apFilter(positive, glob, opts).then(function (files) {
        return [].concat.apply([], files)
                .filter(xbind(negationFilter, null, 1, negation))
                .filter(xbind(customNegationFilter, null, 1, customNegation, opts))
                ;
    });
    if (typeof cb === 'function') {
        ret = ret.then(cb.bind(null, null), cb);
    }
    return ret;
};

function isPositive(pattern) {
    return !isFunction(pattern) && !isNegation(pattern);
}

function isNegation(pattern) {
    return !isFunction(pattern) && /^!/.test(pattern);
}

