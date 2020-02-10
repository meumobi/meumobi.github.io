---
layout: post
title: Add Push Notification Support on Native Ionic App with Firebase Cloud Messaging and AngularFire
categories: [Ionic, Firebase]
tags: [Firebase, AngularFire, Push, FCM]
author:
  name: Victor Dias
  email: victor.dias@meumobi.com
  github: elbidone
  twitter: meumobi
  bio: Sharing mobile Experiences
  email_md5: 1cd012be2382e755aa763c66acc7cfa6
---

This post continues our serie on Ionic 4/Angular + Firebase Stack, as always we use AngularFire to connect our client App to Firebase SDK. The 

## Repository & demo

Demo app is deployed on [mmb-demos.firebase-native-push-ionic4](https://firebase-native-push-ionic4.web.app)

All source code can be found on GitHub: [https://github.com/meumobi/mmb-demos.firebase-native-push-ionic4](https://github.com/meumobi/mmb-demos.firebase-native-push-ionic4)

## What you'll build
We are going to create a demo to show basic behaviors/actions related to native push.

1. Request permission
2. Get token
3. Send push
4. Open a specific page when click on notification

We'll use [Ionic] for UI with [Angular], [Firebase Cloud Messaging] as cross-platform messaging solution and [AngularFireMessaging], the official Angular library for Firebase.

<!-- Add screenshots here -->

## What you'll need
We need to have [Node.js] and [Git] installed in order to install [Ionic]. And of course you'll also need a [Firebase] account.

## Methodology
Each main section below corresponds to a visible milestone of the project, where you can validate work on progress running App.

1. Create a project
2. Run & deploy the application
3. Add Firebase to your Ionic/Angular project
4. Make Ionic 4/Angular app a PWA
5. Add FCM Service worker
6. Adding Push config to the Web Manifest
7. Requesting Permission

## Create a project

$ ionic start mmb-demos.firebase-native-push-ionic blank --type=angular --cordova --package-id=com.meumobi.demos.push

Because Android package name can't use dash (hyphen), and iOS not allows underscore, then we set a package-id slightly different than project name

## Register Apps on Firebase console
Register Android and iOS Apps on firebase and download resp. google-services.json and GoogleService-info.plist

## AngularFire
### Add AngularFire
[AngularFire](https://github.com/angular/angularfire/blob/master/docs/install-and-setup.md)

### Add AngularFireMesagingModule

[Setup AngularFireMessaging](https://github.com/angular/angularfire/blob/master/docs/messaging/messaging.md)

## cordova-plugin-firebasex

[@ionic-native/fcm](https://ionicframework.com/docs/native/fcm)
[cordova-plugin-fcm-with-dependecy-updated](https://github.com/andrehtissot/cordova-plugin-fcm-with-dependecy-updated)
80 stars, 17 contributors, last commit 10 Dec. 2019, 1840 Google results
[Example by Riley Lambert](https://morioh.com/p/c0bc44ba6fcb)
[Example by DjamWare](https://www.djamware.com/post/5c6ccd1f80aca754f7a9d1ec/push-notification-using-ionic-4-and-firebase-cloud-messaging)
[Example by JaveBratt](https://javebratt.com/ionic-push-notification/)

[@ionic-native/firebase-messaging](https://ionicframework.com/docs/native/firebase-messaging)
[cordova-plugin-firebase-messaging](https://github.com/chemerisuk/cordova-plugin-firebase-messaging)
89 stars, 5 contributors, last commit 27 Dec. 2019, 640 Google results

[@ionic-native/firebase-x](https://ionicframework.com/docs/native/firebase-x)
[cordova-plugin-firebasex](https://github.com/dpa99c/cordova-plugin-firebasex)
224 stars, 91 contributors, last commit 3 Dec. 2019, 222 Google results

[@ionic-native/push](https://ionicframework.com/docs/native/push)
[phonegap-plugin-push](https://github.com/phonegap/phonegap-plugin-push)
2K stars, 143 contributors, last commit 19 Sep. 2019, 6090 Google results

I've found the[phonegap-plugin-push] docs confused and outdated. It's a generic plugin, not focus on FCM, and following line definitely convince me to bounce far away:
> For the time being push support on the browser will only work using the PhoneGap push server.



[cordova-plugin-firebasex](https://ionicframework.com/docs/native/firebase-x)
Follow official install instructions of both packages

cordova plugin add cordova-plugin-firebasex
npm install @ionic-native/firebase-x --save

import { FirebaseX } from "@ionic-native/firebase-x/ngx";
constructor(private firebase: FirebaseX)

Since the breaking change released by Google Firebase on Jun 17th, 2019 the "Official" (at least most used by community) [stop working](https://github.com/arnesson/cordova-plugin-firebase/issues/1057) and 2 forks raised [cordova-plugin-firebase-lib](https://github.com/wizpanda/cordova-plugin-firebase-lib) maintained by [Wiz Panda](https://www.wizpanda.com/) and [cordova-plugin-firebasex](https://ionicframework.com/docs/native/firebase-x) maintain by [Dave Alden](https://github.com/dpa99c). Both maintainers discussed in a [thread](https://github.com/dpa99c/cordova-plugin-firebasex/issues/47) and together decided to archive cordova-plugin-firebase-lib and divert the developers to Firebase X.


> Most importantly, I specified that you had to register the plugin in an NgModule as a provider

Source: https://github.com/dpa99c/cordova-plugin-firebasex/pull/265

## Create FcmService
$ ng g service core/push-notification/fcm
CREATE src/app/core/push-notification/fcm.service.spec.ts (318 bytes)
CREATE src/app/core/push-notification/fcm.service.ts (132 bytes)

When device is open, it is the developer responsability to handle the notification


Create fcmService to save token and listen notifications

## Handle notifications
Update app.component to handle notifications

Run App on local device
```
$ ionic cordova prepare android
> cordova platform add android --save
...
> ng run app:ionic-cordova-build --platform=android
...
> cordova prepare android
cordova-plugin-androidx-adapter: Processed 24 Java source files in 699ms
cordova-plugin-firebasex: Preparing Firebase on Android
$
```

[cordova prepare](https://cordova.apache.org/docs/en/latest/reference/cordova-cli/#cordova-prepare-command) copy files into platform(s) for building
[cordova platform add](https://cordova.apache.org/docs/en/latest/reference/cordova-cli/#cordova-platform-command) install plugin and add them on package.json, ex.:
`ng run app:ionic-cordova-build` Generating ES5 bundles

```
Discovered saved plugin "cordova-plugin-firebasex". Adding it to the project
Installing "cordova-plugin-firebasex" for android
Installing "cordova-plugin-androidx" for android
Installing "cordova-plugin-androidx-adapter" for android
Subproject Path: CordovaLib
Subproject Path: app
Adding cordova-plugin-firebasex to package.json
```

To run app on connected device requires native-run `npm i -g native-run`
OBS: -l option for livereload
$ ionic cordova run android -l
> ng run app:ionic-cordova-serve --host=localhost --port=8100 --platform=android
> cordova build android --device
> native-run android --app platforms/android/app/build/outputs/apk/debug/app-debug.apk --device --forward 8100:8100

$ ionic cordova run android
> ng run app:ionic-cordova-build --platform=android
> cordova build android --device
> native-run android --app platforms/android/app/build/outputs/apk/debug/app-debug.apk --device

$ ionic cordova platform remove android
> cordova platform remove android

$ rm -rf plugins/


$ adb install -r platforms/android/build/outputs/apk/android-debug.apk
=============



$ ionic cordova prepare ios
> cordova platform add ios --save


Running command: pod install --verbose
Failed to install 'cordova-plugin-firebasex': Error: pod: Command failed with exit code 31

$ cd platforms/ios
$ rm Podfil.lock
$ vi Podfile (set all firebase same version)
$ cd ../..



FirebaseAnalytics 5.8.1
FirebaseDynamicLinks 3.4.3
FirebaseCore 5.4.1
FirebaseAuth 5.4.2
FirebaseMessaging 3.5.0
FirebasePerformance 2.2.4
FirebaseRemoteConfig 3.1.0


Installing Firebase 6.13.0 (was 6.3.0)
Installing FirebaseABTesting (3.1.2)
Installing FirebaseAnalytics 6.1.6 (was 6.0.2 and source changed to `https://cdn.cocoapods.org/` from `trunk`)
Installing FirebaseAuth (6.4.2)
Installing FirebaseAuthInterop (1.0.0)
Installing FirebaseCore 6.4.0 (was 6.0.3 and source changed to `https://cdn.cocoapods.org/` from `trunk`)
Installing FirebaseCoreDiagnostics (1.2.0)
Installing FirebaseCoreDiagnosticsInterop (1.2.0)
Installing FirebaseDynamicLinks 4.0.6 (was 4.0.1 and source changed to `https://cdn.cocoapods.org/` from `trunk`)
Installing FirebaseMessaging (4.1.10)
Installing FirebasePerformance (3.1.7)
Installing FirebaseRemoteConfig (4.4.6)


https://ionicframework.com/docs/building/ios


### Deeplink: go to a specific page when clicking on a notification

https://forum.ionicframework.com/t/go-to-a-specific-page-when-clicking-on-a-notification/123738
https://enappd.com/blog/implement-ionic-4-firebase-push/34/

[Node.js]: <https://nodejs.org/en/download/>
[Git]: <http://git-scm.com/download>
[Ionic]: <https://ionicframework.com/>
[Cordova]: <https://cordova.apache.org/>
[AngularFirestore]: <https://github.com/angular/angularfire#cloud-firestore>
[Angular]: <https://angular.io/>
[Firebase]: <https://firebase.google.com/>
[Firestore]: <https://firebase.google.com/products/firestore/>
[Firebase Authentication]:<https://firebase.google.com/docs/auth>
[Firebase Cloud Messaging]:<https://firebase.google.com/docs/cloud-messaging>
[AngularFireMessaging]:<https://github.com/angular/angularfire/blob/master/docs/messaging/messaging.md>