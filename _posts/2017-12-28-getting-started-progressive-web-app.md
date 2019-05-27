---
layout: post
title: Getting started with Progressive Web Apps (PWA)
categories: [PWA]
tags: []
author:
  name: Victor Dias
  email: victor.dias@meumobi.com
  github: elbidone
  twitter: meumobi
  bio: Sharing mobile Experiences
  email_md5: 1cd012be2382e755aa763c66acc7cfa6
---

[The new and improved 'Add to Home screen'](https://medium.com/dev-channel/the-new-and-improved-add-to-home-screen-1f79bdd464b0) and [HTML5 APIs](https://whatwebcando.today/) running fast to provide best device features integration on Web Browser, are getting PWAs closer to Native App behaviours. And since [Service Worker API support in Safari changed to in development](https://mobiforge.com/news-comment/safari-service-workers-and-other-pwa-good-news-stories), meaning Safari is going to support service workers, the full potential of PWAs is opened up to developers and users.
![PWA logo]({{ site.BASE_PATH }}/assets/media/pwa/logo.svg)
And you can now share the PWA [community-approved logo](https://medium.com/samsung-internet-dev/we-now-have-a-community-approved-progressive-web-apps-logo-823f212f57c9), [customized with your own primary color](https://diekus.net/logo-pwinter/). So everything is ready for the launch!

> Progressive Web app = UX of apps + reach of the Web. 

# PWA in few words
> Progressive web apps (PWAs) are an open-source initiative driven by Google that uses modern web capabilities to deliver app-like experiences to users, promising a better experience than either native apps or the mobile web. Because the framework is still relatively new, it is not supported by all browsers nor does it support some native features.

Source: [Can progressive web apps solve the app vs. browser dilemma?](https://www.mobilemarketer.com/news/can-progressive-web-apps-solve-the-app-vs-browser-dilemma/510344/)

# Web Manifest and Service Workers
The web manifest and Service Workers are what officially make our app a PWA. Let’s take a look at these two features.

## Web manifest
A web app manifest file is a simple JSON file that follows the [W3C’s specification](https://w3c.github.io/manifest/). With it, it is possible to: 

- run the web app in full-screen mode as a standalone application
- assign an icon that will get displayed when the application is installed on the device
- assign a theme and background color to the app. 

In addition, Chrome on Android will proactively suggest that the user install the web app, via a web app install banner. To display the installation prompt, your web app needs to:

- have a valid web app manifest file,
- be served over HTTPS,
- have a valid service worker registered,
- have been visited twice, with at least five minutes between each visit.

You can edit manually your own manifest or use a generator, see a list of them below:

- [Web App Manifest Generator](https://app-manifest.firebaseapp.com/)
- [Manifest Generator](http://brucelawson.github.io/manifest/)

You can check below an example of `manifest.json` or take a look of more complex [example of manifest](https://whatwebcando.today/manifest.json):

```
{
  "name": "My App",
  "short_name": "My App",
  "start_url": "index.html",
  "display": "standalone",
  "icons": [{
    "src": "assets/imgs/logo.png",
    "sizes": "512x512",
    "type": "image/png"
  }],
  "background_color": "#4e8ef7",
  "theme_color": "#4e8ef7"
}
```

Let’s break down this manifest file:

- [Background-color](https://developers.google.com/web/updates/2015/08/using-web-app-manifest-to-set-solid-color-loading-screen): the color will be used by Chrome the instant the web app is launched from the home screen and will remain on the screen until the web app's first render.
- [Theme_color](https://developers.google.com/web/updates/2015/08/using-manifest-to-set-sitewide-theme-color): the theme color is a hint from your web page that tells the browser what color to tint UI elements such as the address bar.
- [icons](https://developers.google.com/web/fundamentals/web-app-manifest/#customize_the_icons): when a user adds your site to their home screen, you can define a set of icons for the browser to use. We recommend using [Launcher icon generator](https://romannurik.github.io/AndroidAssetStudio/icons-launcher.html).
- [Display](https://developers.google.com/web/fundamentals/web-app-manifest/#customize_the_display_type)

When ready you can use a [Web Manifest Validator](https://manifest-validator.appspot.com/) to check everything is fine.

## Service workers
https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
A [Service worker](https://developers.google.com/web/fundamentals/primers/service-workers/) is a script that your browser runs in the background, separate from a web page, opening the door to features that don't need a web page or user interaction. Today, they already include features like push notifications and background sync. In the future, service workers will support other things like periodic sync or geofencing. 

### Push notification
Web Apps with Service workers can use Push Notifications to drive engagement, even when the browser app isn't open.

### Caching
Service worker allows developers to cache assets when connected, and intercept failed calls to network when offline, so user experiencen be maintained.
Faster loading of assets even when offline.

# Audit your PWA
[Lighthouse](https://developers.google.com/web/tools/lighthouse/) is an open-source, automated tool for improving the quality of web pages. You can run it in Chrome DevTools against any web page. It has audits for performance, accessibility, progressive web apps, and more.


![Lighthouse]({{ site.BASE_PATH }}/assets/media/pwa/lighthouse-report.png)

# CSS display-mode: standalone
The [display-mode](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/display-mode) CSS @media media feature can be used to apply styles based on the display mode of an application. You can use it to provide a consistant user experience between launching a site from a URL and launching it from a desktop icon.

This feature corresponds to the Web app manifest's display member. Both apply to the top-level browsing context and any child browsing contexts. The feature query applies regardless of whether a web app manifest is present.

Example:

```
@media (display-mode: standalone) {
...
}
```

# PWA tracking with Web Analytics

## Track PWA users
You can track the usage of your application using standard Web Analytics tools like Google Analytics. To make PWA users and installs distinct, you should add source and campaign parameters to your manifest.json file’s start_url value:

`"start_url": "/index.html?home_screen_launch=true"`

You can easily navigate to the GA traffic acquisition section and find users who have accessed your application with this URL.

## Track PWA install versions
Ideally you will dynamically generate your manifest file so that the date is always current. Adding the following snippet to your app url will allow you to identify users of your PWA based on the original installation date:

`&utm_campaign=pwa_install_YYYYMMDD`

Source: [Progressive Web App (PWA) Usage and tracking with Web Analytics](https://malloc.fi/pwa-usage-and-tracking-with-web-analytics)

# PWA Cases

- [FeedGist: A Progressive Web App Case Study](https://www.biggerpicture.agency/insights/feedgist-a-progressive-web-app-case-study)
- [A Beginner's Guide To Progressive Web Apps](https://www.smashingmagazine.com/2016/08/a-beginners-guide-to-progressive-web-apps/)
- [Exploring PWA to Enhance eBay’s Mobile Experience](https://www.ebayinc.com/stories/news/exploring-progressive-web-apps-to-enhance-ebays-mobile-experience)

# Furthermore

- [PWA Police: List of PWA Bugs and workarounds](https://github.com/PWA-POLICE/pwa-bugs?utm_source=mobiledevweekly&utm_medium=email#problem--push-notifications-are-not-supported)
- [Anatomy of a Progressive Web App](https://www.slideshare.net/mikelnorth/anatomy-of-a-progressive-web-app)
- [MDN web docs: Using Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers)
- [Service Workers: Revolution Against the Network!](https://blog.ionicframework.com/service-workers-revolution-against-the-network/)

- [Progressive Web Apps: Bridging the gap between web and mobile apps](https://medium.freecodecamp.org/progressive-web-apps-bridging-the-gap-between-web-and-mobile-apps-a08c76e3e768)
- [Progressive Web Apps core guides on MDN Web Docs](https://hacks.mozilla.org/2018/05/progressive-web-apps-core-guides-on-mdn-web-docs/)
- [LUKEW: An Event Apart: Designing Progressive Web Apps](https://www.lukew.com/ff/entry.asp?1998)
- [Getting Started with Service Workers](https://alligator.io/js/service-workers/)
- [Building a progressive web app (PWA): No React, no Angular, no Vue](https://blog.logrocket.com/building-a-progressive-web-app-pwa-no-react-no-angular-no-vue-aefdded3b5e)
- [Building A PWA Using Angular 6](https://www.smashingmagazine.com/2018/09/pwa-angular-6)