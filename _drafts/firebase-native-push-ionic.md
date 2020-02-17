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

Everybody daily face huge number of permission requests to receive push. But, as mobile Web/Native App developer do we know/understand how it works beyond the screen? is it a notification message, data message or in-app message ? We'll try to define these options and show how to implement them on Ionic/Angular app with Firebase Cloud Messagging.

[FCM](https://firebase.google.com/docs/cloud-messaging) Key capabilities

Send notification messages or data messages	Send notification messages that are displayed to your user. Or send data messages and determine completely what happens in your application code.

Versatile message targeting	Distribute messages to your client app in any of 3 ways—to single devices, to groups of devices, or to devices subscribed to topics.

Send messages from client apps	Send acknowledgments, chats, and other messages from devices back to your server over FCM’s reliable and battery-efficient connection channel.

## Implementation path

This post is part of the ongoing Ionic4/Angular with Firebase serie, where we cover common use cases. Here is the full serie:

- [Master-detail on Ionic4]({% post_url 2018-10-18-implementing-master-detail-ionic4 %})
- [Login flow on Ionic4]({% post_url 2018-10-19-login-flow-ionic4 %})
- [Login flow with Firebase custom auth]({% post_url 2019-07-03-login-flow-with-firebase-custom-auth %})
- [master-detail native App deeplink]({% post_url 2019-08-19-ionic-master-detail-deeplinks %})
- [CRUD APP with Ionic 4, Firestore and AngularFire 5.2+]({% post_url 2019-05-29-crud-ionic4-firebase %})
- [Add Web Push Support on Ionic PWA with Firebase Cloud Messaging and AngularFire]({% post_url 2020-01-20-firebase-web-push-ionic %})

## Repository & demo

Demo app is deployed on [firebase-native-push-ionic4.web.app](https://firebase-native-push-ionic4.web.app)

All source code can be found on GitHub: [https://github.com/meumobi/mmb-demos.firebase-native-push-ionic4](https://github.com/meumobi/mmb-demos.firebase-native-push-ionic4)

## What you'll build
We are going to create a demo to show basic behaviors/actions related to native push.

1. Request permission
2. Get token
3. Send push
4. Handle push notification on when app is on background, foreground and closed.
4. Open a specific page when click on notification
5. Send In-app message

We'll use [Ionic] for UI with [Angular], [Firebase Cloud Messaging] as cross-platform messaging solution and [AngularFireMessaging], the official Angular library for Firebase.

<!-- Add screenshots here -->

## What you'll need
We need to have [Node.js] and [Git] installed in order to install [Ionic]. And of course you'll also need a [Firebase] account.

## Methodology
Each main section below corresponds to a visible milestone of the project, where you can validate work on progress running App.

1. Create a project
2. Register Apps (iOS, Android) on Firebase console
2. Run & deploy the application
3. Add Firebase to your project
4. Add Cordova plugin to handle messages
5. Create FcmService
6. Adding Push config to the Web Manifest
7. Requesting Permission

## Understand push notifications

data mesage
notification message
Later we'll see In-app messages

App is closed
App is on background
App is on foreground

when your app is in the background or not running, the OS will display a system notification

## Create a project

```
$ ionic start mmb-demos.firebase-native-push-ionic blank --type=angular --cordova --package-id=com.meumobi.demos.push
```

Because Android package name can't use dash (hyphen), and iOS not allows underscore, then we set a package-id slightly different than project name

## Register Apps on Firebase console
Register Android and iOS Apps on firebase and download resp. `google-services.json` and `GoogleService-info.plist`

## Run & deploy the application

## Add Firebase to your project

### Create a Firebase project
[Create a Firebase project](https://firebase.google.com/docs/web/setup#create-firebase-project)

### Register your app with Firebase
[Register your app with Firebase](https://firebase.google.com/docs/web/setup#register-app)

### Add Firebase SDKs and initialize Firebase

The official [AngularFire](https://github.com/angular/angularfire/blob/master/docs/install-and-setup.md) library has many modules to help us interact with the different Firebase features, it includes FCM ([Firebase Cloud Messaging]) through [AngularFireMessaging](https://github.com/angular/angularfire/blob/master/docs/messaging/messaging.md).


```bash
$ npm install @angular/fire firebase --save
```

Copy your firebase config (get from firebase console) to  
**src/environments/environment.ts**

```js
export const environment = {
  production: false,
  firebase: {
    apiKey: '<your-key>',
    authDomain: '<your-project-authdomain>',
    databaseURL: '<your-database-URL>',
    projectId: '<your-project-id>',
    storageBucket: '<your-storage-bucket>',
    messagingSenderId: '<your-messaging-sender-id>'
    appId: '<your-app-id>',
    measurementId: '<your-measurement-id>'
  }
};
```

And Import it on App Module with required AngularFire modules.
**src/app/app.module.ts**
```js
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireMessaging } from '@angular/fire/messaging';
...

@NgModule({
  imports: [
    ...
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [
    ...
    AngularFireMessaging,
  ],
  ...
})
export class AppModule {}
```

## Add Cordova plugin to handle messages
### Plenty of Cordova plugins to handle FCM
If you search on [@ionic-native](https://ionicframework.com/docs/native) you'll find several Cordova plugins to handle push notification, I've checked the main repos focused on FCM:

- [@ionic-native/firebase](https://ionicframework.com/docs/native/firebase)
  - lib: [cordova-plugin-firebase](https://github.com/arnesson/cordova-plugin-firebase): 968 stars, 73 contributors, last commit 5 Apr. 2019, 406K Google results
- [@ionic-native/fcm](https://ionicframework.com/docs/native/fcm)
  - lib: [cordova-plugin-fcm-with-dependecy-updated](https://github.com/andrehtissot/cordova-plugin-fcm-with-dependecy-updated): 80 stars, 17 contributors, last commit 10 Dec. 2019, 1840 Google results
  - [Example by Riley Lambert](https://morioh.com/p/c0bc44ba6fcb)
  - [Example by DjamWare](https://www.djamware.com/post/5c6ccd1f80aca754f7a9d1ec/push-notification-using-ionic-4-and-firebase-cloud-messaging)
  - [Example by JaveBratt](https://javebratt.com/ionic-push-notification/)
- [@ionic-native/firebase-messaging](https://ionicframework.com/docs/native/firebase-messaging)
  - lib: [cordova-plugin-firebase-messaging](https://github.com/chemerisuk/cordova-plugin-firebase-messaging): 89 stars, 5 contributors, last commit 27 Dec. 2019, 640 Google results
- [@ionic-native/firebase-x](https://ionicframework.com/docs/native/firebase-x)
  - lib: [cordova-plugin-firebasex](https://github.com/dpa99c/cordova-plugin-firebasex): 224 stars, 91 contributors, last commit 3 Dec. 2019, 222 Google results

Since the breaking change released by Google Firebase on Jun 17th, 2019 the "Official" [cordova-plugin-firebase](https://github.com/arnesson/cordova-plugin-firebase) (at least most used by community) [stop working](https://github.com/arnesson/cordova-plugin-firebase/issues/1057) and 2 forks raised [cordova-plugin-firebase-lib](https://github.com/wizpanda/cordova-plugin-firebase-lib) maintained by [Wiz Panda](https://www.wizpanda.com/) and [cordova-plugin-firebasex](https://ionicframework.com/docs/native/firebase-x) maintain by [Dave Alden](https://github.com/dpa99c). Both maintainers discussed in a [thread](https://github.com/dpa99c/cordova-plugin-firebasex/issues/47) and together decided to archive cordova-plugin-firebase-lib and divert the developers to Firebase X.

### Install cordova-plugin-firebasex

```
$ cordova plugin add cordova-plugin-firebasex
$ npm install @ionic-native/firebase-x --save
```

import { FirebaseX } from "@ionic-native/firebase-x/ngx";
constructor(private firebase: FirebaseX)




> Most importantly, I specified that you had to register the plugin in an NgModule as a provider

Source: https://github.com/dpa99c/cordova-plugin-firebasex/pull/265

## Create FcmService

```
$ ng g service core/push-notification/fcm
CREATE src/app/core/push-notification/fcm.service.spec.ts (318 bytes)
CREATE src/app/core/push-notification/fcm.service.ts (132 bytes)
```


```
import { Injectable } from '@angular/core';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { AngularFirestore } from '@angular/fire/firestore';
import { Platform } from '@ionic/angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FcmService {

  constructor(
    private firebase: FirebaseX,
    private db: AngularFirestore,
    private platform: Platform
  ) { }

  async getToken() {
    let token: string;
    if (this.platform.is('android')) {
      token = await this.firebase.getToken();
    } else if (this.platform.is('ios')) {
      token = await this.firebase.getToken();
      await this.firebase.grantPermission();
    }

    console.log(`The token is ${token}`);

    return this.saveTokenToFirestore(token);
  }

  async hasPermission() {
    const hasPermission = await this.firebase.hasPermission();
    console.log('Permission is: '  + (hasPermission ? 'granted' : 'denied'));

    return hasPermission;
  }

  private saveTokenToFirestore(token): Promise<void> {
    if (!token) { return; }

    const devicesRef = this.db.collection('devices');

    const docData = {
      token,
      userId: 'testUser' // get from auth user
    };

    return devicesRef.doc(token).set(docData);
  }

  listenToNotifications(): Observable<any> {
    return this.firebase.onMessageReceived();
  }
}
```

When device is open, it is the developer responsability to handle the notification


Create fcmService to save token and listen notifications

## Handle messages
Now we have a the `FcmSservice` to communicate with cordova plugin we can call it wherever we want on our application, we'll do it on `app.component`.

```
...
export class AppComponent implements OnInit {
...
  ngOnInit() {
    this.fcmService.hasPermission();
    this.fcmService.getToken();
    this.fcmService.listenToNotifications().pipe(
      tap(msg => {
        this.presentToast(msg);
      })
    ).subscribe();
  }
...
}
```



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
`ng run app:ionic-cordova-build` Generate ES5 bundles

[cordova prepare](https://cordova.apache.org/docs/en/latest/reference/cordova-cli/#cordova-prepare-command) copy files into platform(s) for building
[cordova platform add](https://cordova.apache.org/docs/en/latest/reference/cordova-cli/#cordova-platform-command) install plugin and add them on package.json, ex.:

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

$ ionic cordova run ios
> ng run app:ionic-cordova-build --platform=ios
> cordova build ios --device
> $ native-run ios --app platforms/ios/build/device/mmb-demos.firebase-native-push-ionic4.ipa --device

$ ionic cordova platform remove android
> cordova platform remove android

$ rm -rf plugins/

$ adb devices -l
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

## Good pratices for good notifications

It's up to you to use this post to "artificially re-engage users and force content down their throat" as said by [Stéphanie Walter](https://twitter.com/walterstephanie) on its great post [The Ultimate Guide to Not F#!@ing Up Push Notifications](https://stephaniewalter.design/blog/the-ultimate-guide-to-not-fck-up-push-notifications/), but I recommend to read about good practices and respect some basic rules:

> Provide value to users before asking them to receive your app’s notifications; tell them what the notifications will be about. Don’t send notifications in bursts; make it easy to turn them off.

Source: [Five Mistakes in Designing Mobile Push Notifications](https://www.nngroup.com/articles/push-notification/)

## Furthermore

- [Ionic Native With Firebase FCM Push Notifications](https://angularfirebase.com/lessons/ionic-native-with-firebase-fcm-push-notifications-ios-android/)
- [How to add Push Notifications in your Cordova application using Firebase](https://medium.com/@felipepucinelli/how-to-add-push-notifications-in-your-cordova-application-using-firebase-69fac067e821)
- [Push Notification on Ionic 4 using Firebase (FCM) with Postman Request](https://medium.com/@abdulahad.momin07/push-notification-on-ionic-4-using-firebase-fcm-with-postman-request-15c0b33d7bbb)

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




Foreground
body: "Conecte-se com sua organização"
collapse_key: "com.meumobi.demos.push"
from: "581248963506"
icon: "fcm_push_icon"
id: "6tGlT1eRYyoHBRP6yLSq"
messageType: "notification"
notification_foreground: "true"
sent_time: "1581387256700"
show_notification: "true"
sound: "default"
title: "Bem vindo a infomobi"
ttl: "2419200"
type: "items"

Tapped on background


collapse_key: "com.meumobi.demos.push"
from: "581248963506"
google.delivered_priority: "high"
google.message_id: "0:1581386929379706%f36dd30df36dd30d"
google.original_priority: "high"
google.sent_time: 1581386929370
google.ttl: 2419200
id: "6tGlT1eRYyoHBRP6yLSq"
messageType: "notification"
notification_foreground: "true"
tap: "background"
type: "items"

Tapped closed

collapse_key: "com.meumobi.demos.push"
from: "581248963506"
google.delivered_priority: "high"
google.message_id: "0:1581387132327712%f36dd30df36dd30d"
google.original_priority: "high"
google.sent_time: 1581387132320
google.ttl: 2419200
id: "6tGlT1eRYyoHBRP6yLSq"
messageType: "notification"
notification_foreground: "true"
tap: "background"
type: "items"


=== background
aps: {alert: {title: "Bem vindo a infomobi!", body: "Conecte-se com sua organização"}, sound: "default"}

gcm.message_id: "1581529388050227"

google.c.a.e: "1"

id: "6tGlT1eRYyoHBRP6yLSq"

messageType: "notification"

notification_foreground: "true"

tap: "background"

type: "items"

Object Prototype


==== App on foreground I receive notification

aps: {alert: {title: "Bem vindo a infomobi!", body: "Conecte-se com sua organização"}, sound: "default"}

gcm.message_id: "1581529531141966"

google.c.a.e: "1"

id: "6tGlT1eRYyoHBRP6yLSq"

messageType: "notification"

notification_foreground: "true"

type: "items"

Object Prototype

==== App on foreground I click on notification
aps: {alert: {title: "Bem vindo a infomobi!", body: "Conecte-se com sua organização"}, sound: "default"}

gcm.message_id: "1581529531141966"

google.c.a.e: "1"

id: "6tGlT1eRYyoHBRP6yLSq"

messageType: "notification"

notification_foreground: "true"

tap: "foreground"

type: "items"

Object Prototype


## Testing
[Migrate from legacy HTTP to HTTP v1](https://firebase.google.com/docs/cloud-messaging/migrate-v1)
[Build app server send requests](https://firebase.google.com/docs/cloud-messaging/send-message)


[Messages sent to an FCM TOPICS are public](https://stackoverflow.com/a/42291098/4982169)
