exports.isPositive = isPositive;
exports.isNegation = isNegation;

function isPositive(pattern) {
  return !isNegation(pattern);
}

function isNegation(pattern) {
  if (typeof pattern !== 'string') {
    return true;
  }
  return /^!/.test(pattern);
}

