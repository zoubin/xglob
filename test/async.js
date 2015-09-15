var test = require('tap').test;
var glob = require('..');
var path = require('util-path');

var fixtures = path.join(__dirname, 'fixtures');

test('glob([pattern1, pattern2], opts)', function (t) {
  t.plan(2);
  glob(['**/*.js', '**/*.css'], { cwd: fixtures }, function (err, files) {
    t.error(err);
    t.same(
      files.sort(),
      [ 'a.css', 'a.js', 'd.js', 'dir/b.css', 'dir/b.js', 'dir/c.js', 'dir/e/e.css', 'dir/e/e.js', 'dir/f/f.css', 'dir/f/f.js' ]
    );
  });
});

test('glob([pattern, negation], opts)', function (t) {
  t.plan(2);
  glob(['**/', '!*/'], { cwd: fixtures }, function (err, files) {
    t.error(err);
    t.same(
      files.sort(),
      [ 'dir/e/', 'dir/f/' ]
    );
  });
});

test('glob([pattern, negationFunction], opts)', function (t) {
  t.plan(2);
  glob(['**/*.js', '**/*.css', function (file) {
    var basename = path.replaceExtname(path.basename(file));
    var dir = path.basename(path.dirname(file));
    return basename !== dir;
  }], { cwd: fixtures }, function (err, files) {
    t.error(err);
    t.same(
      files.sort(),
      [ 'dir/e/e.css', 'dir/e/e.js', 'dir/f/f.css', 'dir/f/f.js' ]
    );
  });
});
