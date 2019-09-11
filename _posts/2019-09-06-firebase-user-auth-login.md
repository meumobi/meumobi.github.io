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
> A link to access the app was send to **user.email**. Check your email on this device.  
> If you not get the email, request to **Resend**, and make sure **server.email** is not on Spam.
### 3. User Open Link 
On User inbox it will receive a message with a link. Him will click (I hope so).
> Hello, We received a request to sign in to **project.name** using this email address. If you want to sign in with your **user.email** account, click this link:  
>**Sign in to project.name**  
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
Link will authenticate then redirect to the app. 
#### How to on firebase
If you check link on email contains apiKey, mode, oobCode and continueUrl as parameters.
It authenticate this on firebase servers then redirect to **continueUrl** (set on actionCodeSettings.url). Adding some URL parameters.
>https://my-amazing.web.app/welcome&apiKey=xxxxx&oobCode=yyyyy&mode=signIn&lang=pt-BR  

### 5. App Handle Link 
The app will be openened by an url. Based on url the app will authenticate the user and redirect him to home screen.
> If you are adding passwordless sign on a native app, its must be able to handle deeplinks.

#### How to on firebase
To finally authenticate the user on your app you need to call *signInWithEmailLink*. Passing the **user.email** and the entire URL which opened the app.
```js
var email = user.email;
var url = `https://my-amazing.web.app/welcome&apiKey=xxxxx&oobCode=yyyyy&mode=signIn&lang=pt-BR`;
firebase.auth().signInWithEmailLink(email, url);
```
Now your User is logged on your APP :)

### Observations 
- The flow to Sign-in or login is the same of the User's point of view.
- The User does not need to be previously added on Firebase>Auth>Users. It will be automatically created when performs *signInWithEmailLink*.

## Hands On
On this sample we will create and ionic-angular project who implements this flow.

### 1. Create Project
Create Project 
```bash
$ ionic start email-link blank
```
Test
```bash
$ cd email-link
$ ionic serve
```
You can access **http://localhost:8100/home**
### 2. Create Pages
The app will have 3 pages.
- Home - only authenticated users can access. 
- Login - where **1. User Request Sign-in**
- Welcome - where **5. App Handle Link**

Home is already created so lets create Login and Welcome.
```bash
$ ionic g page login
$ ionic g page welcome
```
Testing with `$ ionic serve` you can navigate between the pages
- **http://localhost:8100/home**
- **http://localhost:8100/login**
- **http://localhost:8100/welcome**

### 3. Connect to Firebase
To access FirebaseAuth functions the app will use AngularFire
```bash
$ npm install @angular/fire firebase --save
```
Copy your firebase Console config to  
**src/environments/environment.ts**
```js
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
And Import it on App Module
**src/app/app.module.ts**
```js
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireAuth } from '@angular/fire/auth';
...

@NgModule({
  imports: [
    ...
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [
    ...
    AngularFireAuth,
  ],
  ...
})
export class AppModule {}
```
### 4. Config Email Link
Once you are on Firebase Console
Go to **Authentication>Sign-in method**.
Enable **Email/Password** and **Email link(passwordless sign-in)** and save.
![Firebase Auth]({{ site.BASE_PATH}}/assets/media/firebase/enable-email-link.png)

### 5. Create Auth Service
This service will perform all firebase auth interactions.
```bash
$ ionic g service auth
```
Then to use AngularFireAuth, import it and declare an instance (afAuth) on constructor
**src/app/auth.service.ts**
```js
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public afAuth: AngularFireAuth) {}
}
```
### 6. Implements - 1.User Request Sign-in and 2. App Send Link
Add *signIn* on AuthService
**src/app/auth.service.ts**
```js
...
export class AuthService {
  constructor(public afAuth: AngularFireAuth) {}
  public signIn(email: string): Promise<any> {
    const actionCodeSettings = {
      url: `http://localhost:8100/welcome`,
      handleCodeInApp: true
    };
    return this.afAuth.auth.sendSignInLinkToEmail(email, actionCodeSettings);
  }
}
```
On Login Page Add a field do get the user email and a button to Sign-In.
Once *Sign-In* email was send, *Resend* and notification were showed.
**src/app/login/login.page.html**
```html
<ion-header>
  <ion-toolbar>
    <ion-title>login</ion-title>
  </ion-toolbar>
</ion-header>
<ion-content>
  <ion-input type="text" placeholder="E-mail" [(ngModel)]="email"></ion-input>
  <ion-button *ngIf="!emailSent" expand="full" color="success" (click)="signIn()">Sign-in</ion-button>
  <ion-item *ngIf="emailSent" color="success">
        <p>A link to access the app was send to <b>{{email}}</b>. Check your email on this device. If you not get the email, request to <b>Resend</b>, and make sure **server.email** is not on Spam.</p>
  </ion-item>
  <ion-button *ngIf="emailSent" expand="full" (click)="signIn()">Resend</ion-button>
</ion-content>
```
Login page signIn calls AuthService>signIn passing the email
**src/app/login/login.page.ts**
```js
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string;
  emailSent = false;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  signIn() {
    this.authService.signIn(this.email)
    .then(
      () => this.emailSent = true
    );
  }
}
```
#### Test
Inform a valid email address and click on Sign-In. You should receive an email with a Link as we see on **3. User Open Link**
Once clicked on it, you will redirected to
**http://localhost:8100/welcome?apiKey=yyyyyyyy&mode=signIn**
It's alive!

## Furthermore ##
### Email Link
[Fireship/Angular Fire lessson](https://angularfirebase.com/lessons/using-passwordless-signup-with-firebase-on-the-web/)
[Firebase Auth - Email Link Docs](https://firebase.google.com/docs/auth/web/email-link-auth)
### Security
[Control Access with Custom Claims](https://firebase.google.com/docs/auth/admin/custom-claims#set_and_validate_custom_user_claims_via_the_admin_sdk)
[Firestore Security Rules Cookbook](https://fireship.io/snippets/firestore-rules-recipes/)