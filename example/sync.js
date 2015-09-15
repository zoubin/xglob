var glob = require('..');
var path = require('path');

var fixtures = path.join(__dirname, '../test/fixtures');

console.log(
  glob.sync(['**/', '!*/'], { cwd: fixtures }).sort()
);
// [ 'dir/e/', 'dir/f/'  ]

