---
layout: post
title: Enable web push on Ionic PWA
categories: [Ionic, PWA]
tags: [push, onesignal]
author:
  name: Victor Dias
  email: victor.dias@meumobi.com
  github: elbidone
  twitter: meumobi
  bio: Sharing mobile Experiences
  email_md5: 1cd012be2382e755aa763c66acc7cfa6
---

# How to make PWAs with Ionic
Progressive web apps have arrived! I've decided to write this post to complete a previous posted by Ionic team itself with same title [How to make PWAs with Ionic](http://blog.ionicframework.com/how-to-make-pwas-with-ionic/). 

- enable the service worker
- comment cordova.js import script on index.html
- update web manifest


How to check on chrome settings if a website is blocked/allowed to send push and update it.
chrome://settings/content/notifications?search=notification

Notify users when something interesting happens
https://firebase.google.com/docs/functions/use-cases#notify_users_when_something_interesting_happens

Cloud Function: Send Firebase Cloud Messaging notifications for new followers.
https://github.com/firebase/functions-samples/tree/master/fcm-notifications

Install OneSignal Plugin 
https://ionicframework.com/docs/native/onesignal/
https://documentation.onesignal.com/docs/ionic-sdk-setup

Push Notifications in Your Ionic App with Onesignal
http://brianyang.com/push-notifications-in-your-ionic-app-with-onesignal/


# How do I see my desktop notification history on Chrome ? 

> Unfortunately, there's no way to find the history of the notifications in Chrome

Source: [Google Chrome Help Forum](https://productforums.google.com/forum/#!topic/chrome/TUM6zhHSXrs)

# Furthermore

- [ionic whitepaper Architect's Guide to PWAS](https://cdn2.hubspot.net/hubfs/3776657/PWA_WP_v6.pdf)
- [Publishing an Ionic Progressive Web App](http://masteringionic.com/blog/2018-03-05-publishing-an-ionic-progressive-web-app-part-3)