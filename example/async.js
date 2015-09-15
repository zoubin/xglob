var glob = require('..');
var path = require('path');

var fixtures = path.join(__dirname, '../test/fixtures');

glob(['**/', '!*/'], { cwd: fixtures }, function (err, files) {
  console.log(files.sort());
  // [ 'dir/e/', 'dir/f/'  ]
});

