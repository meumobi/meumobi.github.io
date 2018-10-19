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

- Pages: Home and Login
  - The `blank` starter provides a default home page. We'll use as restricted access page and add a login page with public access.
	- If trying to access home page directly (deep-linking provided by lazy-loading), not-logged user is redirected to login page. 
	- By default new pages are lazy-loaded, means can be reached directly by typing path on address bar
- Core module: `Auth` Service and Guard
	- `AuthService` and `AuthGuard` are contained on `CoreModule`, that will be used to instantiate app.
	- Auth Token persistence is assumed by `@ionic/storage`
- App-routing.module: add canActivate property
	- 

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
```

## Pages: Home and Login

`pages/login/login.ts`
```
import { AuthService } from '@core/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  login() {
    this.authService.login()
  }

  logout() {
    this.authService.logout()
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
  <ion-button expand="full" (click)="login()">Login</ion-button>
  <ion-button expand="full" color="secondary" (click)="logout()">Logout</ion-button>
  <ion-button expand="full" color="tertiary" href="/register" routerDirection="forward">Register</ion-button>
  <ion-button expand="full" color="tertiary" href="/home" routerDirection="forward">Home</ion-button>
</ion-content>
```

## Core module

### `Auth` Service

```
$ npm i --save @ionic/storage
$ ng g module core --spec=false
$ ng g service core/auth/auth
```

`/core/auth/auth.service.ts`

```
import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';

const TOKEN_KEY = "X-Auth-Token";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(
    private storage: Storage,
    private platform: Platform
  ) { 
    this.platform.ready().then( _ => {
      this.checkToken();
    })
  }

  login() {
    this.storage.set(TOKEN_KEY, 'Bearer 123456').then( res => {
      this.authState.next(true);
    })
  }

  logout() {
    this.storage.remove(TOKEN_KEY).then( _ => {
      this.authState.next(false);
    })
  }

  isAuthenticated() {
    return this.authState.value;
  }

  checkToken() {
    this.storage.get(TOKEN_KEY).then( res => {
      if (res) {
        this.authState.next(true);
      }
    })
  }
}
```

### Protecting route using Guard

#### `Auth` Guard

```
$ ng g guard core/auth/auth
```

OBS: Beginning with Angular 6.0, the preferred way to [create a singleton services](https://angular.io/guide/singleton-services#providing-a-singleton-service) is to specify on the service that it should be provided in the application root. This is done by setting providedIn to root on the service's @Injectable decorator. When you use 'root', your injectable will be registered as a singleton in the application, and you don’t need to add it to the providers of the root module.

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
Demo app is deployed [meu-starter.login-flow.ionic-v4](https://meumobi.github.io/meu-starter.login-flow.ionic-v4/www/)

All source code can be found on GitHub: https://github.com/meumobi/meu-starter.login-flow.ionic-v4

## Furthemore



[Angular.io Getting started]: https://angular.io/guide/quickstart
[Ionic 4 starters]: https://github.com/ionic-team/starters/tree/master/angular
[Firebase release notes]: https://firebase.google.com/support/release-notes/js
[AngularFire2 release notes]: https://github.com/angular/angularfire2/releases/
[Ionic release notes]: https://github.com/ionic-team/ionic/releases

[Node.js]: <https://nodejs.org/en/download/>
[Git]: <http://git-scm.com/download>
[Ionic]: <https://ionicframework.com/>
[Cordova]: <https://cordova.apache.org/>