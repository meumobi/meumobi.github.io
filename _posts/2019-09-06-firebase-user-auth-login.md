---
layout: post
title: Firebase Login by link on Ionic/Angular
categories: [How To]
tags: [tutorial,angular,onesignal,ionic,deeplink]
author:
  name: Daniel Antonio Conte
  email: danconte72@gmail.com
  github: danconte72
  twitter: danielconte
  bio: Life, Universe, Everything
  email_md5: 8200df29874231d4d8c2c7beae170b31
---
![Firebase Logo]({{ site.BASE_PATH}}/assets/media/firebase/firebase-logo.png)

Securately manage our passwords demands careful attention. So to avoid this, a lot of services allow us to access their resources sending a unique link to our email. Firebase released a feature for it. 

## Passwordless Sign-in Flow
### 1. User Request Sign-in
A User who whants use your service should inform an **email address** and click on **Sign-In** button.
### 2. App Send Link
The app will validate the address and sent an email to it.
It will notify the User to check him Inbox.
> A link to access the app was send to **{{user.email}}**. Check your email on this device.  
> If you not get the email, request to **Resend**, and make sure **{{server.email}}** is not on Spam.

#### How to on firebase
Should pass to Firebase>Auth user's email and the url to your app.
```js
const actionCodeSettings = {
  url: 'https://my-amazing.web.app/welcome', 
  handleCodeInApp: true //this is mandatory to be true
};
firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings);
```
### 3. User Open Link 
On User inbox it will receive a message with a link. Him will click (I hope so).
> Hello, We received a request to sign in to **{{project.namel}}** using this email address. If you want to sign in with your **{{user.email}}** account, click this link:  
>**Sign in to {{project.namel}}**  
>If you did not request this link, you can safely ignore this email.
#### How to on firebase
The email message text cannot be modified on firebase>auth>templates. 
If you want you must to handle emails and login flow by yourself (boring and for must cases unnecessary).
Although you can easily localizate the text, just set the language before *sendSignInLinkToEmail*
```js
firebase.auth().languageCode = 'pt-br';
firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings);
```
If you wanna get the device language, just do it!
```js
firebase.auth().useDeviceLanguage();
```
### 4. Link Redirect to App
Link will authenticate then redirect to the app. Passing some auth paramaters on the url.
### 5. App Handle Link 
The app will be openened by an url. Based on url the app will authenticate the user and redirect him to home screen.
> If you are adding passwordless sign on a native app, its must be able to handle deeplinks.

### Observations 
- The flow to Sign-in or login is the same of the User's point of view.

## Goal
Create an web app with two pages, login and home. 
Home is only accessible after login.
User could login by a link sent to his email through Firebase Auth

## Ingredients
- AngularFire
- Firebase Project

## Steps
1. Create Ionic/Angular App
2. Establish Auth Service 
3. Request a link by email
4. Handle link on auth

## Create Ionic/Angular App && Establish Auth Service 
We've already done [here](http://meumobi.github.io/how%20to/2019/07/03/login-flow-with-custom-auth.html)
so just
```bash
$ git clone https://github.com/meumobi/meu-starter.firestore-custom-auth.angular meu-auth
$ cd meu-auth
$ npm i
$ ionic serve
```
But if want do by yourself
```bash
$ npm install ionic typescript -g
$ ionic start login-flow blank --type=angular
$ cd login-flow
```
Then follow the steps on [Ionic Angular Project](http://meumobi.github.io/how%20to/2019/07/03/login-flow-with-custom-auth.html#ionic-angular-project)

## Request a email link
### Configuration
On firebase console of your project, go to **Authentication>Sign-in method**.
Enable **Email/Password** and **Email link(passwordless sign-in)** and save.
![Firebase Auth]({{ site.BASE_PATH}}/assets/media/firebase/enable-email-link.png)

### Show me the code

On login page we will get the email address and request a login to AuthService.  
**src/app/login/login.page.html**
```html
<ion-header>
  <ion-toolbar>
    <ion-title>login</ion-title>
  </ion-toolbar>
</ion-header>
<ion-content padding>
  <ion-card>
      <ion-card-header>
        <ion-card-title>User</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ion-input type="text" placeholder="User E-mail" [(ngModel)]="email"></ion-input>
        <ion-button expand="full" (click)="loginEmail()">Login by Email</ion-button>
        <ion-button expand="full" color="secondary" (click)="logout()" *ngIf="(authState$ | async)">Logout</ion-button>
      </ion-card-content>
    </ion-card>
</ion-content>
```
**src/app/login/login.page.ts**
```js
import { AuthService } from './../core/auth/auth.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  authState$: Observable<any>;
  email: string;
  constructor(
    private authService: AuthService,
  ) {}
  ngOnInit() {
    this.authState$ = this.authService.getAuthStateObserver();
  }  

  loginEmail() {
    this.authService.loginEmail(this.email).then(
      () => {
        console.log('Email sent');
        // Don't forget to notify your user ;)
      }
    );
  }

  logout() {
    this.authService.logout();
  }
}
```
**src/app/core/auth/auth.service.ts**
```ts
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public afAuth: AngularFireAuth) {}
  public loginEmail(email: string) {
    const actionCodeSettings = {
      url: 'http://localhost:8100/login', //after perform login the url to redirect 
      handleCodeInApp: true //this is mandatory to be true
    };
    //Request do Firebase Auth to send a Link for an email
    //The email does not to be previously added on Auth Users
    return this.afAuth.auth.sendSignInLinkToEmail(email, actionCodeSettings);
  }

  public logout() {
    //logauth
    this.afAuth.auth.signOut();
  }

  public getAuthStateObserver() {
    return this.afAuth.authState;
  }
}
```

### Email got!
![Firebase Auth]({{ site.BASE_PATH}}/assets/media/firebase/email-link.png)


If you access the link, it will perform a login and redirect to URL you've set before (http://localhost:8100/login).
But with some parameters
**http://localhost:8100/login?apiKey=xxxxxx&oobCode=yyyyyyy&mode=signIn&lang=en**

Now we need to handle it on our app.

## Handle link on auth
In this demo we redirect to same */login* page/route, but you can set another route, like */welcome*.
This url is necessary to firebase sdk authenticate the user.  
So on Login page we will get the URL On Init using angular router and passing it to authService
**src/app/login/login.page.ts**
```js
import { Router } from '@angular/router';
...
  constructor(
    private router: Router,
    ...
  ) {}
  ngOnInit() {
    ...
    const url = this.router.url;
    this.authService.confirmLogin(url);
  }
```
On AuthService you need to pass the url and the email associated to it in order to authenticate.
So you can ask the email again for users. Annoying, but it is necessary if they opened the link on a different device.
For this sample we will assume they will use the same device/browser and manage email address on local storage.
Save it when request a link, recover when the link open the app and delete after login by email finish.
**src/app/core/auth/auth.service.ts**
```js
  public loginEmail(email: string) {
    localStorage.setItem('email', email);
    ...
  }    
  public confirmLogin(url: string) {
    const email = localStorage.getItem('email');
    localStorage.removeItem('email');
    return this.afAuth.auth.signInWithEmailLink(email, url);
  }
```

## Test
1. Open the app 
2. Put a valid email e and request link
3. Open inbox, click on the link
4. User Authenticated!

## Security 
Since angularfire delivers an AuthGuard. We can use it to handle access to routes.
**src/app/app-routing.module.ts**
```ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'home',
    canActivate: [AngularFireAuthGuard],
    loadChildren: './home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```
AngularFireAuthGuard it will only return true if a user is logged in.

## Concerns! PAY ATTENTION!
- If you follow this example, any person with a valid email can access your app. 
- Once a user SignIn it will automatically be added on Firebase Auth Users list. 
  - You can manipulate User claims only after creation.
- AngularFireAuthGuard have resources to [customize its behavior](https://github.com/angular/angularfire2/blob/master/docs/auth/router-guards.md#customizing-the-behavior-of-angularfireauthguard).

To make sure that only some emails can access your app you need to do this by yourself.
We can suggest some solutions.
- Only allow request logins if the email have been set on a firestore collection.
- Create the user using Admin SDK, and set a custom claim ({isValid: true} i.e.) and only allow access if this claim is set.
- After firt login and Admin of your app must to confirm the access to it and then set a claim for it.
- Combine it in order to improve your security.

## Furthermore ##
### Email Link
[Fireship/Angular Fire lessson](https://angularfirebase.com/lessons/using-passwordless-signup-with-firebase-on-the-web/)
[Firebase Auth - Email Link Docs](https://firebase.google.com/docs/auth/web/email-link-auth)
### Security
[Control Access with Custom Claims](https://firebase.google.com/docs/auth/admin/custom-claims#set_and_validate_custom_user_claims_via_the_admin_sdk)
[Firestore Security Rules Cookbook](https://fireship.io/snippets/firestore-rules-recipes/)