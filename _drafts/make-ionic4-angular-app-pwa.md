# Make Ionic 4/Angular app a PWA
The two main requirements of a PWA are a [Service Worker](https://developers.google.com/web/fundamentals/primers/service-workers/) and a [Web Manifest](https://developers.google.com/web/fundamentals/web-app-manifest/). While it's possible to add both of these to an app manually, the Angular team has an @angular/pwa package that can be used to automate this.

The @angular/pwa package will automatically add a service worker and an app manifest to the app. To add this package to the app, run:

$ ng add @angular/pwa

Once this package has been added run ionic build --prod and the www directory will be ready to deploy as a PWA.

## Perform audits with Lighthouse
You can run audits online or locally with [Lighthouse](https://developers.google.com/web/tools/lighthouse/), an open-source and automated tool for improving the quality of web pages.

For details about how to use it I recommend reading my previous post [Getting started with Progressive Web Apps (PWA)]({% post_url 2017-12-28-getting-started-progressive-web-app %})

## Run in Firebase hosting

[Add Web Push Notifications to your Ionic PWA](https://medium.com/@david.dalbusco/add-web-push-notifications-to-your-ionic-pwa-358f6ec53c6f)

## workaround for using FCM with ngsw
[Jeff Delaney: Push Notifications with Ionic4 and Firebase Cloud Messaging](https://www.youtube.com/watch?v=m_P1Q0vhOHs)
[Ionicthemes: Adding Push Notifications to our Ionic PWA](https://ionicthemes.com/tutorials/about/the-complete-guide-to-progressive-web-apps-with-ionic4)
[workaround for using FCM with ngsw](https://github.com/angular/angularfire/issues/1923)
https://github.com/angular/angularfire/issues/1870


https://ionicthemes.com/tutorials/about/the-complete-guide-to-progressive-web-apps-with-ionic4
https://github.com/ionicthemes/ionic-pwa

$ ionic start mmb-demos.fcm-web-push-ionic blank --type=angular
$ cd ./mmb-demos.firebase-web-push-ionic
$ ng add @angular/pwa

[how to enable Angular service worker](https://angular.io/guide/service-worker-getting-started)

Add Firebase

The official @angular/fire library has many modules to help us interact with the different Firebase features, it includes FCM (Firebase Cloud Messaging) through `AngularFireMessaging`.

First of all, we will need to create a Firebase project.

Proceed to install the dependencies:

$ npm install firebase @angular/fire --save

[AngularFire](https://github.com/angular/angularfire/blob/master/docs/install-and-setup.md)


## Setting up the Firebase Messaging Service Worker
To register to receive notifications you need to set up the Firebase Messaging Service Worker.

Step 1: Create a Firebase project
Step 2: Register your app with Firebase
Step 3: Add Firebase SDKs and initialize Firebase
Step 4: Add FCM Service worker

> The messaging service requires a firebase-messaging-sw.js

[Source: Retrieve the current registration token](https://firebase.google.com/docs/cloud-messaging/js/client#retrieve-the-current-registration-token)

we created a service worker (firebase-messaging-sw.js) that will just hang out in the background (even after the ionic app has been closed by the user) waiting to detect new messages to notify the user.

Step 5: Configure Web Credentials with FCM
The FCM Web interface uses Web credentials called "Voluntary Application Server Identification," or "VAPID" keys, to authorize send requests to supported web push services.

Step 6: Combine ngsw-worker.js and firebase-messaging-sw.js in a single Service Worker

Step 7: Adding Push config to the Web Manifest
Step 8: Configure “VAPID” keys with FCM

## AngularFireMessaging

https://github.com/angular/angularfire/blob/master/docs/messaging/messaging.md
Step 9: import the NgModule

Step 10: Setting up the Firebase Messaging Service Worker

Step 11: Requesting permission
Requesting permission, get token, listen for token refresh

Step 12: Subscribing to foreground messages

If you want to do several tests, you would like to toggle allow/block notifications, you can achieve it looking for notifications on chrome settings (usually on Site Settings). Look for the url you are tested and change permissions as you prefer.

## Sending push notifications
From Firebase console


## Furthermore

- [ionicframework.com: Progressive Web Apps in Angular](https://ionicframework.com/docs/angular/pwa#service-worker-configuration)
- [Mastering Ionic: Creating a Progressive Web App in Ionic 4](http://masteringionic.com/blog/2019-02-03-creating-a-progressive-web-app-in-ionic-4/)
- [enappd: All PWA features in Ionic 4](https://enappd.com/blog/pwa-features-in-ionic-4/102/)
- [Angular-university.io: Angular Push Notifications: a Complete Step-by-Step Guide](https://blog.angular-university.io/angular-push-notifications/)
https://medium.com/@david.dalbusco/add-web-push-notifications-to-your-ionic-pwa-358f6ec53c6f