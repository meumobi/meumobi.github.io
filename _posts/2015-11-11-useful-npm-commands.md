---
layout: post
title: My Useful npm Commands
categories: [npm]
tags: [cheatsheet]
author:
  name: Victor Dias
  email: victor.dias@meumobi.com
  github: elbidone
  twitter: meumobi
  bio: Sharing mobile Experiences
  email_md5: 1cd012be2382e755aa763c66acc7cfa6
---
npm is the package manager for javascript. The npm command-line tool is bundled with Node.js. If you have it installed, then you already have npm too. If not, go download [Node.js].  
You can browser packages on [http://www.npmjs.com](https://www.npmjs.com/)
![npm-logo]({{ site.BASE_PATH }}/assets/media/npm-logo.svg)

# Install a package: npm install
The [npm install] command installs a package, and any packages that it depends on.

```bash
$ npm install -g <PACKAGE_NAME>
```

The -g flag above tells npm to install the package globally so it can be accessed from anywhere on your machine (defaults to /usr/local/lib/node\_modules/phonegap on Mac). Otherwise it will be installed in the node\_modules subdirectory of the current working directory.

Recording Updates with --save or --save-dev

- --save (-S): Package will be saved to your dependencies.
- --save-dev (-D): Package will be saved to your devDependencies.

# Is this package installed and which version ?: npm ls (alias list)
The [npm ls] command will print to stdout all the versions of packages that are installed.

```bash
$ npm ls request
ui-employee@0.0.0 /Users/victor/Dvpt/PROJECTS/ui-Employee
└─┬ gulp-less@3.0.5
  └─┬ less@2.5.3
    └── request@2.67.0
```

Don't forget to use "-g" option to check global package.

Use `--depth 0` option to not display dependencies.

# Lastest available version of package: npm view (alias info)
The [npm view] command shows data about a package and prints it to the stream. 
For latest available version use following command:

```bash
$ npm view request version
2.65.0
```

For the full list of available data use --json param:

```bash
$ npm view phonegap --json

$ npm view phonegap repository.url
git://github.com/phonegap/phonegap-cli.git

$ npm view phonegap description
PhoneGap command-line interface and node.js library.
```

# Check for outdated packages: npm outdated
The [npm outdated] command will check the registry to see if any (or, specific) installed packages are currently outdated.

```bash
$ npm outdated -g
Package            Current  Wanted  Latest  Location
bower                1.6.5   1.7.2   1.7.2  
cordova              5.2.0   5.4.1   5.4.1  
ios-deploy           1.8.3   1.8.4   1.8.4  
ios-sim              4.1.1   5.0.6   5.0.6  
jscs                 2.6.0   2.8.0   2.8.0  
json2csv            2.11.0   3.0.2   3.0.2  
npm                  3.5.0   3.5.4   3.5.3  
npm-check-updates    2.5.4   2.5.6   2.5.6  
phonegap             5.3.8   5.4.0   5.4.0  
update               0.3.6   0.4.1   0.4.1  
yo                   1.5.0   1.6.0   1.6.0
$
```
# Update a package: npm update
The [npm update] command will update all the packages listed to the latest version (specified by the tag config), respecting [semantic versioning parser].

# Uninstall Package: npm uninstall
[npm uninstall]

# Difference between tilde(~) and caret(^) in package.json
In the simplest terms, the tilde matches the most recent minor version (the middle number). ~1.2.3 will match all 1.2.x versions but will miss 1.3.0.

The caret, on the other hand, is more relaxed. It will update you to the most recent major version (the first number). ^1.2.3 will match any 1.x.x release including 1.3.0, but will hold off on 2.0.0.

npm’s [semantic versioning parser] clarifies the distinction:

> ~1.2.3 := >=1.2.3-0 <1.3.0-0 “Reasonably close to 1.2.3”.  
  
> ^1.2.3 := >=1.2.3-0 <2.0.0-0 “Compatible with 1.2.3”.

― isaacs/node-semver (emphasis added)

The difference between “reasonably close” and “compatible” can be traced back to semantic versioning (SemVer) semantics. From the [spec](http://semver.org/):

> Given a version number MAJOR.MINOR.PATCH, increment the:  
 * MAJOR version when you make incompatible API changes,  
 * MINOR version when you add functionality in a backwards-compatible manner, and  
 * PATCH version when you make backwards-compatible bug fixes.

― semver.org

Only major versions are allowed to break compatibility, so a developer should be able to switch between minors and patches with ease.

# Upgrade your package.json dependencies to the latest versions
[npm-check-updates](https://github.com/tjunnone/npm-check-updates) is a command-line tool that allows you to upgrade your package.json or bower.json dependencies to the latest versions, regardless of existing version constraints.

npm-check-updates maintains your existing semantic versioning policies, i.e., it will upgrade your "express": "^4.11.2" dependency to "express": "^5.0.0" when express 5.0.0 is released.

```bash
$ sudo npm install -g npm-check-updates
$ ncu

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

# Where does npm install packages?: npm root
You can run [npm root] to see where libraries are installed. Add -g option for global libraries.

# Known Issues
- [npm outdated failes with 404 if module is not in the registry](https://github.com/npm/npm/issues/8752)
- [change to `latest` behavior causes strangeness in npm's own repo](https://github.com/npm/npm/issues/10409)

[npm root]: https://docs.npmjs.com/cli/root
[semantic versioning parser]: https://github.com/isaacs/node-semver
[npm update]: https://docs.npmjs.com/cli/update
[npm outdated]: https://docs.npmjs.com/cli/outdated
[npm uninstall]: https://docs.npmjs.com/cli/uninstall
[npm ls]: https://docs.npmjs.com/cli/ls
[npm view]: https://docs.npmjs.com/cli/view
[npm install]: https://docs.npmjs.com/cli/install
[Node.js]: https://nodejs.org/en/download/