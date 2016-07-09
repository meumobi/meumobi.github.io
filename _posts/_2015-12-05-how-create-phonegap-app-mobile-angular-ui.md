---
layout: post
title: How to create great PhoneGap App with Mobile Angular UI 
categories: [PhoneGap, Mobile Angular UI]
tags: [simulator, Hybrid App, phonegap, cordova, Mobile Angular UI, mobile UI]
author:
  name: Victor Dias
  email: victor.dias@meumobi.com
  github: elbidone
  twitter: meumobi
  bio: Sharing mobile Experiences
  email_md5: 1cd012be2382e755aa763c66acc7cfa6
---
On a [previous post]({% post_url 2015-06-06-how-easily-create-mobile-app-phonegap %}) we've seen how to create a cross-platform mobile app with standards-based Web technologies like HTML, JavaScript, CSS and PhoneGap Framework. To speed up our devs and not re-invent the whell we'll add a mobile UI framework on our Project. Today we'll try [Mobile Angular UI]
> Mobile Angular UI is a mobile UI framework just like Sencha Touch or jQuery Mobile. If you know Angular JS and Twitter Bootstrap you already know it!
![mobile-angular-ui]({{ site.BASE_PATH }}/assets/media/mobile-angular-ui.png)

We like [Mobile Angular UI] because it's very simple to use, if you know Bootstrap and Angular there's no learning curve, you can start to develop your own project in few hours.  
Below we've copied some key features of Mobile Angular UI:
 
- **Awesome Mobile Components**: Mobile Angular UI provides essential mobile components that are missing in Bootstrap 3: switches, overlays, sidebars, scrollable areas, absolute positioned top and bottom navbars that don't bounce on scroll. It relies on robust libraries like fastclick.js and overthrow.js to achieve the better mobile experience.
- **Angular JS Everywhere**: No jQuery dependencies, no fat bootstrap js. Just a few angular.js directives super easy to learn to put things together.
- **From Desktop to Mobile and back with the smallest effort possible**: Mobile Angular UI retains most of the Bootstrap 3 syntax. This way it’s trivial to bring an existing desktop web app to mobile. Also a super-small css file is provided to do the opposite. Just include it and you’ll get a fully responsive and touch enabled interface that can be used everywhere.

**Why not just Twitter Bootstrap and Angular Ui?**

Well there is no problem using them as they are, except that they are not designed for mobile.

Bootstrap claims its stylesheets to be mobile-first, and yes they are, but this does not mean that it is ready for mobile. Touch browser/devices does not like :hover styles, and you'll have a lot of responsive stuffs you wont need at all in most cases.

Plus Bootstrap/AngularUi components are not designed to support a mobile interaction properly, as well as they leak some basic components often used in mobile development, i.e sidebars, scroll areas, switches and more.

[Mobile Angular UI]: http://mobileangularui.com/

# Setup Project
## Install Required Packages
The easiest way to install mobile-angular-ui is using its [yeoman](http://yeoman.io/) generator. Then run following command:

```bash
$ sudo npm install -g bower yo gulp generator-mobileangularui phonegap cordova
```

*[Prefix command by sudo](https://docs.npmjs.com/getting-started/fixing-npm-permissions) only if necessary.*

## Create PhoneGap Project Directory

```bash
$ phonegap create ui-Employee --id "com.meumobi.employee.ui" --name "ui-Employee"
Creating a new cordova project.
```

Where options are:
Options:

  --name, -n <name>         application name (default: "Hello World")
  --id, -i <package>        package name (default: "com.phonegap.hello-world")

## Install Mobile Angular UI using boilerplate
If you want to have your Mobile Angular UI project bootstrapped in a minute you can use the generator-mobileangularui generator for Yeoman.

```bash
$ cd ui-Employee
$ yo mobileangularui 
```

Be patient.. this may take a few minutes until npm finishes to install.
![yo-mobile-angular-ui]({{ site.BASE_PATH }}/assets/media/yo-Mobile_Angular_UI.png)


$ phonegap run ios --verbose
[phonegap] executing 'cordova platform add --save ios'...
Adding ios project...

Running command: /Users/victor/.cordova/lib/npm_cache/cordova-ios/3.9.2/package/bin/create /Users/victor/Dvpt/PROJECTS/myMobileAngularUI/platforms/ios com.meumobi.myapp "my App" --cli

iOS project created with cordova-ios@3.9.2

Discovered plugin "cordova-plugin-whitelist" in config.xml. Installing to the project

Fetching plugin "cordova-plugin-whitelist@1" via npm

Installing "cordova-plugin-whitelist" for ios


This plugin is only applicable for versions of cordova-android greater than 4.0. If you have a previous platform version, you do *not* need this plugin since the whitelist will be built in.
	

--save flag or autosave detected

Saving ios@~3.9.2 into config.xml file ...

[phonegap] completed 'cordova platform add --save ios'
[phonegap] executing 'cordova run ios --verbose'...
Executing "before_run"  hook for all plugins.

Executing "before_prepare"  hook for all plugins.

Generating config.xml from defaults for platform "ios"

Wrote out iOS Bundle Identifier to "com.meumobi.myapp"

Wrote out iOS Bundle Version to "1.0.0"

# FAQ
## 'util.error: Use console.error instead' on log when run gulp
If when you run gulp following log is displayed `util.error: Use console.error instead` then you should upgrade gulp-uglify:

```bash
$ sudo npm uninstall -D gulp-uglify
$ sudo npm install -D gulp-uglify
```

## 'No Content-Security-Policy meta tag found' on PhoneGap serve log
[phonegap] [console.warn] No Content-Security-Policy meta tag found. Please add one when using the cordova-plugin-whitelist plugin.

# Going further
- https://devdactic.com/two-worlds-mobileangularui/
- http://www.sitepoint.com/getting-started-mobile-angular-ui/