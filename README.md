# gulp-explainify

> A gulp plugin to generate instant side-by-side view of your comments and code (thanks to [ExplainJS](http://www.explainjs.com)).

## Usage

```js
var gulp = require('gulp'),
    explainify = require('gulp-explainify');

gulp.task('explainify', function () {
    return gulp.src('foo.js')
        .pipe(explainify())
        .pipe(gulp.dest('foo.json');
});
```
