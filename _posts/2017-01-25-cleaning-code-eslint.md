---
layout: post
title: Cleaning code with ESLint
categories: [eslint]
tags: []
author:
  name: Victor Dias
  email: victor.dias@meumobi.com
  github: elbidone
  twitter: meumobi
  bio: Sharing mobile Experiences
  email_md5: 1cd012be2382e755aa763c66acc7cfa6
---


Cleaning up Code with Eslint
https://www.youtube.com/watch?v=Vh_gOMfOod8

## Install
```bash
  $ npm install gulp-eslint eslint-plugin-angular eslint-config-angular
```

## Call eslint on gulp
https://github.com/Gillespie59/eslint-plugin-angular

```js
gulp.task('eslint', function() {
  return gulp.src('./src/lib/*.js')
  .pipe($.eslint({
    'rules':{
      'quotes': [1, 'single'],
      'semi': [1, 'always'],
      'angular/deferred': [1, 'always'],
      //'angular/definedundefined': [0, 'always']
    }
  }))
  .pipe($.eslint.format())
  .pipe($.eslint.failAfterError());
});
```

## Adding rules

## Turning off eslint rule for a specific line

```js
// eslint-disable-next-line no-use-before-define
var thing = new Thing();

/*eslint-disable */

//suppress all warnings between comments
alert('foo');

/*eslint-enable */
```

You can also disable a specific rule/rules (rather than all) by specifying them in the enable (open) and disable (close) blocks:

```js
/*eslint-disable no-alert, no-console */

alert('foo');
console.log('bar');

/*eslint-enable no-alert */

```

http://eslint.org/docs/user-guide/configuring.html#configuring-rules