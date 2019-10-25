---
layout: post
title: 'Create a CRUD App with Ionic 4, Firestore and AngularFire 5.2+'
categories: [Ionic]
tags: [Ionic-v4, AngularFire, Firebase, Angular, Firestore]
last_modified_at: 2019-09-02T17:15:00Z
author:
  name: Victor Dias
  email: victor.dias@meumobi.com
  github: elbidone
  twitter: meumobi
  bio: Sharing mobile Experiences
  email_md5: 1cd012be2382e755aa763c66acc7cfa6
---

During latest months we've explored deeply how Ionic4/Angular and Firebase can help to develop high scalable (web) Apps. This post is part of the ongoing Ionic4/Angular with Firebase serie, where we cover common use cases. Here is the full series:

- [Master-detail on Ionic4]({% post_url 2018-10-18-implementing-master-detail-ionic4 %})
- [Login flow on Ionic4]({% post_url 2018-10-19-login-flow-ionic4 %})
- [Login flow with Firebase custom auth]({% post_url 2019-07-03-login-flow-with-firebase-custom-auth %})
- [master-detail native App deeplink]({% post_url 2019-08-19-ionic-master-detail-deeplinks %})
- [CRUD APP with Ionic 4, Firestore and AngularFire 5.2+]({% post_url 2019-05-29-crud-ionic4-angulafire5-app %})

 ```
/!\ This post was updated on Sep 10, 2019 and tested with these packages:

@angular/cli@8.3.3
cordova@9.0.0 
@ionic/angular@4.9.0
@angular/fire@5.2.1
firebase@6.6.0

Update Notes: Updated code snippets for Angular v8

Find an issue? Drop a comment I'll fix it ASAP
```

## TLTR
Quick resume for people in a hurry:
### Observable data service

```typescript
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';

import * as firebase from 'firebase/app';
import 'firebase/firestore';

import { Observable } from 'rxjs';
import { Item } from './item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private itemsCollection: AngularFirestoreCollection<Item>;
  private collectionPath = 'items';

  constructor(
    private afs: AngularFirestore
  ) {
    this.itemsCollection = afs.collection<Item>('items', ref => ref.orderBy('publishedAt', 'desc'));
  }
  
  get items$: Observable<Item[]> {
    return this.itemsCollection.valueChanges({idField: 'id'});
  }
  ...
```

### Create => Push

```typescript
  public push(item: any): Promise<DocumentReference> {
    const timestamp = this.timestamp;
    return this.itemsCollection.add({
      ...item,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  }
```
### Read
#### List
Public data stream `this.items$ = this.itemsCollection.valueChanges({idField: 'id'});`

#### Object

```js
  public getById(id: string): Observable<any> {
    return this.itemsCollection.doc(id).valueChanges();
  }
```
### Update => Update or Set

```js
  /**
   * AngularFirestore provides methods for setting and updating
   * - set(data: T) - Destructively updates a document's data.
   * - update(data: T) - Non-destructively updates a document's data.
   */
   
  public set(id: string, item: Item): Promise<void> {
    return this.itemsCollection.doc(id).set(item);
  }

  public update(id: string, item: Item): Promise<void> {
    return this.itemsCollection.doc(id).update(item);
  }
```

### Delete => Remove

```js
  public remove(id: string): Promise<void> {
    return this.itemsCollection.doc(id).delete();
  }
```

## Repository & demo

Demo app is deployed on [crud-angularfirestore-ionic4.web.app](https://crud-angularfirestore-ionic4.web.app)

All source code can be found on GitHub: [https://github.com/meumobi/mmb-demos.crud-angularfirestore-ionic4](https://github.com/meumobi/mmb-demos.crud-angularfirestore-ionic4)

## What you'll build
We are going to create a news App, implementing CRUD actions (Create, Read, Update, Delete).

We'll use [Ionic] for UI with [Angular], [Firestore] as Cloud db and [AngularFirestore], the official Angular library for Firebase.

Our main concern is to apply good/recommended practices:

- [x] Lazy load pages and deep-linking

  - [Angular Firebase: How to Lazy Load Components in Angular 4 in Three Steps](https://angularfirebase.com/lessons/how-to-lazy-load-components-in-angular-4-in-three-steps/)

- [x] Shared and Core modules

  - [6 Best Practices & Pro Tips when using Angular CLI](https://medium.com/@tomastrajan/6-best-practices-pro-tips-for-angular-cli-better-developer-experience-7b328bc9db81)
	
- [x] Observable data service
	- [Angular university - How to build Angular apps using Observable Data Services](https://blog.angular-university.io/how-to-build-angular2-apps-using-rxjs-observable-data-services-pitfalls-to-avoid/)
	- [Cory Rylan - Angular Observable Data Services](https://coryrylan.com/blog/angular-observable-data-services)

- [x] Keep a consistent timestamp via back-end server
  - [AngularFirebase: CRUD Operations with Server Timestamps](https://angularfirebase.com/lessons/firestore-advanced-usage-angularfire/#3-CRUD-Operations-with-Server-Timestamps)

<!-- Add screenshots here -->

## What you'll need
We need to have [Node.js] and [Git] installed in order to install both [Ionic] and [Cordova]. Follow the [Android](https://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html) and [iOS](https://cordova.apache.org/docs/en/latest/guide/platforms/ios/index.html) platform guides to install required tools for development.

And of course you'll also need a [Firebase] account.

## Methodology
Each main section below corresponds to a visible milestone of the project, where you can validate work on progress running App.

1. Create a project
2. Run & deploy the application
3. Create pages and routing
4. Data modeling
5. Add Firebase on project
6. Observable data service

By this way you can pickup what is interesting for you and/or run tutorial on several days always keeping a stable state of project, avoid big bang ;-)

## Create a project

### Prerequisites
Install both [Ionic] and [Cordova].

```terminal
$ npm install cordova ionic typescript @angular/cli -g
...

$ npm ls -g cordova ionic npm typescript @angular/cli --depth 0
/Users/victor.dias/.nvm/versions/node/v12.6.0/lib
├── @angular/cli@8.3.3 
├── cordova@9.0.0 
├── ionic@5.2.7 
├── npm@6.9.0 
└── typescript@3.6.2 
```

### Create a new Ionic v4 application

Create a New Ionic/Angular Application with

```terminal
$ ionic start mmb-demos.crud-angularfirestore-ionic4 blank --type=angular --cordova --package-id=com.meumobi.crud-angularfire-ionic4
$ cd mmb-demo.crud-angularfirestore-ionic4
```

That means:

- `ionic start` creates the app.
- `meu-starter.crud-angularfire.ionic-v4` is the name we gave it.
- `blank` tells the Ionic CLI the template you want to start with. You can list available templates using [ionic start --list](https://ionicframework.com/docs/cli/commands/start#options)
- `--type=<angular>` type of project to start (e.g. angular, react, ionic-angular, ionic1)
- `--cordova` include Cordova integration (default config.xml, iOS and Android resources, like icon and splash screen)
- `--package-id=<com.meumobi.crud-angularfire.ionic-v4>` specify the bundle ID/application ID for your app (reverse-DNS notation)

The command `ionic start` will initialize a git repository and run `npm install` to get all the packages into `node_modules`.

### File structure

There's no perfect solution or unique rule to define file structure, it's important to consider how and where your App will grow to adapt the file structure to your project. I highly recommend to read some posts to be aware of basic recommendations:
- [Angular.io: Overall structural guidelines](https://angular.io/guide/styleguide#overall-structural-guidelines)
- [How to define a highly scalable folder structure for your Angular project](https://itnext.io/choosing-a-highly-scalable-folder-structure-in-angular-d987de65ec7)


```
./src
  /app
    /pages
      item-list/
      item-detail/
      item-form/
    app-routing.module.ts
    app.module.ts
    /components
      item-headline
    shared
      item.ts
      item-mock.ts
      item-mock-service.ts
      item.service.ts|spec.ts
      index.ts
...
```

Interesting points to observe:
- we use a shared module for item model and servive, because these classes will be shared across pages
- we use a shared component `item-headline`, it will be convenient to use it on item-list and item-detail to not repeat ui, although it's not common on 'real world'.
- items service is "mocked", it's easier to test our App, consuming mock entries.

## Run & deploy the application
### Run your app on web browser
You can test the App running `ionic serve` cmd:

```
$ ionic serve
```

### Ionic lab to test iOS and Android rendering
To test iOS and Android views I recommend using [@ionic/lab](https://www.npmjs.com/package/@ionic/lab) package

`$ npm i --save-dev @ionic/lab`

and run

```
$ ionic serve --lab
```

### Deploy native Apps on device
It's not the purpose of this tutorial, so I will not develop this topic but if you need check links below for more details:

- [deploy Ionic apps to iOS](https://ionicframework.com/docs/building/ios) simulators and devices using Cordova
- [deploy Ionic apps to Android](https://ionicframework.com/docs/building/android) simulators and devices using Cordova

## Create pages and routing
### Pages
Then let's go! 
We start creating pages to implement CRUD, `item-list`, `item-form` and `item-detail`. 

```
$ ng g page pages/item-list
CREATE src/app/pages/item-list/item-list.module.ts (554 bytes)
CREATE src/app/pages/item-list/item-list.page.scss (0 bytes)
CREATE src/app/pages/item-list/item-list.page.html (128 bytes)
CREATE src/app/pages/item-list/item-list.page.spec.ts (706 bytes)
CREATE src/app/pages/item-list/item-list.page.ts (267 bytes)
UPDATE src/app/app-routing.module.ts (565 bytes)
$ ng g page pages/item-detail
CREATE src/app/pages/item-detail/item-detail.module.ts (564 bytes)
CREATE src/app/pages/item-detail/item-detail.page.scss (0 bytes)
CREATE src/app/pages/item-detail/item-detail.page.html (130 bytes)
CREATE src/app/pages/item-detail/item-detail.page.spec.ts (720 bytes)
CREATE src/app/pages/item-detail/item-detail.page.ts (275 bytes)
UPDATE src/app/app-routing.module.ts (669 bytes)
$ ng g page pages/item-form
CREATE src/app/pages/item-form/item-form.module.ts (554 bytes)
CREATE src/app/pages/item-form/item-form.page.scss (0 bytes)
CREATE src/app/pages/item-form/item-form.page.html (128 bytes)
CREATE src/app/pages/item-form/item-form.page.spec.ts (706 bytes)
CREATE src/app/pages/item-form/item-form.page.ts (267 bytes)
UPDATE src/app/app-routing.module.ts (765 bytes)
```

We can reuse `item-form` to create and edit item depending if an id already exists or not.

### Routing

Schematics from [@ionic/angular-toolkit](https://github.com/ionic-team/angular-toolkit) auto add new routes on `src/app/app-routing.module.ts` but we need to make some changes:

- set item-list as default page (instead of home)
- use new syntax introduced in Angular 8 for loadChildren (as [loadChildren:string is now deprecated](https://github.com/angular/angular/pull/30073)).
- add `item-add` path, use ItemEdit component to create item
- add id as param on item-edit and item-detail

Open and edit `src/app/app-routing.module.ts` to add updates routes as following.

```
...


const routes: Routes = [
  { path: '', redirectTo: 'item-list', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'item-list', loadChildren: () => import('./pages/item-list/item-list.module').then( m => m.ItemListPageModule) },
  { path: 'item-detail/:id', loadChildren: () => import('./pages/item-detail/item-detail.module').then( m => m.ItemDetailPageModule) },
  { path: 'item-edit/:id', loadChildren: () => import('./pages/item-form/item-form.module').then( m => m.ItemFormPageModule) },
  { path: 'item-create', loadChildren: () => import('./pages/item-form/item-form.module').then( m => m.ItemFormPageModule) },
];

...
```

At this stage you can add links on pages to test navigation or access directly to lazy-loaded pages running `ionic serve` and typing url on address bar of your browser.
- '/' for item-list
- '/item-create'
- '/item-detail/123' for item-detail
- '/item-update/123' for item-update

## Data modeling
### Model
We'll use type specifier to get a typed result object. 

Inspired by [RSS specification](https://validator.w3.org/feed/docs/rss2.html) we'll manage `items` with following fields:
- title: string
- description: string
- createdAt: Timestamp; // Epoch timestamp
- modifiedAt: Timestamp; // Epoch timestamp
- link: string
- imageUrl: string

```
$ ng generate class shared/item --type model --skipTests
CREATE src/app/shared/item.model.ts (37 bytes)
```

Open and edit `src/app/shared/item.model.ts` as below:

```
import { Timestamp } from '@firebase/firestore-types';

export class Item {
  id?: string;
  title: string;
  description: string;
  createdAt: Timestamp;
  modifiedAt: Timestamp;
  link: string;
  imageUrl: string = null;
}
```

Interesting points to observe:

- To prevent inconsistencies due to user’s local system, we'll use [firebase.firestore.FieldValue.serverTimestamp()](https://firebase.google.com/docs/reference/js/firebase.firestore.FieldValue) as back-end server timestamp.
- the `id` field is optional because it is filled by angularfirebase. 
> An 'idField' option can be used with collection.valueChanges() to include the document ID on the emitted data payload. On previous versions we use to duplicate the key of document within the document itself as id, definitely not a good practice, could avoid it now!

This feature is available since [Angularfire v5.2 (20190531)](https://github.com/angular/angularfire2/blob/master/CHANGELOG.md#520-2019-05-31) thanks to [Jeff Delaney](https://twitter.com/jeffdelaney23), the author of the PR. 

## Add Firebase on project
### Create a Firebase project
Before you can add Firebase to your JavaScript app, you need to [create a Firebase project](https://firebase.google.com/docs/web/setup#create-project) to connect to your app.

### Register your app
After you have a Firebase project, you can [add your web app](https://firebase.google.com/docs/web/setup#register-app) to it.

### Install dependencies
[@angular/fire](https://github.com/angular/angularfire2) is the official Angular library for Firebase, we'll install both packages:

```
$ npm install firebase @angular/fire --save
```
### Setup Environment Config
To initialize Firebase in your app, you need to provide your app's [Firebase project configuration](https://firebase.google.com/docs/web/setup#config-object). Copy it on `src/environments/environment.ts`

```js
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyA5Xvv-O_G531RILC50FlRBSWr-HVzlEJA',
    authDomain: 'meu-starter.firebaseapp.com',
    databaseURL: 'https://meu-starter.firebaseio.com',
    projectId: 'meu-starter',
    storageBucket: 'meu-starter.appspot.com',
    messagingSenderId: '581248963506',
    appId: '1:581248963506:web:b207e18491151d7bee4aab'
  }
};
```

### Connect Firebase to Angular
Add required modules, AngularFireModule and AngularFirestoreModule, on your `app.module`. Also add our environment config.

```js
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

```

## Observable data service
### Definition
Observable data services or stores are a simple and intuitive pattern that allows tapping into the power of functional reactive programming in Angular without introducing too many of new concepts. An observable data service is an Angular injectable service that can be used to provide data to multiple parts of the application.
This pattern can ensure data is coming from one place in our application and that **every component receives the latest version of that data through our data streams**. 

- [Cory Rylan: Angular Observable Data Services](https://coryrylan.com/blog/angular-observable-data-services)
- [Angular university: How to build Angular apps using Observable Data Services](https://blog.angular-university.io/how-to-build-angular2-apps-using-rxjs-observable-data-services-pitfalls-to-avoid/)

```
$ ng generate service shared/item --skipTests
```

AngularFirestore provides [methods to manipulate documents](https://github.com/angular/angularfire2/blob/master/docs/firestore/documents.md#manipulating-documents) setting, updating, and deleting document data:

- set(data: T) - Destructively updates a document's data.
- update(data: T) - Non-destructively updates a document's data.
- delete() - Deletes an entire document. Does not delete any nested collections.


```js
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentReference
} from '@angular/fire/firestore';

import * as firebase from 'firebase/app';
import 'firebase/firestore';

import { Observable } from 'rxjs';
import { Item } from './item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private itemsCollection: AngularFirestoreCollection<Item>;
  items$: Observable<Item[]>;

  constructor(
    private afs: AngularFirestore
  ) {
    this.itemsCollection = afs.collection<Item>('items', ref => ref.orderBy('publishedAt', 'desc'));
    this.items$ = this.itemsCollection.valueChanges({idField: 'id'});
  }
/**
 * Inspired by https://angularfirebase.com/lessons/firestore-advanced-usage-angularfire/#3-CRUD-Operations-with-Server-Timestamps
 */
  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  push(item: any): Promise<DocumentReference> {
    const timestamp = this.timestamp;
    return this.itemsCollection.add({
      ...item,
      createdAt: timestamp,
      modifiedAt: timestamp,
      publishedAt: timestamp,
    });
  }
}
```

## Angular Firestore Dynamic Query
To enable [dynamic queries](https://github.com/angular/angularfire2/blob/master/docs/firestore/querying-collections.md#dynamic-querying) one should lean on RxJS Operators like switchMap.


## Memory leak

subscribe on component should be unsubscribed [OnDestroy](https://angular.io/api/core/OnDestroy)

sub: Subscription;

  ngOnInit() {
    this.itemService.getById(this.itemId).subscribe(item => {
      this.item = item;
    });
  }


ngOnDestroy(){
   this.sub.unsubscribe()
}

## ion-img
:root {
  ion-img {
    /** 
     * Bug fix for:
     * https://github.com/ionic-team/ionic/issues/18734
     */
    min-height: 1px !important;
  }
}

## ionic and forms
https://ionicframework.com/docs/v3/developer-resources/forms/

## Binding db collection to component
Now we need to create a tasks member variable and bind it to our collection inside ngOnInit, ensure that your component implements the OnInit interface

## Improve UX with Skeleton Loading Screens

https://ionicthemes.com/tutorials/about/improved-ux-for-ionic-apps-with-skeleton-loading-screens

## Add input tags

### [@ngx-lite/input-tag](https://ngxlite.com/docs/input-tag)
### Material design components for Angular
https://material.angular.io/components/chips/overview
https://www.dev6.com/angular/angular-material-chips-with-reactive-forms-and-custom-validation/
https://stackblitz.com/angular/xvvkqgrrebo?file=app%2Fchips-input-example.ts
[Simon Grimm: Getting Started with Angular Material in Ionic 4](https://devdactic.com/angular-material-ionic-4/)
### [ngx-chips]()

> The component has never been designed for a mobile device. While I close all the bugs this will not be a priority.

[Source](https://github.com/Gbuomprisco/ngx-chips/issues/557#issuecomment-378911551)

[Ionic 4 Tags Input](https://edupala.com/ionic-4-tags-input/)

### Angular - insert value in reactive forms array at specific index

## formControl patchValue vs setValue

If you don't supply a value for all form controls
Either use setValue and provide value for all form controls:

this.form.setValue({ first: "", second: "" });
or, if you really intend to set partial values, use patchValue method:

this.form.patchValue({ second: "" });

## Firestore to query by an array's field value

it is not possible, with [array-contains](https://angularfirebase.com/lessons/query-by-array-contains-firestore/), to query for a specific property of an object stored in an array.

However, there is a possible workaround: it is actually possible to query for the entire object, as follows, in your case:

db.collection('identites').where("partyMembers", "array-contains", {id: "7LNK....", name: "John Travolta"})
Maybe this approach will suit your needs (or maybe not....).

[Source](https://stackoverflow.com/a/54082731/4982169)

## Ngx: Call function from a string name

```
  handleItemAction(event) {
    const functionName = event.functionName;
    if (this[functionName]) {
      // method exists on the component
      const param = event.functionParam;
      this[functionName](param.item); // call it
    }
  }
```

[Source](https://stackoverflow.com/a/42108803/4982169)

## event.stopPropagation vs event.preventDefault

https://stackoverflow.com/a/5963688/4982169

{% comment %}
## Mock
### Mocked data (stub)


```
$ ng generate class shared/item-mock --skipTests
CREATE src/app/items/shared/item-mock.ts (26 bytes)
```

```
import { Item } from './item.model';

/* tslint:disable:max-line-length */

export function getTestItems(): Item[] {
  return [
    {
      id: '1234',
      title: 'Judge ordered Capital One hacker Paige Thompson to remain in prison.',
      description: 'A U.S. judge ordered Capital One hacker Paige Thompson to remain in custody pending trial because her “bizarre and erratic” behavior makes the woman at risk. The judge argued that she is a flight risk and poses a physical danger to herself and others.',
      publishedAt: '2019-08-26T08:34:17Z',
      createdAt: '2019-08-26T08:34:17Z',
      modifiedAt: '2019-08-26T08:34:17Z',
      link: 'https://securityaffairs.co/wordpress/90385/cyber-crime/capital-one-hacker-prison.html',
      enclosure: 'https://i1.wp.com/securityaffairs.co/wordpress/wp-content/uploads/2019/07/capital-one.jpg',
      author: 'Pierluigi Paganini'
    }, {
      id: '1235',
      title: 'Japanese Yen Rides Haven Bids Higher As US China Trade War Reignites',
      description: 'The Japanese Yen has made broad gains which put a key long-term US Dollar uptrend against it in very serious doubt. Month-end will be fascinating for this pair.',
      publishedAt: '2019-08-26T08:00:00Z',
      createdAt: '2019-08-26T08:00:00Z',
      modifiedAt: '2019-08-26T08:00:00Z',
      link: 'https://www.dailyfx.com/forex/technical/article/fx_technical_weekly/2019/08/26/Japanese-Yen-Rides-Haven-Bids-Higher-As-US-China-Trade-War-Reignites-.html',
      enclosure: 'https://a.c-dn.net/b/2liyP6/headline_Yen-japan-tower2.jpg',
      author: 'David Cottle, Analyst, David Cottle'
    }, {
      id: '1236',
      title: 'Square Crypto Praises Gimmicky Bitcoin Giveaways but Doesn\'t Give Any Away',
      description: 'Square Crypto, the cryptocurrency unit of Jack Dorsey\'s mobile-payment company Square, extolled the virtues of gimmicky bitcoin giveaways. But then it didn\'t offer to give any away. What a crypto tease! Do bitcoin giveaways promote adoption? Basically, Square…',
      publishedAt: '2019-08-28T22:00:50Z',
      createdAt: '2019-08-28T22:00:50Z',
      modifiedAt: '2019-08-28T22:00:50Z',
      link: 'https://www.ccn.com/square-crypto-bitcoin-giveaway/',
      enclosure: 'https://www.ccn.com/wp-content/uploads/2019/08/bitcoin-giveaway-ss.jpg',
      author: 'Samantha Chang'
    }, {
      id: '1237',
      title: 'I learned to READ my dreams (and you can too)',
      description: 'British model Victoria Aitken said her dreams had always been /\'intense\' but she \'never used to pay them much heed\'. Then, she realised \'they were telling her about the issues she faced in her  life\'.',
      publishedAt: '2019-08-28T21:07:02Z',
      createdAt: '2019-08-28T21:07:02Z',
      modifiedAt: '2019-08-28T21:07:02Z',
      link: 'https://www.dailymail.co.uk/femail/article-7404131/I-learned-READ-dreams-too.html',
      enclosure: 'https://i.dailymail.co.uk/1s/2019/08/28/21/17803628-0-image-a-131_1567024609120.jpg',
      author: 'By Victoria Aitken for the Daily Mail'
    }
  ];
}

```

### Mocked service
Considering good practices on dev workflow we'll start using a testing service consuming mocked data. Of course this service should follow the signature used on target service, but we'll explain better the `Observable data service` pattern used on next section.

```
$ ng generate service shared/item-mock --skipTests
```

```
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { getTestItems } from 'src/app/model/items-mock';
import { Item } from 'src/app/model/item.model';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private items: BehaviorSubject<Item[]> = new BehaviorSubject([]);

  constructor() {
    this.items.next(getTestItems());
  }

  get items$(): Observable<Item[]> {
    // Simulate a delay
    return this.items.asObservable().pipe(delay(3000));
  }

  getItem(id: string): Observable<Item> {
    const item = getTestItems().find(i => i.id === id);

    return of(item);
  }

  pushItem(item: Item): void {
    throw new Error('Method not implemented.');
  }

  removeItem(id: string): void {
    throw new Error('Method not implemented.');
  }

  updateItem(item: Item): void {
    this.getItem(item.id).pipe(
      map(i => {
        if (i) {
          return Object.assign(i, item);
        }
        throw new Error(`Item ${item.id} not found`);
      })
    );
  }
}
```

## Good pratices:
### Typescript path mapping
An Angular app's file structure can be relatively deep, making it difficult to figure out where a module lives when importing it. The idea is to make your import paths go from `../../../../` to `@namespace`. TypeScript compiler supports the declaration of mappings using "paths" property in `tsconfig.json` files. Using [TypeScript path mapping](https://www.typescriptlang.org/docs/handbook/module-resolution.html) make import statements in your Angular app shorter and much more developer-friendly

```
// tsconfig.json in the root dir

{
  "compileOnSave": false,
  "compilerOptions": {

    // omitted...

    "baseUrl": "src",
    "paths": {
      "@shared/*": ["app/shared/*"],
      "@env/*": ["environments/*"]
    }
  }
}
```

Then instead of

```
// import from component.ts
import { MyService } from '../../../shared/items.service';
```

we can use custom namespace `@shared` declared on `tsconfig.json` to use following import:

```
// import from component.ts
import { MyService } from '@shared/items.service';
```

More [details](https://angularfirebase.com/lessons/shorten-typescript-imports-in-an-angular-project/)

### index.ts to organize import of service
To easily switch between the mocked service and the original (we'll create later on this tutorial) we add an `index.ts` on shared directory

```
export { ItemsService } from './items-mock.service';
// export { ItemsService } from './items.service';
```

By this way we can do import as below no matter if mocked or not.
`import { ItemsService } from '@shared';`

### Testing
#### Component
In order to validate our mocked data and service created above we'll load mocked data on item-list. Let's start by subscribing `items$` observable on item-list component.

Edit `src/app/items/pages/item-list/item-list.page.ts`

```ts
import { Component, OnInit } from '@angular/core';
import { Item } from '../../shared/item.model';
import { Observable } from 'rxjs';
import { ItemsService } from '../../shared';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.page.html',
  styleUrls: ['./item-list.page.scss'],
})
export class ItemsListPage implements OnInit {

  items$: Observable<Item[]>;

  constructor(private itemsService: ItemsService) { }

  ngOnInit() {
    this.items$ = this.itemsService.items$;
  }
}

```

#### Template
And now, display items on template.
`src/app/pages/item-list/item-list.page.html` as below:

```html
<ion-header>
  <ion-toolbar>
    <ion-title>item-list</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content>
  <div *ngFor="let item of items$ | async">
    <ion-card>
      <img [src]="item.enclosure" />
      <ion-card-header>
        <ion-card-subtitle>News</ion-card-subtitle>
        <ion-card-title>{{ item.title }}</ion-card-title>
      </ion-card-header>
      <ion-card-content>{{ item.description }}</ion-card-content>
    </ion-card>
    <hr />
  </div>
</ion-content>
```

At this stage you can browse /items/list and see mocked data displayed.

## Templates

### item-list: add button to create item
Before connecting our app with the firebase db we'll prepare our views to host data. On previous section we've created the item-list template, let's add now a fab button to add item and reach item-edit template.

```
  <ion-fab vertical="bottom" horizontal="end" slot="fixed">
    <ion-fab-button>
      <ion-icon name="add" routerLink="/item-add"></ion-icon>
    </ion-fab-button>
  </ion-fab>
```

And the item-edit page hosting form:

```

```

### item-form

We'll share same UI `item-form` to create and edit item. If an id is passed as request param means view should load existing item to edit else create new one.

```
id: string;
item: Item;

constructor(
	navParams: NavParams,
	itemsService: ItemsService
) {}

ngOnInit() {
	this.id = this.navParams.data.id;
	
	if (!this.id) {
		this.item = new Item();
	} else {
			this.itemsService.getItem(this.id).subscribe(
				data => {
					this.item = data;
				}
			)
	}
}
```


## Observable data service
Observable data services or stores are a simple and intuitive pattern that allows tapping into the power of functional reactive programming in Angular without introducing too many of new concepts. An observable data service is an Angular injectable service that can be used to provide data to multiple parts of the application.
This pattern can ensure data is coming from one place in our application and that every component receives the latest version of that data through our data streams. 
Angular observable data service
[Cory Rylan: Angular Observable Data Services](https://coryrylan.com/blog/angular-observable-data-services)
[]()


Our todos service will have basic CRUD operations and a Observable stream to subscribe to



## Build optimized release for PROD

```
$ ionic build --prod
$ 
```

### Add to github repo

```
$ git remote add origin git@github.com:yourusername/yourrepository.git
$ git push --set-upstream origin master
```
Then all source code can be found on GitHub: [meumobi/mmb-demos.crud-angularfirestore-ionic4](https://github.com/meumobi/mmb-demos.crud-angularfirestore-ionic4.git)
If you look on commits history you should notice one commit for each main section above. 

### Deploy to github pages
https://angular.io/guide/deployment#deploy-to-github-pages

## Testing
- [How to mock AngularFire 2 service in unit test?](https://stackoverflow.com/questions/38042941/how-to-mock-angularfire-2-service-in-unit-test)
- [Jasmine Unit Tests in an RxJs + Firebase app: Part 1](https://code.scottshipp.com/2017/05/24/jasmine-unit-tests-in-an-rxjs-firebase-app-part-1/)
- [Angular Component Test Driven Development (TDD) Starter Guide](https://angularfirebase.com/lessons/angular-testing-guide-including-firebase/)
- [Three Ways to Test Angular Components](https://vsavkin.com/three-ways-to-test-angular-2-components-dcea8e90bd8d)


- [Jave Bratt: Role-based authentication with Ionic & Firebase](https://javebratt.com/role-based-auth/)
- [Simon Grimm: Navigating the Change with Ionic 4 and Angular Router](https://blog.ionicframework.com/navigating-the-change-with-ionic-4-and-angular-router/)
- [Smarter way to organize “import” statements using “index.ts” file(s) in Angular](https://medium.com/@balramchavan/smarter-way-to-organize-import-statements-using-index-ts-file-s-in-angular-c685e9d645b7)

{% endcomment %}

## Furthermore

- [AngularFirebase: Reactive CRUD App With Angular and Firebase Tutorial](https://angularfirebase.com/lessons/reactive-crud-app-with-angular-and-firebase-tutorial/)
- [Angular Templates.io: Angular CRUD with Firebase](https://angular-templates.io/tutorials/about/angular-crud-with-firebase)
- [Jave Bratt: Building a CRUD Ionic application with Firestore](https://javebratt.com/crud-ionic-firestore/)
- [Josh Morony: Implementing a Master Detail Pattern in Ionic 4 with Angular Routing](https://www.joshmorony.com/implementing-a-master-detail-pattern-in-ionic-4-with-angular-routing/)
- [Simon Grimm: How to Build An Ionic 4 App with Firebase and AngularFire 5](https://devdactic.com/ionic-4-firebase-angularfire-2/)
- [Angular 7 Firebase 5 CRUD Operations with Reactive Forms](https://www.positronx.io/angular-7-firebase-5-crud-operations-with-reactive-forms/)

[Node.js]: <https://nodejs.org/en/download/>
[Git]: <http://git-scm.com/download>
[Ionic]: <https://ionicframework.com/>
[Cordova]: <https://cordova.apache.org/>
[AngularFirestore]: <https://github.com/angular/angularfire2#cloud-firestore>
[Angular]: <https://angular.io/>
[Firebase]: <https://firebase.google.com/>
[Firestore]: <https://firebase.google.com/products/firestore/>