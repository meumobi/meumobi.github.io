---
layout: post
title: 'Implementing Login flow with Ionic 4'
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

The aim of this post is to describe in details how to control access in Ionic v4 App to only logged user. We'll use Angular Router and Guards to control access and implement from scratch a dummy Athentication Service to do login/logout.
![Login flow with Ionic 4]({{ site.BASE_PATH}}/assets/media/login-flow-ionic4/undraw_security_o890.svg)

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
$ ionic start meu-starter.login-flow.ionic-v4 blank --type=angular
$ cd meu-starter.login-flow.ionic-v4
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
    /login
      login.page.ts
      login.module.ts
      login.page.scss
      login.page.html
    /core
      /auth/
        auth.service.ts
        auth.guard.ts
        core.module.ts
```

### Core Services: `Auth` Service and Guard
`AuthService` and `AuthGuard` are contained on `Core` folder. They are available on the whole App.
Auth Token persistence is assumed by [@ionic/storage](https://ionicframework.com/docs/storage/)

### Pages: Home and Login
The `blank` starter provides a default home page. We'll use it as restricted access page and add a login page with public access.

If trying to access home page, not-logged user is redirected to login page.

### App-routing.module: add canActivate property
On routing module we'll be able to prevent users from accessing areas they’re not allowed to access using `canActivate` property.

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

### Ionic Storage

[Ionic Storage](https://ionicframework.com/docs/storage/) is an easy way to store key/value pairs and JSON objects. Ionic Storage uses a variety of storage engines underneath, picking the best one available depending on the platform.

```
$ npm i --save @ionic/storage
```

On `/core/core.module.ts` only add import of `IonicStorageModule`
```
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  imports: [
    CommonModule,
    IonicStorageModule.forRoot(),
  ],
  declarations: []
})
export class CoreModule { }
```

### Auth Service

```
$ ng g service core/auth/auth
CREATE src/app/core/auth/auth.service.spec.ts (323 bytes)
CREATE src/app/core/auth/auth.service.ts (133 bytes)
```

OBS-1: Beginning with Angular 6.0, the preferred way to [create a singleton services](https://angular.io/guide/singleton-services#providing-a-singleton-service) is to specify on the service that it should be provided in the application root. This is done by setting `providedIn` to root on the service's @Injectable decorator. When you use 'root', your injectable will be registered as a singleton in the application, and you don’t need to add it to the providers of the root module.

OBS-2: we switch between `ng` and `ionic` cli, but both commonly have same behavior. When possible we prefer to use original, `ng`, instead of the "alias" `ionic`.

OBS-3: before running each cmd I recommend to add `--dry-run` to run a simulation.

`/core/auth/auth.service.ts`

```
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

const TOKEN_KEY = "X-Auth-Token";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState$: BehaviorSubject<boolean> = new BehaviorSubject(null);

  constructor(
    private storage: Storage,
    private platform: Platform
  ) { 
    this.platform.ready().then( _ => {
      this.checkToken();
    })
  }

  private checkToken() {
    this.storage.get(TOKEN_KEY).then( res => {
      if (res) {
        this.authState$.next(true);
      }
    })
  }

  public login() {
    this.storage.set(TOKEN_KEY, 'Bearer 123456').then( res => {
      this.authState$.next(true);
    })
  }

  public logout() {
    this.storage.remove(TOKEN_KEY).then( _ => {
      this.authState$.next(false);
    })
  }
  
  public getAuthStateObserver(): Observable<boolean> {

      return this.authState$.asObservable();
    }

  public isAuthenticated() {
    return this.authState$.value;
  }
}
```

OBS: the `authState$` dollar suffix is generally used to indicate something is an Observable source.

### Protecting route using Guard

#### Auth Guard

Angular’s router provides a feature called [Route Guards](https://angular.io/guide/router#milestone-5-route-guards) that prevent users from accessing areas they’re not allowed to access.

```
$ ng g guard core/auth/auth
CREATE src/app/core/auth/auth.guard.spec.ts (346 bytes)
CREATE src/app/core/auth/auth.guard.ts (414 bytes)
```

`/core/auth/auth.guard.ts`

```
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    console.log('Auth guard, state: ', state);
    console.log('Auth guard, next: ', next);
    
    return this.authService.isAuthenticated();
  }
}
```

## Pages: Home and Login

Create a new page
```
$ ng g page login
CREATE src/app/login/login.module.ts (538 bytes)
CREATE src/app/login/login.page.scss (0 bytes)
CREATE src/app/login/login.page.html (132 bytes)
CREATE src/app/login/login.page.spec.ts (684 bytes)
CREATE src/app/login/login.page.ts (252 bytes)
UPDATE src/app/app-routing.module.ts (528 bytes)
```


`pages/login/login.page.ts`
```
import { AuthService } from './../core/auth/auth.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  authState$: Observable<boolean>;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authState$ = this.authService.getAuthStateObserver();
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }
}
```

`pages/login/login.html`
```
<ion-header>
  <ion-toolbar>
    <ion-title>login</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content padding>
  <ion-button expand="full" (click)="login()" *ngIf="!(authState$ | async)">Login</ion-button>
  <ion-button expand="full" color="secondary" (click)="logout()" *ngIf="(authState$ | async)">Logout</ion-button>
  <ion-button expand="full" color="tertiary" href="/home" routerDirection="forward">Home</ion-button>
</ion-content>
```

## App-routing.module: add canActivate property

`app-routing.module.ts`
```
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@core/auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { 
    path: 'home', 
    canActivate: [AuthGuard],
    loadChildren: './home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './public/login/login.module#LoginPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes))],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

# Extra: redirect user to the landing page
As an extra feature we'll check now how to redirect user to the page they landed on before being forced to login.

`src/app/core/auth/auth.guard.ts`

`src/app/core/auth/auth.service.ts`

`src/app/login/login.page.ts`

For more details I recommend the great [post](https://gnomeontherun.com/2017/03/02/guards-and-login-redirects-in-angular/) from gnomeontherun.com. 

## Repository & Demo
Demo app is deployed [meu-starter.login-flow.ionic-v4](https://meumobi.github.io/meu-starter.login-flow.ionic-v4/www/)

All source code can be found on GitHub: [https://github.com/meumobi/meu-starter.login-flow.ionic-v4](https://github.com/meumobi/meu-starter.login-flow.ionic-v4)

## Furthemore

- [Building a Basic Ionic 4 Login Flow with Angular Router](https://www.youtube.com/watch?v=z3pDqnuyzZ4)
- [Jason Watemore: Angular 6 - User Registration and Login Example & Tutorial](http://jasonwatmore.com/post/2018/05/16/angular-6-user-registration-and-login-example-tutorial#alert-component-html)

[Angular.io Getting started]: https://angular.io/guide/quickstart
[Ionic 4 starters]: https://github.com/ionic-team/starters/tree/master/angular
[Firebase release notes]: https://firebase.google.com/support/release-notes/js
[AngularFire2 release notes]: https://github.com/angular/angularfire2/releases/
[Ionic release notes]: https://github.com/ionic-team/ionic/releases

[Node.js]: <https://nodejs.org/en/download/>
[Git]: <http://git-scm.com/download>
[Ionic]: <https://ionicframework.com/>
[Cordova]: <https://cordova.apache.org/>