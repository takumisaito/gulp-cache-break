# gulp-cache-break

Simple cache-breaker plugin for gulp, appends a timestamp or md5 hash to any urls.  

This plugin based on [cache-breaker](https://github.com/shakyShane/cache-breaker).  

You can customize output string by changing option. Please refer to [grunt-cache-breaker](https://github.com/shakyShane/grunt-cache-breaker).  

---

_キャッシュ回避のためのシンプルな gulp プラグインです．_  
_タイムスタンプや文字列，md5ハッシュをURLに付与できます．_

_このプラグインは [cache-breaker](https://github.com/shakyShane/cache-breaker) を利用して作成しています．_

_出力されるURLは，オプションを指定することにより変更できます．_  
_オプションについては（申し訳ないけど）[grunt-cache-breaker](https://github.com/shakyShane/grunt-cache-breaker) こちらを参考にしてください．_

## Usage

```html
<!-- input index.html -->
<meta charset="utf-8">
<title>CACHE BREAK</title>
<link rel="stylesheet" href="css/main.css">
<script defer src="js/libs.js"></script>
<script defer src="js/main.js"></script>
```

```js
// gulp setting
var cacheBreak = require('gulp-cache-breake');

gulp.task('cache-breake', function() {
  gulp.src(['index.html'])
    .pipe(cacheBreak({
      match: ['main.js', 'main.css']
    }))
    .pipe(gulp.dest('public'));
});
```

```html
<!-- output public/index.html -->
<meta charset="utf-8">
<title>CACHE BREAK</title>
<link rel="stylesheet" href="css/main.css?rel=1438015738280">
<script defer src="js/libs.js"></script>
<script defer src="js/main.js?rel=1438015738280"></script>
```

## TODO

- [x] Write test script
- [ ] Upload to npm