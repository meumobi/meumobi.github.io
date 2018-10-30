---
layout: post
title: 'Implement Stacked Master-Detail Pattern with Ionic v4'
categories: [Ionic]
tags: [ionic-v4]
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

EXTRA: setAuthorisation headers with Http Interceptors

On future posts I pretend to add more features:
- Infinite scroll
- skeleton
- push to refresh

## Setup

### Prerequisites
We need to have [Node.js] and [Git] installed in order to install [Ionic].

```
$ npm install ionic typescript -g
...

$ npm ls -g ionic npm typescript --depth 0
/usr/local/lib
├── @angular/cli@6.2.4
├── ionic@4.2.1 
├── npm@6.4.1 
└── typescript@2.9.2
```

OBS: On this post I will not use [Cordova] because there's none feature related to Native API, but you can easily convert this project on App adding [Cordova] package.

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
    app-routing.module.ts
    app.component.ts
    app.component.ts
    app.module.ts
    /home
      home.page.ts
      home.module.ts
      home.page.scss
      home.page.html
    /items
      items-routing.module.ts
      items.module.ts
	  items.interface.ts
      components/
        item-headline
      pages/
        items-list
        item-detail
      services/
          index.ts
          items.service.ts
          items-mock.service.ts
          items-mock.ts
    /core
      core.module.ts
      /api
          api.service.ts
    /shared
      shared.module.ts
      /components
```

### Core Service: API

Your `CoreModule` contains code that will be used to instantiate your app and load some core functionality.

The clearest and most important use of the `CoreModule` is the place to put your global/HTTP services. The idea is to make sure only one instance of those services will be created across the entire app. The `CoreModule`, by convention, is only included in your entire app once in `AppModule` (only in the `import` property of the `@NgModule()` decorator inside your main `app.module.ts`, not in any other module's import) and this will ensure services inside it will be only created once in the entire app.

We'll use it to share `ApiService`. To consum the [News API](https://newsapi.org/) we'll create an API Service and consider it as a Core Service. Because we only use it to fetch news (items) we could save it on items module, but a common use case is to share an API service to be used by various modules fetching different data models.

The News API Authentication is handled with a simple API key:
- via the `apiKey` querystring parameter.
- via the `X-Api-Key` HTTP header.

Source: [Angular (2+): Core vs Shared Modules](https://blog.chai-jay.com/angular-core-vs-shared-modules/)

### Shared module

You `SharedModule` similarly contains code that will be used across your app and Feature Modules. But the difference is that you will import this `SharedModule` into the specific Feature Modules as needed. You DO NOT import the `SharedModule` into your main `AppModule` or `CoreModule`.

Common templates components should also go in the `SharedModule`. An example would be a global button component, eg `ButtonComponent`. These template components should be "dumb components" in that they should not expect or interact with any specific form of data.

### ItemsModule: feature module with routing

`ItemsModule` will act as the gatekeeper for anything that concerns items. `ItemsRoutingModule` will handle any item-related routing. This keeps the app’s structure organized as the app grows and allows you to reuse this module while easily keeping its routing intact.

It's considered [best practice to add routing module for each feature module](https://angular.io/guide/lazy-loading-ngmodules).

## Core module
### Setup

Create CoreModule with cli:

```
$ ng g module core
```

And on `/app.module.ts` add import `CoreModule` on `AppModule`. By this way CoreModule will be available on whole App.

```
import { CoreModule } from './core/core.module';
...

  imports: [
    ...
    CoreModule, 
    ...
  ],
```

### Api Service

We'll use `apiKey` querystring parameter and later the `X-Api-Key` HTTP header to introduce `http interceptors`.

```
$ ng g service core/api/api
CREATE src/app/core/api/api.service.spec.ts (323 bytes)
CREATE src/app/core/api/api.service.ts (133 bytes)
```

OBS-1: Beginning with Angular 6.0, the preferred way to [create a singleton services](https://angular.io/guide/singleton-services#providing-a-singleton-service) is to specify on the service that it should be provided in the application root. This is done by setting `providedIn` to root on the service's @Injectable decorator. When you use 'root', your injectable will be registered as a singleton in the application, and you don’t need to add it to the providers of the root module.

OBS-2: we switch between `ng` and `ionic` cli, but both commonly have same behavior. When possible we prefer to use original, `ng`, instead of the "alias" `ionic`.

OBS-3: before running each cmd I recommend to add `--dry-run` to run a simulation.

`/core/api/api.service.ts`

```
import { environment } from '@env/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  constructor(
    private httpClient: HttpClient
  ) { }

  public get(endp: string, urlParams: object = {}) {

    let params = new HttpParams();

    Object.keys(urlParams).forEach(element => {
      params = params.append(element, urlParams[element])
    });

    return this.httpClient.get(`${API_URL}${endp}`, {params});
  }
}
```

## ItemsModule

### Setup

```
$ ng generate module items --routing
CREATE src/app/items/items-routing.module.ts (251 bytes)
CREATE src/app/items/items.module.spec.ts (291 bytes)
CREATE src/app/items/items.module.ts (287 bytes)
```

OBS-1: I recommend to add `--dry-run` to simulate cmd)

This creates an items folder with two files inside; `ItemsModule` and `ItemsRoutingModule`. 

OBS-2: we switch between `ng` and `ionic`, but both commands commonly have same behavior. When possible we prefer to use original, then `ng` instead of the "alias" `ionic`.

OBS-3: to list available schematics type `$ npx ng g --help`

### Routing

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

OBS: There are several strategies to [preload a lazyloaded module](https://www.bennadel.com/blog/3506-preloading-lazy-loaded-feature-modules-in-angular-6-1-9.htm), for ex. adding a data object to the routes config `data: { preload: true }`:
```
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule', data: { preload: true } },
  { path: 'items', loadChildren: './items/items.module#ItemsModule' },
];
```

### Item Interface

When dealing with different data sources, it is useful to model those data sources with a common interface. Interfaces are not compiled into the JavaScript output of TypeScript, but are useful for [type-checking](https://toddmotto.com/classes-vs-interfaces-in-typescript#using-typescript-interface). It exists some [discussions about using interface vs class](https://github.com/angular/angular/issues/19632), I let you read them and make your opinion.

```
$ ng generate interface items/models/items
CREATE src/app/items/models/items.ts (37 bytes)

// because I like to rename it:
$ mv src/app/items/models/item.ts src/app/items/models/item.interface.ts
```

For this tutorial we'll use [newsapi.org](https://newsapi.org/docs/get-started) service to fetch news from a REST API, the interface of Items is described below:

`src/app/items/models/item.interface.ts`
```
export interface Item {
  author: null,
  title: string,
  description: string,
  url: string,
  urlToImage: string,
  publishedAt: string, // 2018-10-09T16:18:45Z
  content: string
}
```

### Items Service

```
$ ng g service items/services/items
CREATE src/app/items/services/items.service.ts (134 bytes)
```

`src/app/items/services/items.service.ts`
```
import { Item } from '@items/models/item.interface';
import { Injectable } from '@angular/core';
import { ApiService } from '@core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private currentItem: Item;
  
  constructor(
    private apiService: ApiService
  ) { 
    console.log("Constructor ItemsService");
  }

  latest():Promise<Item[]> {

    return this.apiService.get('top-headlines', {country: 'us'}).toPromise()
    .then(
      (res: any) => {
        return res.articles;
      }
    );
  }

  setCurrentItem(item: Item): void {
    this.currentItem = item;
  }

  getCurrentItem(): Item {

    return this.currentItem;
  }
}

```

### Items Pages

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

OBS: since Ionic v4 [ionic generate](https://beta.ionicframework.com/docs/building/scaffolding#generating-new-features) allow to use a path instead of page name only

And update ItemsRoutingModule, to include them

```
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemsListPage } from './pages/items-list/items-list.page';
import { ItemDetailPage } from './pages/item-detail/items-detail.page';

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



## Mock Items Service

The objective of mock is to help on development and debug

```
$ ng g service items/services/items-mock --spec=false
CREATE src/app/items/services/items-mock.service.ts (138 bytes)
$ ng g class items/services/items-mock --spec=false
CREATE src/app/items/services/items-mock.ts (27 bytes)
```

`src/app/items/services/items-mock.service.ts`
```
import { Item } from './../models/item.interface';
import items from './items-mock';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private items$: Observable<Item[]> = of(items.items).pipe(
    delay(2000)
  );
  private currentItem: Item;

  latest():Promise<Item[]> {

    return this.items$.toPromise();
  }

  setCurrentItem(item: Item): Promise<Item> {
    this.currentItem = item;

    return Promise.resolve(this.currentItem);
  }

  getCurrentItem(): Promise<Item> {

    return Promise.resolve(this.currentItem);
  }
}
```

`src/app/items/services/items-mock.ts`
```
let items = {
  "items": [
    {
      "author": null,
      "title": "Justice Kavanaugh Takes the Bench on the Supreme Court",
      "description": "On Tuesday, Justice Brett M. Kavanaugh heard his first Supreme Court arguments, all concerning enhanced sentences for gun crimes.",
      "url": "https://www.nytimes.com/2018/10/09/us/politics/justice-brett-kavanaugh-supreme-court.html",
      "urlToImage": "https://static01.nyt.com/images/2018/10/10/us/politics/10dc-scotus-sub/10dc-scotus-sub-facebookJumbo.jpg",
      "publishedAt": "2018-10-09T16:18:45Z",
      "content": "Chief Justice John G. Roberts Jr. started the day by welcoming Justice Kavanaugh, telling him that “we wish you a long and happy career.” Justice Elena Kagan, who sits next to Justice Kavanaugh on the bench, was spotted whispering and laughing with him in the… [+1283 chars]"
    },  
    {
      "author": "https://www.facebook.com/bbcnews",
      "title": "Skripal attack: GRU suspect Mishkin traced to Russian village",
      "description": "BBC Russian finds villagers who remember a GRU agent accused over the Salisbury attack.",
      "url": "https://www.bbc.com/news/world-europe-45799037",
      "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/15FDE/production/_103787009_loyginskaya_railway_-new.jpg",
      "publishedAt": "2018-10-09T16:04:56Z",
      "content": "Image copyright Leg29 Image caption For most of the year, Loyga is accessible only via a narrow-gauge railroad, ending at a dilapidated old depot The tiny village of Loyga in the Russian far north is not the kind of place you would expect to be at the centre … [+5129 chars]"
    },
    {
      "id": "3",
      "author": "Andrew Gebhart",
      "title": "Google Home Hub joins the fight to put a screen on your countertop",
      "description": "Google's smart display cuts the camera and adds adaptive brightness and a smart home control panel.",
      "url": "https://www.cnet.com/reviews/google-home-hub-preview/",
      "urlToImage": "https://cnet1.cbsistatic.com/img/F8dm2lqMJ7If-_ONUNsv19_OabA=/830x467/2018/10/01/0f07b5f9-3fda-4717-bd88-38771f49902d/google-home-hub-2094.jpg",
      "publishedAt": "2018-10-09T16:01:04Z",
      "content": "Google's new smart display is called the Home Hub, and it's available in four different colors for $150. Sarah Tew/CNET Hey Google, what do you get when you combine a smart speaker, a touchscreen and a smart home control panel? Answer: The Google Home Hub. We… [+8721 chars]"
    }
  ]
};

export default items;
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