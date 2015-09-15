var test = require('tap').test;
var glob = require('..');
var path = require('util-path');

var fixtures = path.join(__dirname, 'fixtures');

test('glob.sync([pattern1, pattern2], opts)', function (t) {
  t.same(
    glob.sync(['**/*.js', '**/*.css'], { cwd: fixtures }).sort(),
    [ 'a.css', 'a.js', 'd.js', 'dir/b.css', 'dir/b.js', 'dir/c.js', 'dir/e/e.css', 'dir/e/e.js', 'dir/f/f.css', 'dir/f/f.js' ]
  );
  t.end();
});

test('glob.sync([pattern, negation], opts)', function (t) {
  t.same(
    glob.sync(['**/', '!*/'], { cwd: fixtures }).sort(),
    [ 'dir/e/', 'dir/f/' ]
  );
  t.end();
});

test('glob.sync([pattern, regxNegation], opts)', function (t) {
  t.same(
    glob.sync(['**/', /^\w+\/$/], { cwd: fixtures }).sort(),
    [ 'dir/e/', 'dir/f/' ]
  );
  t.end();
});

test('glob.sync([pattern, negationFunction], opts)', function (t) {
  t.same(
    glob.sync(['**/*.js', '**/*.css', function (file) {
      var basename = path.replaceExtname(path.basename(file));
      var dir = path.basename(path.dirname(file));
      return basename !== dir;
    }], { cwd: fixtures }).sort(),
    [ 'dir/e/e.css', 'dir/e/e.js', 'dir/f/f.css', 'dir/f/f.js' ]
  );
  t.end();
});
