
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
$ ionic cordova prepare android
> cordova platform add android --save
> ng run app:ionic-cordova-build --platform=android
> cordova prepare android

To run app on connected device requires native-run `npm i -g native-run`
OBS: -l option for livereload
$ ionic cordova run android
> ng run app:ionic-cordova-build --platform=android
> cordova build android --device

$ ionic cordova platform remove android
> cordova platform remove android

$ rm -rf plugins/


$ adb install -r platforms/android/build/outputs/apk/android-debug.apk
=============

<ion-avatar tappable routerLink="/profiles/edit/{{ profile.id }}">
