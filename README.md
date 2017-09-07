# gulp-cache-break

Simple cache-breaker plugin for gulp, appends a timestamp or md5 hash to any urls.  

This plugin based on [cache-breaker](https://github.com/shakyShane/cache-breaker).  

You can customize output strings by changing option.

Please refer to Please refer to [cache-breaker](https://github.com/shakyShane/cache-breaker), and [grunt-cache-breaker](https://github.com/shakyShane/grunt-cache-breaker).  

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
var cacheBreak = require('gulp-cache-break');

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