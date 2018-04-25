---
layout: post
title: My Useful Bower Commands
categories: [bower]
tags: [cheatsheet]
author:
  name: Victor Dias
  email: victor.dias@meumobi.com
  github: elbidone
  twitter: meumobi
  bio: Sharing mobile Experiences
  email_md5: 1cd012be2382e755aa763c66acc7cfa6
---
Web sites are made of lots of things — frameworks, libraries, assets, and utilities. Bower manages all these things for you.
You can browse packages on [http://bower.io/search/](http://bower.io/search/)
![bower-logo]({{ site.BASE_PATH }}/assets/media/bower/bower-logo.png)


See 
http://andy-carter.com/blog/a-beginners-guide-to-package-manager-bower-and-using-gulp-to-manage-components

# Check installed version
`$ bower --version`

# Search component: bower search

```bash
$ bower search angular-imgcache
Search results:

    angular-imgcache.js git://github.com/jBenes/angular-imgcache.js.git
    angular-imgcache git://github.com/ActivKonnect/angular-imgcache.git
    salatnik-angular-imgcache git://github.com/skamenetskiy/angular-imgcache.js.git
    emps-angular-imgcache.js git://github.com/emps/angular-imgcache.js.git
    angular-imgcache-mjb git://github.com/martinjbaker/angular-imgcache-mjb.git
```

# Install/UnInstall Package: bower (un)install

```bash
$ bower install normalize-less
```

This command will download the latest version of normalize-less and save it in a new folder named bower_components; 

If one of the libraries is no longer used in the website, you can uninstall it easily with bower uninstall command, like so.

```bash
$ bower uninstall normalize-less
```

Use `--save` or `--save-dev` options to update bower.json

* -S, --save: Save installed packages into the project’s bower.json dependencies
* -D, --save-dev: Save installed packages into the project’s bower.json devDependencies

```bash
$ bower install angular-animate#1.5.x --save-dev
```

# See versions of all installed bower components

`grep "version\"\:" bower_components/*/.bower.json`

## Install a specific version
Alternately, if you want to install the older version of the library, you can run the command followed with the version number, this way:

`$ bower install normalize-less#1.1`

## Checkout lastest version of your packages: bower list
Check out whether new versions of your packages have been registered in bower.

`$ bower list`

## Update components

`$ bower update jquery`

# upgrade your bower.json dependencies to the latest versions
[npm-check-updates](https://github.com/tjunnone/npm-check-updates) is a command-line tool that allows you to upgrade your package.json or bower.json dependencies to the latest versions, regardless of existing version constraints.

npm-check-updates maintains your existing semantic versioning policies, i.e., it will upgrade your "express": "^4.11.2" dependency to "express": "^5.0.0" when express 5.0.0 is released.

```bash
$ sudo npm install -g npm-check-updates
$ ncu -m bower

 font-awesome                              4.2  →     4.5 
 bootstrap                                 3.2  →     3.3 
 js-md5                                  1.1.0  →   1.1.1 
 angular-carousel                       ~0.3.x  →  ~1.0.x 
 angular-translate                      ~2.7.2  →  ~2.8.1 
 angular-translate-loader-static-files  ~2.7.2  →  ~2.8.1 
 angular-translate-storage-local        ~2.7.2  →  ~2.8.1 
 angular-translate-handler-log          ~2.7.2  →  ~2.8.1 
```

Run with -u to upgrade bower.json

# Search available infos about component

```bash
$ bower info angular-imgcache.js
bower cached        https://github.com/Maistho/angular-imgcache.js.git#1.0.0
bower validate      1.0.0 against https://github.com/Maistho/angular-imgcache.js.git#*

{
  name: 'angular-imgcache',
  main: 'angular-imgcache.js',
  version: '1.0.0',
  homepage: 'https://github.com/maistho/angular-imgcache',
  authors: [
    'maistho <maistho@gmail.com>',
    'Benes <benes@kodarna.cz>'
  ],
  description: 'Simple imgcache.js wrapper for AngularJS',
  keywords: [
    'AngularJS',
    'imgcache.js',
    'JavaScript'
  ],
  license: 'MIT',
  ignore: [
    '**/.*',
    'node_modules',
    'bower_components',
    'test',
    'tests'
  ],
  dependencies: {
    angular: '1.2.*',
    'imgcache.js': '*'
  }
}

Available versions:
  - 1.0.0
  - 0.1.0

You can request info for a specific version with 'bower info angular-imgcache.js#<version>'
```

For specific info:

```sh
$ bower info angular-imgcache.js version
bower cached        https://github.com/Maistho/angular-imgcache.js.git#1.0.0
bower validate      1.0.0 against https://github.com/Maistho/angular-imgcache.js.git#*

'1.0.0'
$ bower info angular-imgcache.js authors
bower cached        https://github.com/Maistho/angular-imgcache.js.git#1.0.0
bower validate      1.0.0 against https://github.com/Maistho/angular-imgcache.js.git#*

[
  'maistho <maistho@gmail.com>',
  'Benes <benes@kodarna.cz>'
]

```

# Installing a dependency with Bower from URL

Try `bower install git://github.com/urin/jquery.balloon.js.git#1.0.3 --save` where `1.0.3` is the tag number which you can get by reading tag under releases. Also for URL replace by `git://` in order for system to connect.

[Source](https://stackoverflow.com/a/41864695/4982169)

# Going further

- [http://www.zell-weekeat.com/bower/](http://www.zell-weekeat.com/bower/)
- [http://blog.teamtreehouse.com/getting-started-bower](http://blog.teamtreehouse.com/getting-started-bower)