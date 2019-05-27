---
layout: post
title: How to Download files in Cordova App
categories: [cordova]
tags: []
author:
  name: Victor Dias
  email: victor.dias@meumobi.com
  github: elbidone
  twitter: meumobi
  bio: Sharing mobile Experiences
  email_md5: 1cd012be2382e755aa763c66acc7cfa6
---

Quick post about download of files on Cordova, 3 main options: [cordova-open plugin](https://www.npmjs.com/package/cordova-open), [fileOpener2 plugin](https://www.npmjs.com/package/cordova-plugin-file-opener2) or [InappBrowser plugin](https://www.npmjs.com/package/cordova-plugin-inappbrowser)

## InappBrowser
If you handle remote files, use IAB to open file on a new webview. Use target param to choose within app or new webview.

## Cordova-open
### cordova-open for Android 
cordova-open for Android use `MimeTypeMap.getFileExtensionFromUrl(path)`
Then if the uri not contains the extension of file it couldn't find the appropriate App to open.

### cordova-open for iOS
cordova-open for iOS call QuickLook, no matter if file contains or not a file extension.

## fileOpener2
fileOpener2 ask developer to provide the mime-type

> https://github.com/meumobi/IRmobi/issues/218