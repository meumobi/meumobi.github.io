---
layout: post
title: 'Create a CRUD App with Ionic 4, Firestore and AngularFire 5'
categories: [Ionic]
tags: [Ionic-v4, AngularFire, Firebase, Angular, Firestore]
author:
  name: Victor Dias
  email: victor.dias@meumobi.com
  github: elbidone
  twitter: meumobi
  bio: Sharing mobile Experiences
  email_md5: 1cd012be2382e755aa763c66acc7cfa6
---

Last year I've published a post [Create a CRUD App with Ionic 4 and AngularFire 5]({% post_url 2018-10-18-create-crud-app-ionic4-angularfire5 %}). The purpose of this serie about Ionic and firebase is use explore how these 2 products can help building App (web or native). On previous post I used a beta release of Ionic 4 with Angular 6 and AngularFire 5.0. All of these frameworks have reached significant upgrades during last months and I'd like to review the combination of them with latest versions and update code when required. Let's go!

## Application
We are going to create a news App, implementing CRUD actions (Create, Read, Update, Delete).

Our main concern is to apply good/recommended practices:
- split each feature into a lazy loaded module
- core, shared module
- routing module
- generate data provider and mockup
- create interface for data

We'll use Ionic v4.4 for UI with Angular 7, AngularFire 5.1 and firestore as Cloud db.

## Methodology
Each main section below corresponds to a visible milestone of the project, where you can validate work on progress running App.

- Setup with Ionic Starter
- Setup Feature Module
- Data Modeling and Mock
- Firebase Data Service

By this way you can pickup what is interesting for you and/or run tutorial on several days always keeping a stable state of project, avoid big bang ;-)

## Setup with Ionic Starter

### Prerequisites
We need to have [Node.js] and [Git] installed in order to install both [Ionic] and [Cordova].

```
$ npm install cordova ionic typescript -g
...

$ npm ls -g cordova ionic npm typescript --depth 0
/Users/vdias/.nvm/versions/node/v8.9.0/lib
├── @angular/cli@7.3.9
├── cordova@9.0.0 
├── ionic@4.12.0 
├── npm@6.9.0 
├── phonegap@8.2.2
└── typescript@3.4.5 
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

### File Structure

There's no perfect solution or unique rule to define file structure, it's important to consider how and where your App will grow to adapt the file structure to your project. I highly recommend to read some posts (as [How to define a highly scalable folder structure for your Angular project](https://itnext.io/choosing-a-highly-scalable-folder-structure-in-angular-d987de65ec7)) to be aware of basic recommendations.


> Lazy load an entire module that can contain multiple pages, and the components they are suppose to use.

```
./src
  /app
    /items
      items-routing.module.ts
      items.module.ts
      components/
        profile-headline
      pages/
        items-list
        item-detail
        item-edit
      models/
        item.ts
	    services/
	  	  index.ts
	      items.service.ts
	      items-mock.service.ts
	      items-mock.ts
...
```

At this stage you can observe some interesting points:
- we use routing module for items, not for shared module, because we don't expect to share any route
- items service is "mocked", it's easier to test our App, consuming mock entries.

## Setup Feature Module
### Module
It's considered [best practice to add routing module for each feature module](https://angular.io/guide/lazy-loading-ngmodules). 
Then we'll add a new module for items (before running each cli I recommend to add `--dry-run` to simulate cmd):

```
$ ng generate module items --routing
CREATE src/app/items/items-routing.module.ts (248 bytes)
CREATE src/app/items/items.module.ts (275 bytes)
```

`ItemsRoutingModule` will handle any items-related routing. This keeps the app’s structure organized as the app grows and allows you to reuse this module while easily keeping its routing intact.

`ItemsModule` is needed for setting up lazy loading for your feature module.

### Pages

We create pages required to implement CRUD, `items-list`, `item-edit` and `item-detail`. Then save them on items feature folder.

```
$ ng g page items/pages/items-list --module items
CREATE src/app/items/pages/items-list/items-list.module.ts (559 bytes)
CREATE src/app/items/pages/items-list/items-list.page.scss (0 bytes)
CREATE src/app/items/pages/items-list/items-list.page.html (129 bytes)
CREATE src/app/items/pages/items-list/items-list.page.spec.ts (713 bytes)
CREATE src/app/items/pages/items-list/items-list.page.ts (271 bytes)
UPDATE src/app/items/items.module.ts (275 bytes)
$ ng g page items/pages/item-detail --module items
CREATE src/app/items/pages/item-detail/item-detail.module.ts (564 bytes)
CREATE src/app/items/pages/item-detail/item-detail.page.scss (0 bytes)
CREATE src/app/items/pages/item-detail/item-detail.page.html (130 bytes)
CREATE src/app/items/pages/item-detail/item-detail.page.spec.ts (720 bytes)
CREATE src/app/items/pages/item-detail/item-detail.page.ts (275 bytes)
UPDATE src/app/items/items.module.ts (275 bytes)
$ ng g page items/pages/item-edit --module items
CREATE src/app/items/pages/item-edit/item-edit.module.ts (554 bytes)
CREATE src/app/items/pages/item-edit/item-edit.page.scss (0 bytes)
CREATE src/app/items/pages/item-edit/item-edit.page.html (128 bytes)
CREATE src/app/items/pages/item-edit/item-edit.page.spec.ts (706 bytes)
CREATE src/app/items/pages/item-edit/item-edit.page.ts (267 bytes)
UPDATE src/app/items/items.module.ts (275 bytes)
```

Next, open and edit `src/app/items/items-routing.module.ts` to add new routes. No need to import components we'll prefer lazy-loading.

```
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './pages/items-list/items-list.module#ItemsListPageModule'},
  { path: 'detail/:id', loadChildren: './pages/item-detail/item-detail.module#ItemDetailPageModule'},
  { path: 'edit/:id', loadChildren: './pages/item-edit/item-edit.module#ItemEditPageModule'},
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
- '/items/detail/123' for item-detail
- '/items/edit/123' for item-edit

## Data Modeling and Mock
### Model
We'll use type specifier to get a typed result object. 

```
$ ng generate class items/models/item
CREATE src/app/items/models/item.ts (37 bytes)
```

Following RSS convention we'll manage `items` with following fields:
- title: string
- description: string
- published: string // 2018-10-09T16:18:45Z
- link: string
- enclosure: string

### Mock Service

The mock service simulate the interaction w/ backend and provide mocked responses from `items/services/items-mock`.

```
$ ng g service items/services/items-mock --spec=false
CREATE src/app/items/services/items-mock.service.ts (138 bytes)
$ ng g class items/services/items-mock --spec=false
CREATE src/app/items/services/items-mock.ts (27 bytes)
```

At this stage you are ready to test your App. Interactions are fake but you can validate the new feature module and navigation flow.

## Firebase Data Service

### Install dependencies
The service is responsible to connect our App with backend, firestore for this tutorial. It should do CRUD operations.
For development and debug purpose I always recommend to create first a mock service, should help to validate implementation described above (module, pages, model).

Last thing we need to make our App dynamic is to connect firebase.

```
$ npm install firebase @angular/fire
```
### Setup Environment Config
Copy firebase config on `src/environments/environment.ts`

```js
export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDYJC4spEg17xe535ECdcoOnPuEYYpihq4",
    authDomain: "infomobi-v4.firebaseapp.com",
    databaseURL: "https://nfmb-v4.firebaseio.com",
    projectId: "nfmb-v4",
    storageBucket: "nfmb-v4.appspot.com",
    messagingSenderId: "807678202190",
    appId: "1:807678202190:web:9ded4df13461e608"
  }
};
```

And import `@angular/fire` required moduls on your `app.module` as shown below:

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
    AngularFireModule.initializeApp(environment.firebase),
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

### Service


```js
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '@profiles/models';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {

  private profilesCollection: AngularFirestoreCollection<Profile>;
  private profiles$: Observable<Profile[]>;

  constructor(
    private afs: AngularFirestore
  ) {
    this.profilesCollection = afs.collection<Profile>('profiles');
    this.profiles$ = this.profilesCollection.valueChanges();
  }

  create(props: Profile) {
    // Persist a document id
    const id = this.afs.createId();
    const profile: Profile = { id, ...props };
    return this.profilesCollection.doc(id).set(profile);
  }

  update(props: Profile) {
    return this.profilesCollection.doc(props.id).update(props);
  }

  delete(id: string) {
    return this.profilesCollection.doc(id).delete();
  }

  fetchAll() {
    return this.profiles$;
  }

  fecthById(id: string) {
    return this.profilesCollection.doc<Profile>(id).valueChanges();
  }
}

```

## Repository
All source code can be found on GitHub: https://github.com/meumobi/meu-starter.master-detail.ionic-v4
If you look on commits history you should notice one commit for each main section above. 

## Furthemore

https://www.djamware.com/post/5b5cffaf80aca707dd4f65aa/building-crud-mobile-app-using-ionic-4-angular-6-and-cordova

- [Josh Morony: Implementing a Master Detail Pattern in Ionic 4 with Angular Routing](https://www.joshmorony.com/implementing-a-master-detail-pattern-in-ionic-4-with-angular-routing/)
- [Firebase Authentication with whitelisted email addresses](https://stackoverflow.com/questions/46552886/firebase-authentication-with-whitelisted-email-addresses)
- [Simon Grimm: How to Build An Ionic 4 App with Firebase and AngularFire 5](https://devdactic.com/ionic-4-firebase-angularfire-2/)
- [Jave Bratt: Role-based authentication with Ionic & Firebase](https://javebratt.com/role-based-auth/)
- [Simon Grimm: Navigating the Change with Ionic 4 and Angular Router](https://blog.ionicframework.com/navigating-the-change-with-ionic-4-and-angular-router/)

[How to send unique registration links with firebase?](https://stackoverflow.com/questions/53224780/how-to-send-unique-registration-links-with-firebase)


[Node.js]: <https://nodejs.org/en/download/>
[Git]: <http://git-scm.com/download>
[Ionic]: <https://ionicframework.com/>
[Cordova]: <https://cordova.apache.org/>