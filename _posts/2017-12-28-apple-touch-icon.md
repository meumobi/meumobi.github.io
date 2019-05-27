---
layout: post
title: Setup Apple touch icons
categories: []
tags: [apple, favicon]
author:
  name: Victor Dias
  email: victor.dias@meumobi.com
  github: elbidone
  twitter: meumobi
  bio: Sharing mobile Experiences
  email_md5: 1cd012be2382e755aa763c66acc7cfa6
---

## iOS fallbacks
Apple iOS has a feature called “Add to Home Screen”, which basically makes your mobile website look like an app (it hides the browsers’ address bar and everything). 
You can [tailor your web application for Safari on iOS](https://developer.apple.com/library/content/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html) even further, by making it appear like a native application when the user adds it to the Home screen. You do this by using settings for iOS that are ignored by other platforms.

## Specifying Web App icons
Here’s an updated breakdown of the sizes (px) required:

- 120x120: iPhone Retina (iOS 7)
- 180x180: iPhone 6 Plus (iOS 8+)
- 152x152: iPad Retina (iOS 7)
- 167x167: iPad Pro (iOS 8+)

And the syntax:

```xml
<link rel="apple-touch-icon" href="older-iPhone.png"> // 120px  
<link rel="apple-touch-icon" sizes="180x180" href="iPhone-6-Plus.png">  
<link rel="apple-touch-icon" sizes="152x152" href="iPad-Retina.png">  
<link rel="apple-touch-icon" sizes="167x167" href="iPad-Pro.png"> 
```
Source: [https://sympli.io/blog/2017/02/15/heres-everything-you-need-to-know-about-favicons-in-2017/](https://sympli.io/blog/2017/02/15/heres-everything-you-need-to-know-about-favicons-in-2017/)

See ["Icons and images" section on iOS Human Interface Guidelines](https://developer.apple.com/ios/human-interface-guidelines/icons-and-images/image-size-and-resolution/) for current icon sizes and recommendations.

## Other iOS configurations

- Specifying Launch Screen Image
- Specifying Launch Icon Title
- Hiding Safari User Interface Components
- Changing the Status Bar Appearance
