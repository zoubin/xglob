# xglob
[promisify](https://www.npmjs.com/package/node-promisify) [glob](https://www.npmjs.com/package/glob) and support mulptiple patterns.

Additionally, negation pattern can be function. If truthy value returned, the negation pattern matches.

## Usage

```javascript
var glob = require('xglob');
```

### glob(patterns, opts, cb).then(function (files) {})

Work in both callback style and promise style.

### files = glob.sync(patterns, opts)

### glob.glob
Just export [glob](https://www.npmjs.com/package/glob)

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
glob(['**/', '!*/'], { cwd: fixtures })
    .then(function (files) {
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
    glob.sync(['**/*.js', '**/*.css', function (file, opts) {
        var basename = path.replaceExtname(path.basename(file));
        var dir = path.basename(path.dirname(file));
        return basename !== dir;
    }], { cwd: fixtures }).sort()
);
// [ 'dir/e/e.css', 'dir/e/e.js', 'dir/f/f.css', 'dir/f/f.js'  ]
```



