# gulp-codception
> PHPSpec plugin for gulp 3

## Usage

First, install `gulp-phpspec` as a development dependency:

```shell
npm install --save-dev gulp-phpspec
```

Then, add it to your `gulpfile.js`:

```javascript
var phpspec = require('gulp-phpspec');

// option 1: default format
gulp.task('phpspec', function() {
	gulp.src('./spec/**/*.php').pipe(phpspec());
});

// option 2: with defined bin and options
gulp.task('phpspec', function() {
	var options = {debug: false};
	gulp.src('./spec/**/*.php').pipe(phpspec('./vendor/bin/phpspec run',options));
});

// option 3: supply callback to integrate something like notification (using gulp-notify)

var gulp    = require('gulp'),
    notify  = require('gulp-notify'),
    phpspec = require('gulp-phpspec');

gulp.task('phpspec', function() {
	var options = {notify: false};
	gulp.src('app/spec/**/*.php')
		.pipe(phpspec('', options))
		.on('error', notify.onError({
			title: "Testing Failed",
			message: "Error(s) occurred during test..."
		}))
		.pipe(notify({
			title: "Testing Passed",
			message: "All tests have passed..."
		}));
});


```

## API

### (codeceptpath,options,cb)

#### phpspecpath

Type: `String`

The path to the desired PHPSpec binary
- If not supplied, the defeault path will be ./vendor/bin/phpspec

#### options.debug
Type: `Boolean (Default: false)`

Emit error details and shows command used in console

#### options.clear
Type: `Boolean (Default: false)`

Clear console before executing command


#### options.notify
Type: `Boolean (Default: false)`

Call user supplied callback to handle notification (use gulp-notify)

## Changelog

- 0.1.0: Initial Release

## Credits

gulp-codeception written by Mike Erickson

E-Mail: [codedungeon@gmail.com](mailto:codedungeon@gmail.com)

Twitter: [@codedungeon](http://twitter.com/codedungeon)

Webiste: [codedungeon.org](http://codedungeon.org)