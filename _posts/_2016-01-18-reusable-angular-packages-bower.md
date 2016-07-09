---
layout: post
title: How to write reusable JS packages with Bower
categories: [angular]
tags: [bower]
author:
  name: Victor Dias
  email: victor.dias@meumobi.com
  github: elbidone
  twitter: meumobi
  bio: Sharing mobile Experiences
  email_md5: 1cd012be2382e755aa763c66acc7cfa6
---
[Bower](http://bower.io/) can manage components that contain HTML, CSS, JavaScript, fonts or even image files. Bower doesn’t concatenate or minify code or do anything else - it just installs the right versions of the packages you need and their dependencies.


Let's say you have some AngularJS directive in an existing module that you want to share. How would you package it up?

# Create your package

First, let's make a new directory for it, and cd into it:

```bash
$ mkdir -p tmp/meumobi/src/js && cd $_
```

Next, let's make a JavaScript file for our code:

```bash
$ touch directive.js
```

```bash
$ bower init
? name meumobi-angular-toolkit
? description Angular ToolKit for Hybrid apps built with PhoneGap/Cordova
? main file dist/js/meumobi-angular-toolkit.js
? what types of modules does this package expose? 
? keywords meumobi angular phonegap
? authors Victor Dias <victor.dias@meumobi.com>
? license MIT
? homepage http://meumobi.com
? would you like to mark this package as private which prevents it from being accidentally published to the registry? Yes
d to the registry? (y/N) yhis package as private which prevents it from being accidental
{ to the registry? (y/N) 
  name: 'meumobi-angular-toolkit',
  authors: [
    'Victor Dias <victor.dias@meumobi.com>'
  ],
  description: 'Angular ToolKit for Hybrid apps built with PhoneGap/Cordova',
  main: 'dist/js/meumobi-angular-toolkit.js',
  moduleType: [],
  keywords: [
    'meumobi',
    'angular',
    'phonegap'
  ],
  license: 'MIT',
  homepage: 'http://meumobi.com',
  private: true
}

? Looks good? Yes
```
## What is the “main file” property
According to the [Bower.io documentation](https://github.com/bower/spec/blob/master/json.md#main)
> The primary acting files necessary to use your package. While Bower does not directly use these files, they are listed with the commands bower list --json and bower list --paths, so they can be used by build tools.

[bower.json specification] (https://github.com/bower/spec/blob/master/json.md)

# Share your package on GitHub
$ git add .gitignore

$ git init
$ git add .
$ git commit -m "v0.0.0"
$ git tag v0.0.0
$ git remote add origin https://github.com/meumobi/meumobi-angular-toolkit.git
$ git push -u origin master
$ git push origin v0.0.0


Then create the initial commit, following the SemVerTag conventions:



# Maintaining dependencies

# Going further
- http://bob.yexley.net/creating-and-maintaining-your-own-bower-package/
moduleType: https://github.com/bower/bower/pull/934
http://briantford.com/blog/angular-bower