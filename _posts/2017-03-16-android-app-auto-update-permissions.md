---
layout: post
title: Android App Auto-update on Google Play and Permissions Change
categories: [Android, GooglePlay]
tags: []
author:
  name: Victor Dias
  email: victor.dias@meumobi.com
  github: elbidone
  twitter: meumobi
  bio: Sharing mobile Experiences
  email_md5: 1cd012be2382e755aa763c66acc7cfa6
---

Before you download an app on Google Play, you may need to give the app permission to access specific capabilities or information on your device, known as permission groups.
If you have turned on [AUTO UPDATE option](https://support.google.com/googleplay/answer/113412?hl=en) in settings then it would be automatically updated otherwise you will receive notification that "New version is available on play store".
![Google Play Auto-update]({{ site.BASE_PATH }}/assets/media/android/google-play-store-settings-auto-update-apps.jpg)
It will take around 24 hours for giving update notification to users. If you don't observe update it should be due to permissions change on App.

# If you have automatic updates turned on

- For apps built for Android 6.0 and up: You won't need to review or accept permission changes for the app to update. The first time you use a feature that uses a new permission, you can allow or deny the use of that data or capability.

- For other apps: You won't need to review or accept permissions you've already accepted for an app again. If the app needs access to new permissions groups or permissions in the "Other" group, you'll be asked to accept the update even if you've set up automatic updates.

If you prefer to review each update manually, you can turn off auto-updates.

Source: [Control your app permissions on Android 6.0 and up](https://support.google.com/googleplay/answer/6270602?hl=en)

# What about removing a permission ?
Removing a permission will not cause manual update.

Source: [http://stackoverflow.com/questions/17400305/android-app-auto-update-on-google-play-and-permissions-change](http://stackoverflow.com/questions/17400305/android-app-auto-update-on-google-play-and-permissions-change)