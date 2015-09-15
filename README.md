# xglob
[glob](https://www.npmjs.com/package/glob) with mulptiple patterns.

Additionally, negation pattern can be functions or regular expressions.
If truthy value returned, the negation pattern matches.

## Example

```
⌘ tree fixtures/
fixtures/
├── a.css
├── a.js
├── d.js
├── dir
│   ├── b.css
│   ├── b.js
│   ├── c.js
│   ├── e
│   │   ├── e.css
│   │   └── e.js
│   └── f
│       ├── f.css
│       └── f.js
└── empty
```

### glob(patterns, opts, cb)

```javascript
glob(['**/', '!*/'], { cwd: fixtures }, function (err, files) {
  console.log(files.sort());
  // [ 'dir/e/', 'dir/f/'  ]
});
```

### files = glob.sync(patterns, opts)

```javascript
console.log(
  glob.sync(['**/', '!*/'], { cwd: fixtures }).sort()
);
// [ 'dir/e/', 'dir/f/'  ]
```

### negation function

```javascript
var path = require('util-path');
console.log(
  glob.sync(['**/*.js', '**/*.css', function (file) {
    var basename = path.replaceExtname(path.basename(file));
    var dir = path.basename(path.dirname(file));
    return basename !== dir;
  }], { cwd: fixtures }).sort()
);
// [ 'dir/e/e.css', 'dir/e/e.js', 'dir/f/f.css', 'dir/f/f.js'  ]
```



## Usage

```javascript
var glob = require('xglob');
```

### glob(patterns, opts, cb)

#### patterns
Type: `String`, `Array`

Passed to glob for locating files.

### files = glob.sync(patterns, opts)

### glob.glob
[glob](https://www.npmjs.com/package/glob)

