---
layout: post
title: Check new version of npm packages
categories: [Git]
tags: []
author:
  name: Victor Dias
  email: victor.dias@meumobi.com
  github: elbidone
  twitter: meumobi
  bio: Sharing mobile Experiences
  email_md5: 1cd012be2382e755aa763c66acc7cfa6
---
npm-check-updates is a command-line tool that allows you to upgrade your package.json or bower.json dependencies to the latest versions, regardless of existing version constraints.

# Check if exist new version of npm packages: npm-check-updates

```bash
$ sudo npm install -g npm-check-updates
$ ncu
 gulp-ignore       ^1.2.0  →  ^2.0.1 
 gulp-mobilizer    ^0.0.2  →  ^0.0.3 
 gulp-ng-annotate  ^0.2.0  →  ^1.1.0 
 gulp-replace      ^0.4.0  →  ^0.5.4 
 gulp-rimraf       ^0.1.0  →  ^0.2.0 
 run-sequence      ^0.3.6  →  ^1.1.5 
 streamqueue       ^0.1.1  →  ^1.1.1 
$ 
```