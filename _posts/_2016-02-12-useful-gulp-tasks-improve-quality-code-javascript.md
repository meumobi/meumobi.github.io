https://devdactic.com/gulp-tasks-save-time-money/

// gulp-load-plugins will automatically load all the other registered plugins which have the gulp- prefix.
// then use '$.whatever' to use your other plugins
// /!\ Couldn't be used if plugin name contains "-" after glup- prefix, ie: 'gulp-angular-filesort'
$ = require('gulp-load-plugins')();

We can then use the included plugins as $.rename() and $.rubySass() (note the camel casing of ‘rubySass’ as the dependency is hyphenated).

I say ‘kind of’ because it is actually **lazy loading** the plugins so they are not loaded until you use them. This is good because if you are just running one specific task in your gulpfile it will only load the plugins used by it rather than loading a list of plugins defined at the top of the file, as is often done, many of which may not be required by the particular task.



/*=========================================
=           Quality of JS Code            =
=========================================*/

// See Lint Options: http://jshint.com/docs/options/
gulp.task('lint', function() {
	return gulp.src('./src/js/**/*.js')
	.pipe($.jshint())
	.pipe($.jshint.reporter('jshint-stylish'));
  .pipe($.jshint.reporter('fail'));
});

// Look up the .jshintrc configuration file
// https://github.com/kirjs/gulp-fixmyjs
// https://github.com/jshint/fixmyjs
// http://addyosmani.com/blog/fixmyjs/
gulp.task('fixjs', function() {
	return gulp.src("./src/js/**/*.js")
	.pipe($.fixmyjs({legacy: true}))
	.pipe(gulp.dest("./src/js/"));
});

// https://github.com/jscs-dev/gulp-jscs
// http://jscs.info/
gulp.task('jscs', function() {
	return gulp.src("./src/js/**/*.js")
	.pipe($.jscs())
	.pipe($.jscs.reporter())
	.pipe($.jscs({fix: true}))
	//.pipe($.jscs.reporter('fail'))
	.pipe(gulp.dest("./src/js/"));
});

// https://github.com/pgilad/gulp-todo
gulp.task('todo', function() {
	return gulp.src("./src/js/**/*.js")
	.pipe($.todo({ fileName: 'todo.md' }))
	//.pipe($.todo.reporter('json', {fileName: 'todo.json'}))
	.pipe(gulp.dest('./'));
});

// Strip console, alert, and debugger statements from JavaScript code
// https://github.com/sindresorhus/strip-debug
stripDebug = require('gulp-strip-debug');

...
	.pipe(ngAnnotate())
	.pipe(gulpif(config.debug, stripDebug()))
	.pipe(gulpif(!config.debug, uglify({ mangle: false })))
...


gulp.task('quality', ['lint', 'fixjs', 'jscs', 'todo']);
