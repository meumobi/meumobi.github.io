---
layout: post
title: Alternatives to Launchkit
categories: [Tips and tricks]
tags: [screenshot]
last_modified_at: 2020-03-12T17:15:00Z
author:
  name: Victor Dias
  email: victor.dias@meumobi.com
  github: elbidone
  twitter: meumobi
  bio: Sharing mobile Experiences
  email_md5: 1cd012be2382e755aa763c66acc7cfa6
---
As described on its site, [LaunchKit](https://launchkit.io/) is a suite of easy to use tools for mobile app makers to create, launch and monitor our apps. On meumobi we use all their services: Screenshot Builder, App Website Builder and Review Monitor. 
All are well designed, with best UX and features you need. For us the most important is the screenshot builder, we save the screenshots of all Apps we manage ( > 20), iOS and Android.
![launchkit]({{ site.BASE_PATH }}/assets/media/launchkit/launchkit.png)
Unfortunately on July, 2016 [LaunchKit team joined Google](https://library.launchkit.io/launchkit-joins-google-7e6108a706ab) and decide to discontinue the service on July, 2017. They have [open sourced LaunckKit](https://github.com/launchkit/launchkit), so anyone can set up their own instance. But I'm not sure it's a good idea to own a discontinued project, let's search a solid alternative.

 ```
/!\ This post was updated on Mar 12, 2020 to add a new alternative [appstorekit](https://appstorekit.com/). This project is developed by [Simon Grimm](https://twitter.com/schlimmson), the great Ionic evangelist. It's still in progress, I hope it will provide soon Android support.

Find an issue? please drop a line on comment, I'll fix it ASAP
```


## Screenshot Builder
### Appure
[Appure](https://appure.io/) is a good alternative. Screenshots produced are nice, you can manage a lot of settings (devices, background, font, etc).
You can login and save your projects there to use them later. 

![appure]({{ site.BASE_PATH }}/assets/media/launchkit/appure.png)

It's free for one App and 7.5 euros/month (US$ 8.2) for 10 Apps, see [pricing](https://appure.io/#PRICING) for more options.

### Shotbot
Another alternative is [Shotbot](https://app.shotbot.io/). We know it because this SaaS is produced by [oursky](https://oursky.com/), also known to produce [makeappicon](https://makeappicon.com/), great tool for mobile icons. 
Shotbot has few settings and is only available for App Store (iOS) at the moment, support for Play Store (Android) is on beta.

![shotbot]({{ site.BASE_PATH }}/assets/media/launchkit/shotbot.png)

Something annoying of this tool is you can't change template after saving.

### App Store Screenshot
[App Store Screenshot](https://www.appstorescreenshot.com) is pretty straight-forward, no login required and few settings.
The generated screenshots will match App Store's and Google Play's requirements at 1242 x 2208 pixels for phones and 2048 x 2732 pixels for tablets.

### Placeit
The last solution is placeit, known for its mockups to provide nice picks and video with your App. Some mockups could be used for App Store and Google Play screenshots:

- [white iphone 6s](https://placeit.net/stages/white-iphone-6s-plus-portrait-cut-ios-screenshot-generator)
- [flat screenshot with shadow](https://placeit.net/stages/flat-screenshot-os-builder-emitting-shadow-app-smartphone)
## App Website Builder

### AppSite

To quickly build an App website, filling datas from online App Store you can use [AppSite](https://appsite.skygear.io/), also produced by [oursky](https://oursky.com/), as shotbot above. It's a simple service with few setting but do the job. 
Unlike launchkit we you can only create one site hosted by AppSite. But you can download a zip with the html page and assets to host in your own environment.

![appsite]({{ site.BASE_PATH }}/assets/media/launchkit/appsite.png)

## Review Monitor

### AppFollow
We didn't test [AppFollow](https://appfollow.io/) yet, but it seems good. Feel free to leave a comment if you have some inputs about.

## Furthermore
- [screenshotdesigner](https://screenshotdesigner.com)
  - Create stunning App Store screenshots
- appFigures for App Store and Play Store sales reports and review tracking in your inbox
- [DaVinci](https://www.davinciapps.com/)
  - Apps for designing great App Store screenshots
- Appsites for creating simple app websites
- ReviewBot for App Store reviews in Slack
- AppBot for App Store reviews tracking and analysis