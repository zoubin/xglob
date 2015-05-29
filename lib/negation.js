var minimatch = require('minimatch');

module.exports = function (file, negation) {
    return !negation.some(function (pattern) {
        if (typeof pattern === 'string') {
            return minimatch(file, pattern.slice(1));
        }
        if (typeof pattern === 'function') {
            return !!pattern(file);
        }
        if (pattern && typeof pattern.test === 'function' ) {
            return !!pattern.test(file);
        }
        return false;
    });
};
