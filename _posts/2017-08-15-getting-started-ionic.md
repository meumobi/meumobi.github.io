---
layout: post
title: Getting Started with Ionic
categories: [Ionic]
tags: [tutorial]
author:
  name: Victor Dias
  email: victor.dias@meumobi.com
  github: elbidone
  twitter: meumobi
  bio: Sharing mobile Experiences
  email_md5: 1cd012be2382e755aa763c66acc7cfa6
---
I had a good experience on [Cordova] and [PhoneGap] when I decided to test on a real project the Ionic Framework. At the raising of Ionic 1, I've already tested this framework but was disappointed by performance issues. Now, I have to migrate from Angular 1 to Angular 2/4 (means rebuild my whole code), and regarding new Ionic versions announcements and others [reasons why Ionic 2 is better than Ionic 1](https://www.joshmorony.com/7-reasons-why-ionic-2-is-better-than-ionic-1/), it's a good moment to re-evaluate the framework.
![Ionic 2]({{ site.BASE_PATH }}/assets/media/ionic/ionic.jpg)

> With [Ionic 2]((http://blog.ionic.io/announcing-ionic-2-0-0-final/)), we no longer use JavaScript scrolling, so apps now scroll with 60FPS on both Android and iOS. Our new [Virtual Scroll](http://ionicframework.com/docs/api/components/virtual-scroll/VirtualScroll/) implementation (updated for 2.0 final!) makes it possible to build apps that scroll through very large lists of items (and images!) with a minimal performance hit, along with apps that animate based on scroll events.

> An all new rendering pipeline shared with Ionic components reduces layout thrashing and repaints, historically a challenging source of perf issues for web developers.

> Ionic apps benefiting from a significantly faster [Angular 2](http://learnangular2.com/), giving them an "inherent performance improvement out of the box."

> [Ionic 3.0](http://blog.ionic.io/ionic-3-0-has-arrived/) includes support for [Lazy loading](http://blog.ionic.io/ionic-and-lazy-loading-pt-1/):  Conceptually, we’re taking one segment of code, a chunk, and loading it on demand as the app requests it.

# Getting started

## Prerequisites
We need to have [Node.js] and [Git] installed in order to install both [Ionic] and [Cordova].

```sh
$ npm install cordova ionic -g
...
$ npm ls -g cordova ionic npm --depth 0
/usr/local/lib
├── cordova@7.0.1 
├── ionic@3.8.1 
├── npm@5.0.3 
```

## Starting a project with Ionic CLI
The best way to start a new project, for learning or real work, is using a starter. Ionic provides some useful, you can list using [ionic cli](https://ionicframework.com/docs/cli/start/):
`ionic start --list`.

We'll start with the `sidemenu` starter. The launch could spend a long time because **`ionic start` installs all npm dependencies**. If you prefer you can skip dependencies install using `--skip-deps` option.

```sh
$ ionic start hello-world sidemenu
```

You should see something similar to the following output:

```sh
$ ionic start hello-world sidemenu
✔ Creating directory ./hello-world- done!
[INFO] Fetching app base (https://github.com/ionic-team/ionic2-app-base/archive/master.tar.gz)
✔ Downloading - done!
[INFO] Fetching starter template sidemenu 
       (https://github.com/ionic-team/ionic2-starter-sidemenu/archive/master.tar.gz)
✔ Downloading - done!
✔ Updating package.json with app details - done!
✔ Creating configuration file ionic.config.json - done!
[INFO] Installing dependencies may take several minutes!
✔ npm install - done!
✔ git init - done!
✔ git add -A - done!
✔ git commit -m "Initial commit" --no-gpg-sign - done!

♬ ♫ ♬ ♫  Your Ionic app is ready to go! ♬ ♫ ♬ ♫

Run your app in the browser (great for initial development):
  ionic serve

Run on a device or simulator:
  ionic cordova run ios

Test and share your app on a device with the Ionic View app:
  http://view.ionic.io
  
Next Steps:
Go to your newly created project: cd ./hello-world
$ 
```

Now, test it on your browser:

```sh
$ cd ./hello-world
$ ionic serve
```

![sidemenu starter]({{ site.BASE_PATH }}/assets/media/ionic/sidemenu-starter.png)

## Market place
You can also choose to download starter provided and rated by the community on [market.ionic.io].

# Run app on device
At this stage you can already test your App on device. You have two solutions:

- the easiest is using the [Ionic View App]. You should link your App to Ionic Cloud and download the Ionic View on your device. It works like a nutshell, Ionic View will load your resources, content of www directory, and run it on a native environment.
- you also can plug your device on your computer, via usb and through ionic-cli run `ionic cordova run android`. In order to work you should have installed on your computer the environment Android and/or iOS.

## Ionic view app
[Ionic View App] is part of Ionic Cloud Services, to use it you’ll need an Ionic account. [Signup](https://apps.ionic.io/signup) for free.
In your project directory, run `ionic link`, the prompt should authenticate you and suggest to create a new App on Ionic Cloud Services to link with the current directory.

```sh
$ ionic link
...
$ ionic upload
...
```

## Troubleshooting
If `ionic upload` raise log `[WARN] No Cordova platforms listed in config.xml. Nothing to prepare.`, you can fix it by running:

```
$ ionic cordova platform add android -r
```

It will save a platform, android, on config.xml and though prevent error on [ionic cordova prepare](https://ionicframework.com/docs/cli/cordova/prepare/). 

# Add sidebar menu on blank starter
As good exercise you can [create a new App from blank starter and add sidemenu](https://forum.ionicframework.com/t/how-to-add-sidebar-menu-to-my-existing-ionic-2-project/56481/2).

# Feeling lost

Don't worry, run `ionic docs` on cli and reach the [official Ionic doc](https://ionicframework.com/docs/api/) in your browser.

# Top Ionic resources

- [Paul Halliday]
- [Josh Morony]
- [Raja Yogan]
- [DreamHouse App by Christophe Coenraets]
  - Full featured App using **Ionic3 with REST Service** and Google Map integration.
- [Jave Bratt]
  - Building **Ionic and Firebase** apps.
- [Rangle’s Angular Training]
  - Because Ionic use Angular, this Angular tutorial should be very helpful during your developments.

   [Rangle’s Angular Training]: <https://angular-2-training-book.rangle.io/>
   [Jave Bratt]: <https://javebratt.com/>
   [Paul Halliday]: <https://www.youtube.com/channel/UCYJ9O6X1oFt7YGXpfRwrcWg/videos>
   [Josh Morony]: <https://www.joshmorony.com/>
   [Raja Yogan]: <http://tphangout.com/>
   [DreamHouse App by Christophe Coenraets]: <http://coenraets.org/blog/2017/04/dreamhouse-sample-application-ionic3-angular4/>
   [Node.js]: <https://nodejs.org/en/download/>
   [Git]: <http://git-scm.com/download>
   [Ionic]: <https://ionicframework.com/>
   [Cordova]: <https://cordova.apache.org/>
   [market.ionic.io]: <https://market.ionic.io/starters>
   [Ionic View App]: <https://view.ionic.io/>
   [ionic2-super-tabs]: <https://github.com/zyra/ionic2-super-tabs>
   [PhoneGap]: <https://phonegap.com/>

