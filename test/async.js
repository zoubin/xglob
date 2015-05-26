var tape = require('tape');
var glob = require('..');
var path = require('util-path');

var fixtures = path.join(__dirname, 'fixtures');

tape('glob([pattern1, pattern2], opts)', function (t) {
    t.plan(1);
    glob(['**/*.js', '**/*.css'], { cwd: fixtures })
        .then(function (files) {
            t.same(files.sort(), [ 'a.css', 'a.js', 'd.js', 'dir/b.css', 'dir/b.js', 'dir/c.js', 'dir/e/e.css', 'dir/e/e.js', 'dir/f/f.css', 'dir/f/f.js'  ]);
        });
});

tape('glob([pattern, negation], opts)', function (t) {
    t.plan(1);
    glob(['**/', '!*/'], { cwd: fixtures })
        .then(function (files) {
            t.same(files.sort(), [ 'dir/e/', 'dir/f/'  ]);
        });
});

tape('glob([pattern, negationFunction], opts)', function (t) {
    t.plan(1);
    glob(['**/*.js', '**/*.css', function (file, opts) {
        var basename = path.replaceExtname(path.basename(file));
        var dir = path.basename(path.dirname(file));
        return basename !== dir;
    }], { cwd: fixtures })
        .then(function (files) {
            t.same(files.sort(), [ 'dir/e/e.css', 'dir/e/e.js', 'dir/f/f.css', 'dir/f/f.js'  ]);
        });
});
