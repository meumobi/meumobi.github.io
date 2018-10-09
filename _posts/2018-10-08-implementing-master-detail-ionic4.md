---
layout: post
title: 'Implementing the Master-Detail Pattern with Ionic 4'
categories: [Ionic, Ionic-v4]
tags: []
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
We are going to create a News App, implementing a [stacked Master/Details pattern](https://docs.microsoft.com/en-us/windows/uwp/design/controls-and-patterns/master-details#stacked-style).

Our main concern is to apply good/recommended practices:
- lazy load all modules
- shared module
- routing module for each module
- generate data provider and mockup
- create interface for data

On future post I pretend to add more features:
- login flow with Angular router
- protected access with Angular Auth Guards
- setAuthorisation headers with Http Interceptors
- Progressive Web App

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
$ ionic start meu-starter.master-detail.ionic-v4 blank --type=angular
$ cd meu-starter.master-detail.ionic-v4
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

On this tutorial we’ll create all components for a clean master/detail implementation. There's no perfect solution or unique rule to define file structure. It's important to consider how and where your App will grow to adapt the file structure to your project. I highly recommend to read some posts (as [How to define a highly scalable folder structure for your Angular project](https://itnext.io/choosing-a-highly-scalable-folder-structure-in-angular-d987de65ec7)) to be aware of basic recommendations.


```
./src
  /app
    /items
      items-routing.module.ts
      items.module.ts
      components/
        item-headline
      pages/
        items-list
        item-detail
      items.interface.ts
      items.service.ts
      items-mock.service.ts
      items-mock.ts
    /core
      core.module.ts
      /services
        /api
          api.service.ts
          api.service-mock.ts
          mock-api.ts
    /shared
      shared.module.ts
      /components
```

At this tage you can observe some interesting points:
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

## Pages

We create both pages required to implement master-detail pattern, we call them `items-list` and `item-detail` and save them on items feature folder.

```
$ ng g page items/pages/items-list
CREATE src/app/items/pages/items-list/items-list.module.ts (559 bytes)
CREATE src/app/items/pages/items-list/items-list.page.scss (0 bytes)
CREATE src/app/items/pages/items-list/items-list.page.html (137 bytes)
CREATE src/app/items/pages/items-list/items-list.page.spec.ts (713 bytes)
CREATE src/app/items/pages/items-list/items-list.page.ts (271 bytes)
UPDATE src/app/items/items-routing.module.ts (248 bytes)
$ ng g page items/pages/item-detail
CREATE src/app/items/pages/item-detail/item-detail.module.ts (564 bytes)
CREATE src/app/items/pages/item-detail/item-detail.page.scss (0 bytes)
CREATE src/app/items/pages/item-detail/item-detail.page.html (138 bytes)
CREATE src/app/items/pages/item-detail/item-detail.page.spec.ts (720 bytes)
CREATE src/app/items/pages/item-detail/item-detail.page.ts (275 bytes)
UPDATE src/app/items/items-routing.module.ts (248 bytes)
```

And update ItemsRoutingModule, to include them

```
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemsListPage } from './pages/items-list/items-list.page';

const routes: Routes = [
  { path: '', loadChildren:  './pages/items-list/items-list.module#ItemsListPageModule'},
  { path: ':id', loadChildren:  './pages/item-detail/item-detail.module#ItemDetailPageModule'},
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

When dealing with different data sources, it is useful to model those data sources with a common interface. Interfaces are not compiled into the JavaScript output of TypeScript, but are useful for [type-checking](https://toddmotto.com/classes-vs-interfaces-in-typescript#using-typescript-interface). It exists some [discussions about using interface vs class](https://github.com/angular/angular/issues/19632), I let you read them and  

```
$ ng generate interface items/models/items.interface
```

## Core: API Service

## State

We will create Contacts model, as well

`$ ng generate class contacts/contacts --type model`

with all the necessary attributes.

```

```

$ ionic generate page profiles/pages/list
> ng generate page profiles/pages/list
CREATE src/app/profiles/pages/list/list.module.ts (533 bytes)
CREATE src/app/profiles/pages/list/list.page.scss (0 bytes)
CREATE src/app/profiles/pages/list/list.page.html (131 bytes)
CREATE src/app/profiles/pages/list/list.page.spec.ts (677 bytes)
CREATE src/app/profiles/pages/list/list.page.ts (248 bytes)
UPDATE src/app/app-routing.module.ts (458 bytes)
[OK] Generated page!

$ ng generate module timeline --routing
CREATE src/app/timeline/timeline-routing.module.ts (251 bytes)
CREATE src/app/timeline/timeline.module.spec.ts (291 bytes)
CREATE src/app/timeline/timeline.module.ts (287 bytes)

$ ng generate component timeline/components/Home --module
CREATE src/app/timeline/components/home/home.component.scss (0 bytes)
CREATE src/app/timeline/components/home/home.component.html (23 bytes)
CREATE src/app/timeline/components/home/home.component.spec.ts (614 bytes)
CREATE src/app/timeline/components/home/home.component.ts (262 bytes)
UPDATE src/app/timeline/timeline.module.ts (366 bytes)


skeleton-text: https://github.com/ionic-team/ionic/commit/b213500
navigate
ion-refresher
infinite-scroll


## Repository & Demo
Demo app is deployed with firebase on ...

All source code can be found on GitHub: https://github.com/meumobi/meu-starter.master-detail.ionic-v4

## Furthemore

https://www.djamware.com/post/5b5cffaf80aca707dd4f65aa/building-crud-mobile-app-using-ionic-4-angular-6-and-cordova
- [Josh Morony: Implementing a Master Detail Pattern in Ionic 4 with Angular Routing](https://www.joshmorony.com/implementing-a-master-detail-pattern-in-ionic-4-with-angular-routing/)

[Angular.io Getting started]: https://angular.io/guide/quickstart
[Ionic 4 starters]: https://github.com/ionic-team/starters/tree/master/angular
[Firebase release notes]: https://firebase.google.com/support/release-notes/js
[AngularFire2 release notes]: https://github.com/angular/angularfire2/releases/
[Ionic release notes]: https://github.com/ionic-team/ionic/releases

[Node.js]: <https://nodejs.org/en/download/>
[Git]: <http://git-scm.com/download>
[Ionic]: <https://ionicframework.com/>
[Cordova]: <https://cordova.apache.org/>