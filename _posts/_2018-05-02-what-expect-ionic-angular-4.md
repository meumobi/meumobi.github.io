---
layout: post
title: What to expect from Ionic Angular 4
categories: [Ionic]
tags: [ionic, angular, pwa]
author:
  name: Victor Dias
  email: victor.dias@meumobi.com
  github: elbidone
  twitter: meumobi
  bio: Sharing mobile Experiences
  email_md5: 1cd012be2382e755aa763c66acc7cfa6
---

## Ionic 4.x PWA
We can compare results with Ionic 4.x alpha release. This release come without service-workers out of the bow but [in Angular 5.0.0, you can easily enable Angular service worker support](https://angular.io/guide/service-worker-getting-started).

## Install globally Angular CLI

```bash
$ npm install -g @angular/cli
$ ng --version
Angular CLI: 6.0.0-rc.8
Node: 8.9.0
OS: darwin x64
Angular: 6.0.0-rc.6
... common, compiler, compiler-cli, core, forms, http
... language-service, platform-browser, platform-browser-dynamic
... router
```

## Adding a Service Worker
I recommend to read the great post of Rob Ferguson [Optimising the performance of an Ionic PWA - Part 1](https://robferguson.org/blog/2018/04/16/0ptimising-the-performance-of-an-ionic-pwa-part-1/)

`$ npm install @angular/service-worker --save`

### Import and register the service worker
At the top of the root module, `src/app/app.module.ts`, import `ServiceWorkerModule`

```
import { ServiceWorkerModule } from '@angular/service-worker';
...

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
	...
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: true })
  ],
...
```

### Create the service worker configuration file

# Ionic v4

## Start blank project

```
$ ionic config set -g features.project-angular true

$ ionic start meu-starter.ionic-v4
? Project type: angular
? Starter template: blank
? Would you like to integrate your new app with Cordova to target native iOS and Android: No
? Install the free Ionic Pro SDK and connect your app: No
```

Ionic 4 will lazy load the CSS per components

And finally run the build with ionic cli `$ ionic build --prod` and deploy the app on firebase hosting to test it with Lighthouse.

## Lighthouse audit report
|Ionic v4: PWA Performance|
|---|
|![Ionic v4: PWA Performance]({{ site.BASE_PATH}}/assets/media/ionic/pwa_ionic_v4 lighthouse.png)|

Run performance Audit 3 times and reach: 54, 64 and 61.

# Ionic lab
One of [breaking changes](https://github.com/ionic-team/ionic-cli/blob/master/packages/ionic/CHANGELOG.md#boom-breaking-changes) of v4 is the move of Ionic Lab into the @ionic/lab package, which will need to be installed for Lab to work.

```
$ npm i @ionic/lab --save-dev
+ @ionic/lab@1.0.0-rc.5
added 16 packages from 10 contributors in 69.83s
$ ionic serve --lab
```


[New project! Where to start? (PWA Tookit? Ionic 4?)](https://forum.ionicframework.com/t/new-project-where-to-start-pwa-tookit-ionic-4/129174)
[What to Expect When Ionic 4 Is Released](https://www.joshmorony.com/what-to-expect-when-ionic-4-is-released/)
[Faster Boot Times with Lazy Loaded Web Components in Ionic 4](https://www.joshmorony.com/faster-boot-times-with-lazy-loaded-web-components-in-ionic-4/)
[Using Angular Routing with Ionic 4](https://www.joshmorony.com/using-angular-routing-with-ionic-4)