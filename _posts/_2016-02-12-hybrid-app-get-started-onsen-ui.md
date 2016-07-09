---
layout: post
title: Hybrid App - Get started with Onsen UI 2.0 Beta
categories: [Mobile UI Frameworks]
tags: [onsen-ui, hybrid]
author:
  name: Victor Dias
  email: victor.dias@meumobi.com
  github: elbidone
  twitter: meumobi
  bio: Sharing mobile Experiences
  email_md5: 1cd012be2382e755aa763c66acc7cfa6
---
[Onsen UI](https://onsen.io/) is an open source front-end framework for hybrid mobile apps with native look and feel and websites. If developing hybrid apps, you can use it with the [Cordova](http://cordova.apache.org/) / [PhoneGap](http://phonegap.com/) command line.  
![Onsen-logo]({{ site.BASE_PATH }}/assets/media/onsen/onsenui-roadmap.jpg)  
Main features:  
  
- **JS Framework agnostic**
  - You can easily plug the Onsen UI components into any project, regardless of JavaScript framework.
- **iOS & Android native look and feel**
  - Onsen UI 2.0 brings Android Material design in addition to the iOS flat design.
- **Responsive layout** support for smartphones and tablets

[GitHub Repository: OnsenUI](https://github.com/OnsenUI/OnsenUI)

# Current Release

Latest release [Onsen UI v2.0.0-beta.6](https://github.com/OnsenUI/OnsenUI/releases) was launched on January 25, 2016

New features introduced on v2.0, from [Blog announce](https://onsen.io/blog/announcing-onsen-ui-2-beta/):

- **Onsen UI 2.0 is no longer dependent on AngularJS**.
  - The core library has no external dependencies as it has been implemented in pure JavaScript.
- **Introduction of Material Design into Onsen UI**.
  - Material Design lets you easily create a native-like experience for Android users.
- New component called the `<ons-splitter>`.
  - A "swiss army knife" of mobile app layouting. In a single component it combines the features of both the `<ons-split-view>` and the `<ons-sliding-menu>`.

On [Onsen UI 2.0 Beta announce](https://onsen.io/blog/announcing-onsen-ui-2-beta/) the dev team advices:

> So when will the stable version be ready? We have not decided on a fixed date yet. We want to collect as much feedback as possible before releasing the final stable version. It might take a couple of months before we are content enough to release.

# Contributors
The project has **52 Contributors but only 3-4 are really actives**. One of them, Andreas Argelius, has written recently nice slides to introduce Onsen UI 2.0: [Kickstart your hybrid app design with Onsen UI](http://slides.com/andreasa/kickstart-hybrid-app-design-onsen-ui#/).

![Onsen contributors, the 13rd Feb. 2016]({{ site.BASE_PATH }}/assets/media/onsen/github_contributors-20160213.png)


# Getting Started
Four ways:

- Clone onsenui2-quickstart project
- Monaca CLI: monaca create myproject # And choose template
- old school: install packages (bower or npm) and build html

https://onsen.io/2/

$ bower install onsenui#2.0.0-beta.6
$ bower install angular

```
$ git clone http://github.com/OnsenUI/onsenui2-quickstart
Cloning into 'onsenui2-quickstart'...
remote: Counting objects: 620, done.
remote: Total 620 (delta 0), reused 0 (delta 0), pack-reused 620
Receiving objects: 100% (620/620), 5.20 MiB | 2.97 MiB/s, done.
Resolving deltas: 100% (264/264), done.
Checking connectivity... done.
$ mv onsenui2-quickstart on-demo
$ cd on-demo/
$ sudo npm install && gulp serve
```

## Monaca command-line
To start my demo project I choose to use the [monaca command-line tool](http://docs.monaca.mobi/cur/en/manual/development/monaca_cli/) (I also recommend the [github README of monaca cli](https://github.com/monaca/monaca-cli)).
The current online doc concerns the version 5.2 but the npm package version is 1.2.10.
I don't understand why this difference, do you ?
Then, I run following commands:

```
$ npm view monaca version
1.2.10
$ sudo npm install monaca -g
$ monaca login
Email address: victor.dias@meumobi.com
Password: 
Monaca CLI is under the evaluation period. It will expire in 30 days.
You need to upgrade the plan when the evaluation period ends.
Successfully signed in as victor.dias@meumobi.com.
$ monaca livesync
```

So, I've discovered the developer App is not free, well... ok :-( But the price is reasonable: [US$ 16/m](https://monaca.mobi/en/pricing)

Onsen UI 2.0:

- [Javascript Reference](https://onsen.io/2/reference/javascript.html)
- [CSS Components](https://onsen.io/2/reference/css.html)

# Ready to use Themes and Templates
http://components2.onsen.io/patterns

## Support
- [Chat with dev team (Gitter)](https://gitter.im/OnsenUI/OnsenUI#)
- [Forum](https://community.onsen.io)

## Main features

## Pros
https://onsen.io/blog/new-features-onsen-beta-7

## Cons
Onsen dev team is working on
[Automatic style based on platform](https://community.onsen.io/topic/186/what-do-you-think-about-onsen-ui-2-0). This means that the components will automatically change their appearance on iOS and Android. On Android they are Material Design while on iOS they will look like the native flat design of iOS apps. You can follow the implementation of [Auto Styling Issue](https://github.com/OnsenUI/OnsenUI/pull/1199)

https://onsen.io/blog/new-features-onsen-beta-7/

http://www.gajotres.net/best-html5-mobile-app-frameworks-onsen-ui/

## Examples
Search movie: http://plnkr.co/edit/8trHE5vuBOJFA8wRhnIt?p=preview
login: http://codepen.io/jay3dec/pen/KemkI
http://www.sitepoint.com/taking-cordova-app-onsen-ui/
google places: https://onsen.io/blog/build-a-places-app-with-foursquare-and-google-maps-using-onsen-ui-and-angularjs/

# Benchmark
https://github.com/OnsenUI/OnsenUI/issues/1227

| Launch Page  | Material Demo |
| ------------- | ------------- |
| ![onsen-material-1]({{ site.BASE_PATH }}/assets/media/onsen/Screenshot_2016-02-12-12-38-42.png)  | ![onsen-material-2]({{ site.BASE_PATH }}/assets/media/onsen/Screenshot_2016-02-12-12-37-59.png)  |

  "devDependencies": {
    "onsenui": "2.0.0-beta.5",
    "react": "~0.14.2",
    "angular": "~1.4.8"
  }

Tested on Android 4.1.2 (8,8% of [Android Platform Distribution](http://developer.android.com/about/dashboards/index.html) on Feb 2016)


# Conclusion

http://www.gajotres.net/onsen-ui-2-0-example1/
https://onsen.io/blog/tutorial-create-instagram-gallery-app-with-onsenui-react/
