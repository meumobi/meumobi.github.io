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

### 4. Link Redirect to App
Link will authenticate then redirect to the app. 

### 5. App Handle Link 
The app will be openened by an url. Based on url the app will authenticate the user and redirect him to home screen.
Now your User is authenticated on your APP :)

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

#### Observation
- If you are adding passwordless sign on a native app, its must be able to handle deeplinks.
- The email message text cannot be modified on firebase>auth>templates. 
If you want you must to handle emails and login flow by yourself (boring and for must cases unnecessary).
Although you can easily localizate the text, just set the language before *sendSignInLinkToEmail*
```js
this.afAuth.auth.languageCode = 'pt-br';
this.afAuth.auth.sendSignInLinkToEmail(email, actionCodeSettings);
```
If you wanna get the device language, just do it!
```js
this.afAuth.auth.useDeviceLanguage();
```

### 7. Implements 5. App Handle Link 
We got or redirection link but we are not realy authenticated.
We need to pass the url and the email previously set to firebase to finish the authentication.
Add *confirmSign* on AuthService
**src/app/auth.service.ts**
```js
...
export class AuthService {
  constructor(public afAuth: AngularFireAuth) {}
  ...
  public confirmSignIn(email: string, url: string): Promise<any> {
    return this.afAuth.auth.signInWithEmailLink(email, url);
  }
}
```
On welcome page we ask our user to confirm his email address.
**src/app/welcome/welcome.page.html**
```html
<ion-header>
  <ion-toolbar>
    <ion-title>welcome</ion-title>
  </ion-toolbar>
</ion-header>
<ion-content>
  <ion-item  color="primary">
    <p>Welcome to our app! For your safefy please re-type your email address and Confirm Your Sign-In</p>
  </ion-item>
  <ion-input type="text" placeholder="E-mail" [(ngModel)]="email"></ion-input>
  <ion-button expand="full" color="success" (click)="confirmSignIn()">Confirm Your Sign-in</ion-button>
</ion-content>
```
And use Angular Router to get the url to confirmSignIn.
Once is logged, we use the same router to redirect him to home page
**src/app/welcome/welcome.page.ts**
```js
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  email: string;
  url: string;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.url = this.router.url;
  }

  confirmSignIn() {
    this.authService.confirmSignIn(this.email, this.url)
    .then(
      () => this.router.navigate(['/home'])
    );
  }

}
```

#### Test
Access the link on inbox, inform the email address, confirm and now It's official!
We did it!

#### Observations 
- The flow to Sign-in or login is the same of the User's point of view.
- The User does not need to be previously added on Firebase>Auth>Users. It will be automatically created when performs *signInWithEmailLink*.

### 8. Security
Ok but... so far I can access Home page without login.
To solve this we will use AngularFireAuthGuard
Add on AppModule>Providers
**src/app/app.module.ts**
```js
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
...
@NgModule({
  providers: [
    ...
    AngularFireAuthGuard,
  ],
  ...
})
```

And on Home route only activate if User is authenticated and redirect unauthorized to Login Page
**src/app/app-routing.module.ts**
```js
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo} from '@angular/fire/auth-guard';

const redirectLogin = redirectUnauthorizedTo(['login']);

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)},
  { path: 'welcome', loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)},
  { path: 'home', ...canActivate(redirectLogin), loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```


## Furthermore ##

### Email Link
[Fireship/Angular Fire lessson](https://angularfirebase.com/lessons/using-passwordless-signup-with-firebase-on-the-web/)
[Firebase Auth - Email Link Docs](https://firebase.google.com/docs/auth/web/email-link-auth)

### Security
[Control Access with Custom Claims](https://firebase.google.com/docs/auth/admin/custom-claims#set_and_validate_custom_user_claims_via_the_admin_sdk)
[Firestore Security Rules Cookbook](https://fireship.io/snippets/firestore-rules-recipes/)