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

Push notification is a great feature to re-engage users on mobile App, and Web since the raise of APIs [Push](https://caniuse.com/#feat=push-api) and [Service workers](https://caniuse.com/#feat=serviceworkers). There are plenty of successful use cases as chats, deliveries, appointments, meetings, etc. where notification make the difference.
Firebase Cloud Messaging (FCM) provides a complete API and single interface to manage Android and iOS notifications for native Apps and Web. On this post we'll focus on Push Notification Support on Native Ionic App with FCM.

## Message types
With FCM, you can send two [types of messages](https://firebase.google.com/docs/cloud-messaging/concept-options#notifications_and_data_messages) to clients:

- **Notification messages**, sometimes thought of as "display messages." These are handled by the FCM SDK automatically.
- **Data messages**, which are handled by the client app.

Use notification messages when you want FCM to handle displaying a notification on your client app's behalf. Use data messages when you want to process the messages on your client app.

Notification messages contain a predefined set of user-visible keys. Data messages, by contrast, contain only your user-defined custom key-value pairs.

Notification messages are delivered to the notification tray when the app is in the background. For apps in the foreground, messages are handled by a callback function.

Notification messages can contain an optional data payload.

[FCM](https://firebase.google.com/docs/cloud-messaging) Key capabilities

Send notification messages or data messages	Send notification messages that are displayed to your user. Or send 

Versatile message targeting	Distribute messages to your client app in any of 3 ways—to single devices, to groups of devices, or to devices subscribed to topics.

Send messages from client apps	Send acknowledgments, chats, and other messages from devices back to your server over FCM’s reliable and battery-efficient connection channel.

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

If you want to test FCM using this project, you'll need to do the following:

==> check README of project
iOS

- Change the package ID in the config.xml to a package ID which is associated with your Apple Developer Team and for which you have set appropriate capabilities (i.e. enabled Push Notifications).
- Set up a Firebase project and add an iOS app which is configured for your package ID.
- Upload an auth key or APNS certificate for the package ID to the Firebase project
- Download the GoogleService-Info.plist for your app and overwrite the one bundled with this project.
- Build and run your project on an iOS device (iOS Simulator cannot receive push notifications).

Android

- Change the package ID in the config.xml to another package ID.
- Set up a Firebase project and add an Android app which is configured for your package ID.
- Download the google-services.json for your app and overwrite the one bundled with this project.
- Build and run your project on an Android device.

## What you'll need
### Prerequisites
#### Dev tools
We need to have [Node.js] and [Git] installed in order to install both [Ionic] and [Cordova].

```sh
$ npm install cordova @ionic/cli typescript -g
...
$ npm ls -g cordova @ionic/cli npm typescript --depth 0
/Users/vdias/.nvm/versions/node/v12.11.0/lib
├── @ionic/cli@6.1.0 
├── cordova@9.0.0 
├── npm@6.13.6 
├── phonegap@9.0.0
└── typescript@3.7.5
```

#### Firebase account
If you don’t have a Firebase account and project setup yet, the first thing we’ll need to do is to create a Firebase account and then [create a Firebase project](https://firebase.google.com/docs/web/setup#create-firebase-project). Both are free.

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

## Implementation path

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
$ cd ./mmb-demos.firebase-native-push-ionic
```

Because Android package name can't use dash (hyphen), and iOS not allows underscore, then we set a package-id slightly different than project name

## Run & deploy the application
### Prepare platform
```
$ ionic cordova prepare android
> cordova platform add android --save
...
> ng run app:ionic-cordova-build --platform=android
...
> cordova prepare android
...
```

You only need to run prepare platform the 1st time, for next builds only run app as described below.

### Run App
```
$ ionic cordova run android
> ng run app:ionic-cordova-build --platform=android
...
> cordova build android --device
...
> native-run android --app platforms/android/app/build/outputs/apk/debug/app-debug.apk --device
...

## Add Cordova plugin to support FCM
### Choose the right Cordova plugin
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

![npm_trends_cordova_native_push_plugin]({{ site.BASE_PATH }}/assets/media/firebase/npm_trends_cordova_native_push_plugin.png)
npm_trends_cordova_native_push_plugin.png

Source: [npm trends: cordova fcm plugin](https://www.npmtrends.com/cordova-plugin-firebase-vs-cordova-plugin-fcm-with-dependecy-updated-vs-cordova-plugin-firebase-messaging-vs-cordova-plugin-firebasex)

Since the breaking change released by Google Firebase on Jun 17th, 2019 the "Official" [cordova-plugin-firebase](https://github.com/arnesson/cordova-plugin-firebase) (at least most used by community) [stop working](https://github.com/arnesson/cordova-plugin-firebase/issues/1057) and 2 forks raised [cordova-plugin-firebase-lib](https://github.com/wizpanda/cordova-plugin-firebase-lib) maintained by [Wiz Panda](https://www.wizpanda.com/) and [cordova-plugin-firebasex](https://ionicframework.com/docs/native/firebase-x) maintain by [Dave Alden](https://github.com/dpa99c). Both maintainers discussed in a [thread](https://github.com/dpa99c/cordova-plugin-firebasex/issues/47) and together decided to archive cordova-plugin-firebase-lib and divert the developers to Firebase X.

### Install cordova-plugin-firebasex and its @ionic-native wrapper

Install [cordova-plugin-firebasex](https://github.com/dpa99c/cordova-plugin-firebasex) and the Firebase-X Ionic native wrapper ([@ionic-native/firebase-x](https://ionicframework.com/docs/native/firebase-x)).

```
$ cordova plugin add cordova-plugin-firebasex
$ npm install @ionic-native/firebase-x --save
```

### Register the plugin in an NgModule as a provider
Register the plugin in an NgModule as a provider, for example on `src/app/app.module.ts`:

```js
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';

@NgModule({
...
  providers: [
    InAppBrowser,
    SplashScreen,
    StatusBar,
    FirebaseX,
  ],
...
})

export class AppModule {}
```

## Connect the app to Firebase
Register [Android](https://firebase.google.com/docs/android/setup#register-app) and/or [iOS](https://firebase.google.com/docs/ios/setup) Apps on firebase and download resp. `google-services.json` and `GoogleService-info.plist`, save them on root of project.

![firebase-console-register-android-app]({{ site.BASE_PATH }}/assets/media/firebase/firebase-console-register-android-app.png)

At this stage if you run the app on device you should track on Firebase Console > Analytics Dashboard an auto collected event 'first_open' as shown below.

{::comment}
### Add Firebase and AngularFire SDKs

The official [AngularFire](https://github.com/angular/angularfire/blob/master/docs/install-and-setup.md) library has many modules to help us interact with the different Firebase features, it includes FCM ([Firebase Cloud Messaging]) through [AngularFireMessaging](https://github.com/angular/angularfire/blob/master/docs/messaging/messaging.md).


```bash
$ npm install @angular/fire firebase --save
```

###  Initialize Firebase on NgModule
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
{:/comment}

## Create FcmService

```
$ ng g service core/push-notification/fcm
CREATE src/app/core/push-notification/fcm.service.spec.ts (318 bytes)
CREATE src/app/core/push-notification/fcm.service.ts (132 bytes)
```


```
import { Injectable } from '@angular/core';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { Platform } from '@ionic/angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FcmService {

  constructor(
    private firebase: FirebaseX,
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

/*
  private saveTokenToFirestore(token): Promise<void> {
    if (!token) { return; }

    const devicesRef = this.db.collection('devices');

    const docData = {
      token,
      userId: 'testUser' // get from auth user
    };

    return devicesRef.doc(token).set(docData);
  }
*/

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

## Customize notifications
### Icon

### Color

## Deeplink: go to a specific page when clicking on a notification

https://forum.ionicframework.com/t/go-to-a-specific-page-when-clicking-on-a-notification/123738
https://enappd.com/blog/implement-ionic-4-firebase-push/34/

### Create a new page: about
$ ionic g page about

Edit `src/app/about/about.page.html` to add a back button on header:


```
<ion-header>
  <ion-toolbar>
    <ion-buttons slot="start">
      <ion-back-button defaultHref="/"></ion-back-button>
    </ion-buttons>
    <ion-title>about</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content>

</ion-content>
```


## Good practices for good notifications

It's up to you to use this post to "artificially re-engage users and force content down their throat" as said by [Stéphanie Walter](https://twitter.com/walterstephanie) on its great post [The Ultimate Guide to Not F#!@ing Up Push Notifications](https://stephaniewalter.design/blog/the-ultimate-guide-to-not-fck-up-push-notifications/), but I recommend to read about good practices and respect some basic rules:

> Provide value to users before asking them to receive your app’s notifications; tell them what the notifications will be about. Don’t send notifications in bursts; make it easy to turn them off.

Source: [Five Mistakes in Designing Mobile Push Notifications](https://www.nngroup.com/articles/push-notification/)

## Furthermore

- [Ionic Native With Firebase FCM Push Notifications](https://angularfirebase.com/lessons/ionic-native-with-firebase-fcm-push-notifications-ios-android/)
- [How to add Push Notifications in your Cordova application using Firebase](https://medium.com/@felipepucinelli/how-to-add-push-notifications-in-your-cordova-application-using-firebase-69fac067e821)
- [Push Notification on Ionic 4 using Firebase (FCM) with Postman Request](https://medium.com/@abdulahad.momin07/push-notification-on-ionic-4-using-firebase-fcm-with-postman-request-15c0b33d7bbb)
- [Firebase Cloud Messaging important REST API’s](https://medium.com/@selvaganesh93/firebase-cloud-messaging-important-rest-apis-be79260022b5)
- [Ionic 5 Firebase FCM Push Notification Tutorial with Example](https://www.positronx.io/ionic-firebase-fcm-push-notification-tutorial-with-example/)

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
[Node script to use HTTP v!](https://github.com/dpa99c/cordova-plugin-firebasex-test/blob/master/scripts/sendMessage.js)
[Migrate from legacy HTTP to HTTP v1](https://firebase.google.com/docs/cloud-messaging/migrate-v1)
[Build app server send requests](https://firebase.google.com/docs/cloud-messaging/send-message)


[Messages sent to an FCM TOPICS are public](https://stackoverflow.com/a/42291098/4982169)


