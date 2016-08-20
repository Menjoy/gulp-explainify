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

## Input data

```js
/**
 * @description Awesome function description
 *
 * @param {string} what
 * @param {{}} where
 * @param {Date} when
 */
function awesomeFunction(what, where, when) {
    console.log(what, where, when);
}

// Export function
module.exports = awesomeFunction;

// The end
```

## Result

```json
{
  "sections": [
    {
      "comments": "<p>@description Awesome function description</p> <p>@param {string} what</p> <p>@param {{}} where</p> <p>@param {Date} when</p>",
      "code": "function awesomeFunction(what, where, when) {\n    console.log(what, where, when);\n}\n"
    },
    {
      "comments": "<p>Export function</p>",
      "code": "module.exports = awesomeFunction;\n"
    },
    {
      "comments": "<p>The end</p>",
      "code": ""
    }
  ]
}
```
