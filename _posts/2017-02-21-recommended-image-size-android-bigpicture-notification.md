---
layout: post
title: Recommended Image Size in Android BigPicture Push Notification
categories: [android]
tags: [push]
author:
  name: Victor Dias
  email: victor.dias@meumobi.com
  github: elbidone
  twitter: meumobi
  bio: Sharing mobile Experiences
  email_md5: 1cd012be2382e755aa763c66acc7cfa6
---
Android 4.1 and newer devices support a [BigPicture](https://developer.android.com/reference/android/app/Notification.BigPictureStyle.html) that will show below your notification text when it is expanded. But to not see your image cropped you should follow some rules.
![Android BigPictureStyle]({{ site.BASE_PATH }}/assets/media/android/bigpicture.png)

The big picture can be located in your drawable folders, your assets folder in your app, or it can be loaded remotely from a server with a URL.

# Aspect ratio
According to [Google I/O 2012](http://commondatastorage.googleapis.com/io2012/presentations/live%20to%20website/105.pdf) (Page 77)
> Images should be ≤ 450dp wide, ~2:1 aspect
Bitmaps outside these bounds will just be wasting
RAM (and possibly exceeding Binder IPC limits)

But it's common to crop the image if image is a 2:1 aspect ratio.
To prevent crop main content should be in 43:24 ratio (~1.79) as some devices crop past this width. 

# Size limit
Android has not a size limit however [onesignal](https://documentation.onesignal.com/docs/android-customizations#section-big-picture) recommend minimum, balanced, and maximum sizes below:

- Minimum - 512x256
- Balanced - 1024x512
- Maximum - 2048x1024

