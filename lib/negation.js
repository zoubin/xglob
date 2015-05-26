var minimatch = require('minimatch');

module.exports = function (file, negation) {
    return !negation.some(function (pattern) {
        return minimatch(file, pattern.slice(1));
    });
};
