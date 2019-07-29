---
layout: post
title: 'Implementing the Master-Detail Pattern with Ionic v4'
categories: [Ionic]
tags: [Ionic-v4, AngularFire, Firebase]
redirect_from:
- /ionic/2018/10/18/create-crud-app-ionic4-angularfire5
author:
  name: Victor Dias
  email: victor.dias@meumobi.com
  github: elbidone
  twitter: meumobi
  bio: Sharing mobile Experiences
  email_md5: 1cd012be2382e755aa763c66acc7cfa6
---

Last year I've published a post [Implementing the Master-Detail Pattern with Ionic 3]({% post_url 2017-08-23-implementing-master-detail-ionic %}), 12 months later and a new major release [Ionic 4](https://blog.ionicframework.com/announcing-ionic-4-beta/), we'll see on this new post how to achieve it with Ionic 4 and which benefits to upgrade from Ionic 3.

## Main difference between Ionic 3 and Ionic 4

- Ionic 4 brings significant performance and build time improvements
  - Ionic 4 **moves to using Web Components** for each component. Web Components push more work to the browser and require less code, bringing key performance improvements to load and startup times
- Ionic Angular apps follow Angular standards and conventions
  - **fully embrace the Angular CLI and Router**. Angular developers can now use the Angular CLI directly for Ionic apps and stay up-to-date with the awesome progress Angular continues to make.

To go in-depth with migration Ionic team provide a [migration guide](https://beta.ionicframework.com/docs/building/migration).


## Application
We are going to create an employee directory App, implementing CRUD actions (Create, Read, Update, Delete).

Our main concern is to apply good/recommended practices:
- split each feature into a lazy loaded module
- core, shared module
- routing module
- generate data provider and mockup
- create interface for data

We'll use Ionic v4 for UI with Angular 6 and firestore as Cloud db.

## Setup

### Prerequisites
We need to have [Node.js] and [Git] installed in order to install both [Ionic] and [Cordova].

```
$ npm install cordova ionic typescript -g
...

$ npm ls -g cordova ionic npm typescript --depth 0
/usr/local/lib
├── @angular/cli@6.2.4
├── ionic@4.2.1 
├── npm@6.4.1 
├── phonegap@8.0.0
└── typescript@2.9.2
```

### Create a new Ionic v4 application

Create a New Ionic 4 and Angular 6 Application with

```
$ ionic start meu-starter.crud-angularfire.ionic-v4 blank --type=angular
$ cd meu-starter.crud-angularfire.ionic-v4
```

You can test the App running `ionic serve` cmd:

```
$ ionic serve
> ng run app:serve --host=0.0.0.0 --port=8100
```

To test iOS and Android views I recommend using [@ionic/lab](https://www.npmjs.com/package/@ionic/lab) package

`$ npm i --save-dev @ionic/lab`

and run

`$ ionic serve --lab`

## File Structure

There's no perfect solution or unique rule to define file structure, it's important to consider how and where your App will grow to adapt the file structure to your project. I highly recommend to read some posts (as [How to define a highly scalable folder structure for your Angular project](https://itnext.io/choosing-a-highly-scalable-folder-structure-in-angular-d987de65ec7)) to be aware of basic recommendations.


> Lazy load an entire module that can contain multiple pages, and the components they are suppose to use.

```
./src
  /app
    /profiles
      profiles-routing.module.ts
      profiles.module.ts
      components/
        profile-headline
      pages/
        profiles-list
        profile-detail
      profile.interface.ts
	  services/
	  	  index.ts
	      profile.service.ts
	      profile-mock.service.ts
	      profile-mock.ts
    /core
      core.module.ts
      /services
        /api
          api.service.ts
    /shared
      shared.module.ts
      /components
```

At this stage you can observe some interesting points:
- we use routing module for items, not for shared module, because we don't expect to share any route
- items service is "mocked", it's easier to test our App, consuming mock entries.

### Core module

Your `CoreModule` contains code that will be used to instantiate your app and load some core functionality.

The clearest and most important use of the `CoreModule` is the place to put your global/HTTP services. The idea is to make sure only one instance of those services will be created across the entire app. The `CoreModule`, by convention, is only included in your entire app once in `AppModule` (only in the `import` property of the `@NgModule()` decorator inside your main `app.module.ts`, not in any other module's import) and this will ensure services inside it will be only created once in the entire app.

Source: [Angular (2+): Core vs Shared Modules](https://blog.chai-jay.com/angular-core-vs-shared-modules/)

### Shared module

You `SharedModule` similarly contains code that will be used across your app and Feature Modules. But the difference is that you will import this `SharedModule` into the specific Feature Modules as needed. You DO NOT import the `SharedModule` into your main `AppModule` or `CoreModule`.

Common templates components should also go in the `SharedModule`. An example would be a global button component, eg `ButtonComponent`. These template components should be "dumb components" in that they should not expect or interact with any specific form of data.

## Module

It's considered [best practice to add routing module for each feature module](https://angular.io/guide/lazy-loading-ngmodules). 
Then we'll add 3 modules on our App (before running each cli I recommend to add `--dry-run` to simulate cmd):

```
$ ng generate module items --routing
CREATE src/app/items/items-routing.module.ts (251 bytes)
CREATE src/app/items/items.module.spec.ts (291 bytes)
CREATE src/app/items/items.module.ts (287 bytes)

$ ng g module shared --spec=false
$ ng g module core --spec=false
```

`ItemsRoutingModule` will handle any items-related routing. This keeps the app’s structure organized as the app grows and allows you to reuse this module while easily keeping its routing intact.

`ItemsModule` is needed for setting up lazy loading for your feature module.

We generate `core` and `shared` modules without routing and spec (`--spec=false`). Depending on Unit tests you pretend to implement it's up to you to add or remove specs. Concerning routes, it's useless for non-feature modules.

Notice: we switch between `ng` and `ionic`, but both commands commonly have same behavior. When possible we prefer to use original, then `ng` instead of the "alias" `ionic`.

Tip: to list available schematics type `$ npx ng g --help`

## Routing

We "lazy load" `ItemsModule`:

```
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'items', loadChildren: './items/items.module#ItemsModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

Tips: preload a lazyloaded module adding a data object to the routes config `data: { preload: true }`, for ex.:
```
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule', data: { preload: true } },
  { path: 'items', loadChildren: './items/items.module#ItemsModule' },
];
```

## Pages

We create both pages required to implement master-detail pattern, we call them `items-list` and `item-detail` and save them on items feature folder.

```
$ ng g page items/pages/items-list --module items
CREATE src/app/items/pages/items-list/items-list.module.ts (564 bytes)
CREATE src/app/items/pages/items-list/items-list.page.scss (0 bytes)
CREATE src/app/items/pages/items-list/items-list.page.html (137 bytes)
CREATE src/app/items/pages/items-list/items-list.page.spec.ts (713 bytes)
CREATE src/app/items/pages/items-list/items-list.page.ts (271 bytes)
UPDATE src/app/items/items.module.ts (371 bytes)
$ ng g page items/pages/item-detail --module items
CREATE src/app/items/pages/item-detail/item-detail.module.ts (564 bytes)
CREATE src/app/items/pages/item-detail/item-detail.page.scss (0 bytes)
CREATE src/app/items/pages/item-detail/item-detail.page.html (138 bytes)
CREATE src/app/items/pages/item-detail/item-detail.page.spec.ts (720 bytes)
CREATE src/app/items/pages/item-detail/item-detail.page.ts (275 bytes)
UPDATE src/app/items/items.module.ts (371 bytes)
```

And update ItemsRoutingModule, to include them

```
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemsListPage } from './pages/items-list/items-list.page';
import { ItemDetailPage } from './pages/item-detail/item-detail.page';

const routes: Routes = [
  { path: '', component: ItemsListPage'},
  { path: ':id', component: ItemDetailPage'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemsRoutingModule { }
```

At this stage you can add links on pages to test navigation or access directly to lazy-loaded pages running `ionic serve` and typing url on address bar of your browser.
- '/' for home
- '/items' for items-list
- '/items/123' for item-detail

## Interface

When dealing with different data sources, it is useful to model those data sources with a common interface. Interfaces are not compiled into the JavaScript output of TypeScript, but are useful for [type-checking](https://toddmotto.com/classes-vs-interfaces-in-typescript#using-typescript-interface). It exists some [discussions about using interface vs class](https://github.com/angular/angular/issues/19632), I let you read them and make your opinion.

```
$ ng generate interface items/models/items
CREATE src/app/items/models/items.ts (37 bytes)

// because I like to rename it:
$ mv src/app/items/models/items.ts src/app/items/models/items.interface.ts
```

For this tutorial we'll use [newsapi.org](https://newsapi.org/docs/get-started) service to fetch news from a REST API, the interface of Items is described below:

```
export interface Items {
  author: null,
  title: string,
  description: string,
  url: string,
  urlToImage: string,
  publishedAt: string, // 2018-10-09T16:18:45Z
  content: string
}
```

## Mock items service

The objective of mock is to help on development and debug

```
$ ng g service items/services/items-mock --spec=false
CREATE src/app/items/services/items-mock.service.ts (138 bytes)
$ ng g class items/services/items-mock --spec=false
CREATE src/app/items/services/items-mock.ts (27 bytes)
```



## Core: API Service

To consum the News API we'll create an API Service and consider it as a Core Service. Because we only use it to fetch news (items) we could save it on items module, but a common use case is to share an API service to be used by various modules fetching different data models.

The News API Authentication is handled with a simple API key:
- via the `apiKey` querystring parameter.
- via the `X-Api-Key` HTTP header.

On this section we'll use `apiKey` querystring parameter and later the `X-Api-Key` HTTP header to introduce `http interceptors`.

```
$ ng g service core/services/api --spec=false
CREATE src/app/core/services/api.service.ts (132 bytes)
$ ng g service items/services/items --spec=false
CREATE src/app/items/services/items.service.ts (134 bytes)
```

## Core: http interceptor

[Interceptors](https://angular.io/guide/http#intercepting-requests-and-responses) are sitting in between your application and the backend. By using interceptors you can transform a request coming from the application before it is actually submitted to the backend. The same is possible for responses.
We'll move the authentication from URL queryString to http header, and to achieve it we'll use `HttpInterceptor`.

### Write an interceptor
```
$ ng g class core/http-interceptors/auth-interceptor
CREATE src/app/core/http-interceptors/auth-interceptor.ts (33 bytes)
```

```
import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { environment } from '@env/environment';

const API_KEY = environment.apiKey;

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    /*
    * The verbose way:
    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({
      headers: req.headers.set('Authorization', authToken)
    });
    */
    // Clone the request and set the new header in one step.
    const authReq = req.clone({ setHeaders: { 'X-Api-Key': API_KEY } });

    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}
```

### Provide the interceptor

```
import { AuthInterceptor } from './http-interceptors/auth-interceptor';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiService } from '@core/services/api.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    ApiService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class CoreModule { }
```

If you don't append your API key correctly, or your API key is invalid, you will receive a 401 - Unauthorized HTTP error.

## Repository & Demo
All source code can be found on GitHub: [meumobi/meu-starter.master-detail.ionic-v4](https://github.com/meumobi/meu-starter.master-detail.ionic-v4)

## Furthemore

- [Building CRUD Mobile App using Ionic 4, Angular 6 and Cordova](https://www.djamware.com/post/5b5cffaf80aca707dd4f65aa/building-crud-mobile-app-using-ionic-4-angular-6-and-cordova)
- [Josh Morony: Implementing a Master Detail Pattern in Ionic 4 with Angular Routing](https://www.joshmorony.com/implementing-a-master-detail-pattern-in-ionic-4-with-angular-routing/)

[Angular.io Getting started]: https://angular.io/guide/quickstart
[Ionic 4 starters]: https://github.com/ionic-team/starters/tree/master/angular
[Firebase release notes]: https://firebase.google.com/support/release-notes/js
[AngularFire2 release notes]: https://github.com/angular/angularfire2/releases/
[Ionic release notes]: https://github.com/ionic-team/ionic/releases
[JAVEBRATT: free course to Ionic beta.13 and Firebase 5.5]: https://www.dropbox.com/s/a0itka6bfbmaey6/FREE_building-firestore-powered-ionic-apps-1.0.2.pdf

[Node.js]: <https://nodejs.org/en/download/>
[Git]: <http://git-scm.com/download>
[Ionic]: <https://ionicframework.com/>
[Cordova]: <https://cordova.apache.org/>