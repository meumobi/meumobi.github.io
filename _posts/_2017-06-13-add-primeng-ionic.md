---
layout: post
title: Add PrimeNG on Ionic 2/3
categories: [Ionic]
tags: [datable, charts, primeng]
author:
  name: Victor Dias
  email: victor.dias@meumobi.com
  github: elbidone
  twitter: meumobi
  bio: Sharing mobile Experiences
  email_md5: 1cd012be2382e755aa763c66acc7cfa6
---


How do I include javascript+css from node_modules in ionic 2?
Responsive datatable and charts on Ionic2
get js and css files into my App
Howto include node_modules css files

We're essentially going to override the copy portion of the ionic build script. They've created the build script to encourage this and make it simple.


Install modules
npm install --save primeng font-awesome

which installs the primeng library into the node_modules folder in the root of the project

Look at **/node_modules/@ionic/app-scripts/config/copy.config.js**. This is what we are overriding, so copy it's contents to a file at **/config/copy.config.js** (You'll need to create the /config folder).

```
// this is a custom dictionary to make it easy to extend/override
// provide a name for an entry, it can be anything such as 'copyAssets' or 'copyFonts'
// then provide an object with a `src` array of globs and a `dest` string
module.exports = {
  copyAssets: {
    src: ['{{SRC}}/assets/**/*'],
    dest: '{{WWW}}/assets'
  },
  copyIndexContent: {
    src: ['{{SRC}}/index.html', '{{SRC}}/manifest.json', '{{SRC}}/service-worker.js'],
    dest: '{{WWW}}'
  },
  copyFonts: {
    src: [
	'{{ROOT}}/node_modules/ionicons/dist/fonts/**/*', '{{ROOT}}/node_modules/ionic-angular/fonts/**/*',
	'{{ROOT}}/node_modules/font-awesome/fonts/**/*'],
    dest: '{{WWW}}/assets/fonts'
  },
  copyPolyfills: {
    src: ['{{ROOT}}/node_modules/ionic-angular/polyfills/polyfills.js'],
    dest: '{{BUILD}}'
  },
  copySwToolbox: {
    src: ['{{ROOT}}/node_modules/sw-toolbox/sw-toolbox.js'],
    dest: '{{BUILD}}'
  },
  copyPrimeng: {
      src: [
        '{{ROOT}}/node_modules/primeng/resources/themes/omega/theme.css', 
        '{{ROOT}}/node_modules/primeng/resources/primeng.min.css', 
        '{{ROOT}}/node_modules/font-awesome/css/font-awesome.min.css'],
      dest: '{{WWW}}/assets/css'
    }
}
```

To get our script be used, package.json needs to be told about it, so add this "config" section to your /package.json file:

```
"config": {
    "ionic_copy": "./config/copy.config.js"
},
```

Now when you build, the file will be copied, and it's obviously easier after the first one is done, to add more. There are other portions of the ionic build process you can override as well, it's worth looking in to.

[https://ionicframework.com/docs/v2/resources/app-scripts/](https://ionicframework.com/docs/v2/resources/app-scripts/)

Now you can call it in easily, one option is inside of index.html:

`<script src="build/Chart.bundle.min.js"></script>`

The benefits are, if you install a module update, changed files will get updated in your build, and also, everything works out easily with vcs and setting up new environments, as the dependencies are handled by npm, and our script extension takes care of everything else. :-)

Source: [https://stackoverflow.com/questions/40943914/how-do-i-include-javascriptcss-from-node-modules-in-ionic-2](https://stackoverflow.com/questions/40943914/how-do-i-include-javascriptcss-from-node-modules-in-ionic-2)


https://forum.primefaces.org/viewtopic.php?t=50141
https://forum.ionicframework.com/t/ionic-2-projects-using-primeng-with-ionic-2/50238
https://github.com/mgechev/angular-seed/wiki/Add-PrimeNG
https://github.com/webpack/webpack/issues/1789

[Create interactive charts in Ionic 2](http://www.creativebloq.com/how-to/create-interactive-charts-in-ionic-2)

# Commits
https://github.com/meumobi/ion-ams-report/commit/8d5a421ba6a646725acf1c8a4bc2f006b55d40e7
