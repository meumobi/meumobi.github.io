---
layout: post
title: 'Manage OneSignal Push Notification on Native AND PWA Ionic v3 App'
categories: [Ionic]
tags: [ionic-v3]
author:
  name: Victor Dias
  email: victor.dias@meumobi.com
  github: elbidone
  twitter: meumobi
  bio: Sharing mobile Experiences
  email_md5: 1cd012be2382e755aa763c66acc7cfa6
---

I'm not sure if the title is clear, I'd like to provide a tutorial on how to manage OneSignal push notification on a Ionic v3 Native and PWA Apps **sharing same source code**. I've worked recently on a Ionic v3 project using OneSignal to handle Push Notification. This project aims to build Native Apps (iOS and Android) AND a PWA website. Deploying Push Notification on Native or PWA Apps is quite easy with OneSignal, but deploying Push for both Native AND PWA using same src code is require som extra works. In other words we'll implement Native Push and a Browser fallback. Hope it sounds clear now, let's go in depth!


Ask before sending: boolean
Permission: Block/Allow
chrome://settings/content/notifications

[OneSignal Cordova SDK](https://documentation.onesignal.com/docs/cordova-sdk)

[Features Setup](https://documentation.onesignal.com/docs/features-setup)
Get the most out of OneSignal by implementing these features. Includes targeting users, customizing notification capabilities, and branding your notifications.
[Web Push Examples](https://documentation.onesignal.com/docs/web-push-custom-code-examples)
[Web Push SDK](https://documentation.onesignal.com/docs/web-push-sdk)