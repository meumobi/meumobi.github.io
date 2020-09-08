---
layout: post
title: Authentication by URL using Firebase Auth
categories: [How To]
tags: [tutorial,angular,firebase,auth,cloud-functions]
redirect_from:
- /how to/2019/07/03/login-flow-with-custom-auth
author:
  name: Daniel Antonio Conte
  email: danconte72@gmail.com
  github: danconte72
  twitter: danielconte
  bio: Life, Universe, Everything
  email_md5: 8200df29874231d4d8c2c7beae170b31
---

Sometimes in your project you want to allow your users to log-in through URL. So it can access private features only click in one link (mostly sent by email).
What we are doing is use Firebase Custom Auth to do this.

![Cloud Functions for Firebase]({{ site.BASE_PATH}}/assets/media/firebase/firebase-cloud-functions-logo.png)

## Steps
- Create a HTTP Firebase CloudFunction (CF) who receives a user ID, generate a token using the Firebase Admin SDK and returns it.
- Create a Page to call CF and Generate the Token.
- Create a Page only accessible if a valid Token is passed on the URL.

## Init
Create the project
```bash
$ npm install ionic typescript -g
$ ionic start login-flow blank --type=angular
$ cd login-flow
```

## Cloud Function
### Requirements
1. Create a project on [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Install firebase tools
`$ npm install -g firebase-tools`
3. Login 
`$ firebase login`
4. Init the functions and select *TypeScript*
`$ firebase init functions`
5. Enable IAM API
[How To](https://firebase.google.com/docs/auth/admin/create-custom-tokens#iam_api_not_enabled)
6. Set required permissions to Service Account
[How To](https://firebase.google.com/docs/auth/admin/create-custom-tokens#service_account_does_not_have_required_permissions)

### Code
Create
**functions/src/auth.ts**
```ts
export class AuthService {
  admin;
  constructor(admin) {
    this.admin = admin;
  }
  public createToken(uid: string) {
    return this.admin.auth().createCustomToken(uid);
  }
}

```
- [Firebase Admin - Custom Tokens Reference](https://firebase.google.com/docs/auth/admin/create-custom-tokens)

Edit
**functions/src/index.ts**
```ts
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { AuthService } from './auth';
admin.initializeApp();
export const createToken = functions.https.onRequest((request, response) => {
  response.set('Access-Control-Allow-Origin', '*');
  const authService: AuthService = new AuthService(admin);
  authService.createToken(request.query['uid'])
  .then(
    data => {
      response.send(data);
    }
  ).catch(function(error) {
    console.log('Error creating custom token:', error);
  });
});

```
- [Enabling CORS in Cloud Functions for Firebase](https://stackoverflow.com/a/51922520)

### Deploy
`$ firebase deploy --only functions`  
You will receive the URL to the CF

### Test
Just call
**[URL]?uid=[anyuid]**  
I.E. [https://us-central1-firestore-custom-auth-angular.cloudfunctions.net/createToken?uid=123](https://us-central1-firestore-custom-auth-angular.cloudfunctions.net/createToken?uid=123)

### Troubleshooting 
You should set the engine on 
**functions/package.json**
```js
{
  ...
  "engines": {
    "node": "8"
  },
  ...
}

```
I've some errors on deploy, and so far the workaround for me is remove project node_modules before functions, I didn't figure out why.
`$ rm -rf node_modules`  
Deploy CF and after reinstall the modules
`$ npm i`

## Ionic Angular Project
### Requirements
- Install [AngularFire]( https://github.com/angular/angularfire2)
`$ npm install firebase @angular/fire --save`
- Copy [Firebase Config](https://github.com/angular/angularfire2/blob/master/docs/install-and-setup.md#4-add-firebase-config-to-environments-variable) of [Firebase Console]([https://console.firebase.google.com/]). On project overview page, click Add Firebase to your web app.
### Create FILES
```bash
$ ng g module core
$ ng g service core/auth/auth
$ ng g guard core/auth/auth
$ ng g page login
``` 

### CODE
The structure is based on [Implementing Login flow with Ionic 4](http://meumobi.github.io/ionic/2018/10/19/login-flow-ionic4.html)

UPDATE on **/src/environments/environment.ts**
```ts
export const environment = {
  production: false,
  firebase: {
    apiKey: '<your-key>',
    authDomain: '<your-project-authdomain>',
    databaseURL: '<your-database-URL>',
    projectId: '<your-project-id>',
    storageBucket: '<your-storage-bucket>',
    messagingSenderId: '<your-messaging-sender-id>'
  }
};
```
ADD ON **src/app/app.module.ts**
```ts
...
import { CoreModule } from './core/core.module';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
...
@NgModule({
  ...
  imports: [
    ...
    AngularFireModule.initializeApp(environment.firebase),
    IonicModule.forRoot(),
    AngularFireAuthModule,
    ...
    CoreModule,
  ],
  ...
})
export class AppModule {}

```

### Login
- Get CF URL and set on Base URL, Set any UID and Generate Token.
- Generate Token calls the CF using HTTPClient passing the UID and set Token.
- To test if is valid Token just click Login with Token, it uses AuthService. 
- Login By URL concatenetes the token with the HOME url. And open it in another tab.

**src/app/login/login.page.html**  

```html
<ion-header>
  <ion-toolbar>
    <ion-title>login</ion-title>
  </ion-toolbar>
</ion-header>
<ion-content padding>
  <ion-input type="text" placeholder="Base URL" [(ngModel)]="baseUrl"></ion-input>
  <ion-input type="text" placeholder="User Id" [(ngModel)]="uid"></ion-input>
  <ion-button expand="full" (click)="generateToken()">Generate Token</ion-button>
  <ion-input type="text" placeholder="Token" [(ngModel)]="token"></ion-input>
  <ion-button expand="full" (click)="login()" *ngIf="!(authState$ | async)">Login with Token</ion-button>
  <ion-button expand="full" color="secondary" (click)="logout()" *ngIf="(authState$ | async)">Logout</ion-button>
  <a target="_blank" rel="noopener" href="/home/{{token}}">Login By URL</a>
</ion-content>
```
**src/app/login/login.page.ts**
```ts
import { AuthService } from './../core/auth/auth.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  authState$: Observable<any>;
  token: string;
  uid: string;
  baseUrl;
  constructor(
    private authService: AuthService,
    private httpClient: HttpClient
  ) { }
  ngOnInit() {
    this.authState$ = this.authService.getAuthStateObserver();
  }
  generateToken() {
    const url = `${this.baseUrl}?uid=${this.uid}`;
    this.httpClient.get(url, {responseType: 'text'}).toPromise().then(
      data => {
        this.token = data;
      }
    );
  }
  login() {
   this.authService.login(this.token);
  }
  logout() {
    this.authService.logout();
  }
}
```

### Auth Service
Uses [AugularFireAuth](https://github.com/angular/angularfire2/blob/master/docs/auth/getting-started.md), calls [signInWithCustomToken](https://firebase.google.com/docs/auth/web/custom-auth#authenticate-with-firebase) and return true if a valid token.
**src/app/core/auth/auth.service.ts**
```ts
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public afAuth: AngularFireAuth) {}
  public login(token: string) {
    return this.afAuth.auth.signInWithCustomToken(token).then(
      data => {
        return true;
      }
    );
  }
  public logout() {
    this.afAuth.auth.signOut();
  }
  public getAuthStateObserver() {
    return this.afAuth.authState;
  }
}

```
### Auth Guard
Gets the token [param of route](https://angular.io/api/router/ActivatedRouteSnapshot#properties), calls AuthService, and if true, allows the access.
**src/app/core/auth/auth.guard.ts**
```ts
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService
  ) {}

  async canActivate(route: ActivatedRouteSnapshot) {
    const token = route.params.token;
    return this.authService.login(token);
  }

}
```

### Routes
Home route demands a token param and it only canActivate if AuthGuard (who get the token from route) allows. 
**src/app/app-routing.module.ts**
```ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'home/:token',
    canActivate: [AuthGuard],
    loadChildren: './home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```
So Home page is only accessible if a valid Token is passed on the URL.

### :)
- You can a Demo of this project [here](https://firestore-custom-auth-angular.firebaseapp.com/login)
- The code is shared [here](https://github.com/meumobi/meu-starter.firestore-custom-auth.angular)


