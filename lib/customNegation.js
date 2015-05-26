
module.exports = function (file, negation, opts) {
    return !negation.some(function (f) {
        return !!f(file, opts);
    });
};
