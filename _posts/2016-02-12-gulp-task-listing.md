---
layout: post
title: Provide an auto task listing for your gulpfile
categories: [Tips and tricks]
tags: [gulp]
author:
  name: Victor Dias
  email: victor.dias@meumobi.com
  github: elbidone
  twitter: meumobi
  bio: Sharing mobile Experiences
  email_md5: 1cd012be2382e755aa763c66acc7cfa6
---
You'd like to type `gulp help`and automatically see the list of tasks of your gulpfile, organized by task/sub-tasks ? The package [gulp-tak-listing](https://www.npmjs.com/package/gulp-task-listing) is for you. By default, the output groups tasks based on whether or not they contain a hyphen (-), underscore (_), or colon (:) in their name. So the only job you need to do is apply a naming convention for your tasks, that is not a bad idea.  
See below an example of output:  
  
```
$ gulp help
Main Tasks
------------------------------
    build
    compile
    help
 
Sub Tasks
------------------------------
    build-css
    build-js
    compile-css
    compile-js
```

Add the package to your gulpfile like so:

```
var gulp = require('gulp');
var taskListing = require('gulp-task-listing');
 
// Add a task to render the output 
gulp.task('help', taskListing);
 
// Add some top-level and sub tasks 
gulp.task('build', ['build-js', 'build-css']);
gulp.task('build-js', function() { ... })
gulp.task('build-css', function() { ... })
 
gulp.task('compile', ['compile-js', 'compile-css']);
gulp.task('compile-js', function() { ... })
gulp.task('compile-css', function() { ... })
```

Now run `gulp help`, and enjoy!