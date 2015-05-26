var glob = require('..');
var path = require('util-path');

var fixtures = path.join(__dirname, '../test/fixtures');

console.log(
    glob.sync(['**/*.js', '**/*.css', function (file, opts) {
        var basename = path.replaceExtname(path.basename(file));
        var dir = path.basename(path.dirname(file));
        return basename !== dir;
    }], { cwd: fixtures }).sort()
);
// [ 'dir/e/e.css', 'dir/e/e.js', 'dir/f/f.css', 'dir/f/f.js'  ]

