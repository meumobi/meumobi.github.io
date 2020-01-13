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



## Furthermore

- [ionicframework.com: Progressive Web Apps in Angular](https://ionicframework.com/docs/angular/pwa#service-worker-configuration)
- [Mastering Ionic: Creating a Progressive Web App in Ionic 4](http://masteringionic.com/blog/2019-02-03-creating-a-progressive-web-app-in-ionic-4/)
- [enappd: All PWA features in Ionic 4](https://enappd.com/blog/pwa-features-in-ionic-4/102/)
- [Angular-university.io: Angular Push Notifications: a Complete Step-by-Step Guide](https://blog.angular-university.io/angular-push-notifications/)