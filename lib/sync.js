var isFunction = require('util').isFunction;
var glob = require('glob');
var xbind = require('xbind');
var negationFilter = require('./negation.js');
var customNegationFilter = require('./customNegation.js');

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
    var customNegation = pattern.filter(isFunction);

    return [].concat.apply([], positive.map(xbind('sync', glob, 1, opts)))
            .filter(xbind(negationFilter, null, 1, negation))
            .filter(xbind(customNegationFilter, null, 1, customNegation, opts))
            ;
};


function isPositive(pattern) {
    return !isFunction(pattern) && !isNegation(pattern);
}

function isNegation(pattern) {
    return !isFunction(pattern) && /^!/.test(pattern);
}

