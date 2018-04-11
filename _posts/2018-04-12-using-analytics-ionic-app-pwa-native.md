---
layout: post
title: How to use Google Analytics on Ionic PWA and Native app without plugin
categories: [Ionic, PWA]
tags: [tutorial, analytics]
author:
  name: Daniel Antonio Conte
  email: danconte72@gmail.com
  github: danconte72
  twitter: danielconte
  bio: Life, Universe, Everything
  email_md5: 8200df29874231d4d8c2c7beae170b31
---
![Ionic PWA Analytics]({{ site.BASE_PATH}}/assets/media/ionic/pwa_ionic_ga.png)

Sharing the same code between PWA and Native (iOS/Android) is a practice we have been using on our Ionic apps. An essencial service for many projects is Google Analytics (GA). We did a deep search to find the best option for our scenario. There was a main solution out there.
#### Ionic Native Google Analytics [Plugin](https://ionicframework.com/docs/native/google-analytics/)
It's easy to add to your project, there are a lot of good tutorials like [this](https://www.techdiary.io/ionic2-app-metrics-using-google-analytics/). If you use just for native apps, it can be the best option. Otherwise for PWA the plugin just works when the app is compiled for browser platform and in this situation it produces a bigger webapp than necessary (6mb more for just one feature). Besides the size, browser platform will be depreceated according this comment of an Ionic Developer Team member.

## How we did using raw GA

#### index.html - added GA code snippet
```html
...
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
</script>
...
```

#### analyticsProvider.ts
Install [@types/google.analytics](https://www.npmjs.com/package/@types/google.analytics) in order to allow works with js library in typescript.
```bash
$ npm install --save @types/google.analytics
```

Create a provider to work with GA.
```bash
$ ionic g provider analytics
```
```ts
import { Injectable } from '@angular/core';
declare var ga: Function;
@Injectable()
export class AnalyticsProvider {
  constructor() {}
  startTrackerWithId(id) {
    ga('create', {
      storage: 'none',    ​
      trackingId: id,    ​
      clientId: localStorage.getItem('ga:clientId')
    });    ​
    ga('set', 'checkProtocolTask', null);​
    ga('set', 'transportUrl', 'https://www.google-analytics.com/collect');
    ga(function(tracker) {
      if ( !localStorage.getItem('ga:clientId') ) {
        localStorage.setItem( 'ga:clientId', tracker.get('clientId') );
      }
    });
  }
  trackView(screenName) {
    console.log(screenName);
    ga('set', 'page', screenName);
    ga('send', 'pageview');
  }
  trackEvent(category, action, label?, value?) {
    ga('send', 'event', {
      eventCategory: category,
      eventLabel: label,
      eventAction: action,
      eventValue: value
    });
  }
}
```
How to start tracking by id was inspired by this [article](https://www.27partners.com/2016/07/using-google-analytics-in-an-ionic-app-without-a-plugin/) who explains how solve some problems in native client.

#### app.module.ts - provider added on providers array
```ts
...
import { AnalyticsProvider } from '../providers/analytics/analytics';
...
@NgModule({
 ...
  providers: [
    ...
    AnalyticsProvider
    ...
  ]
})
```

#### app.component.ts - start track and tracking views
```ts
import { AnalyticsProvider } from '../providers/analytics/';
...
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  ...
  constructor(
    ...
    public analyticsProvider: AnalyticsProvider
    ...
  ) {
    this.initializeApp();
    ...
  }
  initializeApp() {
    this.analyticsProvider.startTrackerWithId('UA-XXXXXXXXX-1');
    this.nav.viewDidEnter.subscribe(
      (view) => {
        this.analyticsProvider.trackView(view.instance.constructor.name);
      }
    );
  }
}
```
When the app initialize we start track. To track all views we subscribe when the Nav will be updated (viewDidEnter), and send this to provider; 

#### example.ts - tracking some event
```ts
import { AnalyticsProvider } from '../../providers/analytics';
export class ExamplePage {	
  constructor(
    public analytics: AnalyticsProvider,
  ) {}
  exampleEvent() {
    this.analytics.trackEvent('User', 'Create User', 'Daniel');
  }
}
``` 

## Links
- [How to Implement Google Analytics in an Angular2 App?](https://unyscape.com/how-to-implement-google-analytics-in-an-angular2-app/);
- [Using Google Analytics in an Ionic app without a plugin](https://www.27partners.com/2016/07/using-google-analytics-in-an-ionic-app-without-a-plugin/);
- [Ionic Native Google Analytics Plugin](https://ionicframework.com/docs/native/google-analytics/);
- [Ionic - Global navigation change event](https://forum.ionicframework.com/t/ionic-global-navigation-change-event/51537/3);
- [IONIC2 | App Metrics using Google Analytics](https://www.techdiary.io/ionic2-app-metrics-using-google-analytics/);
- [Angular 4+ using Google Analytics](https://stackoverflow.com/a/46463247/4668126);