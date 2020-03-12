---
layout: post
title: Firebase Phone Authentication with Angular
categories: []
tags: [Firebase, Ionic, Analytics, Authentication, Phone, Angular]
author:
  name: Victor Dias
  email: victor.dias@meumobi.com
  github: elbidone
  twitter: meumobi
  bio: Sharing mobile Experiences
  email_md5: 1cd012be2382e755aa763c66acc7cfa6
---

The aim of this tutorial is to show how to acheive user authentication by sending an SMS message to the user's phone. The user signs in using a one-time code contained in the SMS message.

We'll do it for a [Ionic], [Angular] web app, through [Firebase Authentication], and explain later how to add a Factory provider to handle web and native apps with same source code.
to validate phone numbers we'll use [ngx-intl-tel-input](https://www.npmjs.com/package/ngx-intl-tel-input), 

## Repository & demo

All source code can be found on GitHub: [https://github.com/meumobi/mmb-demos.firebase-phone-authentication-angular](https://github.com/meumobi/mmb-demos.firebase-phone-authentication-angular)

## What you'll need
### Prerequisites
#### Dev tools
We need to have [Node.js] and [Git] installed in order to install both [Ionic] and [Cordova].

```sh
$ npm install cordova @ionic/cli typescript -g
...
$ npm ls -g cordova @ionic/cli npm typescript --depth 0
/Users/vdias/.nvm/versions/node/v12.11.0/lib
├── @ionic/cli@6.2.0 
├── cordova@9.0.0 
├── npm@6.13.6 
├── phonegap@9.0.0
└── typescript@3.8.3
```

#### Firebase account
If you don’t have yet, the first thing you’ll need to do is to create a Firebase account and then [create a Firebase project](https://firebase.google.com/docs/web/setup#create-firebase-project). Both are free.

## What you'll build

To explore Analytics capabilities we'll use the conference starter ("A kitchen-sink application that shows off all Ionic has to offer"). It contains out-of-the-box a lot of useful pages to illustrate following features:

- Login form to type and validate phone number.
- Validate verification code

There's no difference between iOS and Android in terms of implementation, then we'll focus on this tutorial on Android, because it's easier to build and test. But if you use these instructions on iOS App should works fine too.

## Implementation path

1. Create a Ionic/Angular project
2. Add Firebase SDK and initialize it
3. Create SignInService
4. Add login page

For native
2. Install cordova-plugin-firebasex
3. Connect apps to Firebase
  - download `google-services.json` and `GoogleService-info.plist`

## Create a project

```
$ ionic start mmb-demos.firebase-phone-authentication-angular blank --type=angular --cordova
$ cd ./mmb-demos.firebase-phone-authentication-angular
```

Then open the `config.xml` and update the widget@id with your own. We'll use this id later to register the app on firebase.

## Add Firebase to your project

### Create a Firebase project
[Create a Firebase project](https://firebase.google.com/docs/web/setup#create-firebase-project)

### Register your app with Firebase
[Register your app with Firebase](https://firebase.google.com/docs/web/setup#register-app)

### Add Firebase SDKs and initialize Firebase

The official [AngularFire](https://github.com/angular/angularfire/blob/master/docs/install-and-setup.md) library has many modules to help us interact with the different Firebase features, it includes FCM ([Firebase Cloud Messaging]) through [AngularFireMessaging].


```bash
$ npm install @angular/fire firebase --save
+ @angular/fire@5.4.2
+ firebase@7.10.0
```

Copy your firebase config (get from firebase console) to  
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
    appId: '<your-app-id>',
    measurementId: '<your-measurement-id>'
  }
};
```

And Import it on App Module with required AngularFire modules.
**src/app/app.module.ts**
```js
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
...

@NgModule({
  imports: [
    ...
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule 
  ],
  ...
})
export class AppModule {}
```

## Sign-in service for web
https://firebase.google.com/docs/auth/web/phone-auth
[AngularFire](https://www.npmjs.com/package/@angular/fire) provides [AngularFireAuth](https://github.com/angular/angularfire/blob/master/docs/auth/getting-started.md) service to dynamically import the firebase/auth library and provide a promisified version of the [Firebase Auth SDK (firebase.auth.Auth)](https://firebase.google.com/docs/reference/js/firebase.auth.Auth).

In our component we can then dependency inject AngularFireAuth and make calls against the SDK:

vdias$ ng g service core/auth/signin-web --skip-tests
CREATE src/app/core/auth/signin-web.service.ts (138 bytes)


```ts
import { AngularFireAuth } from '@angular/fire/auth';

constructor(afAuth: AngularFireAuth) {
  
}
```

## Sign-in page

```bash
$ ionic g page login
```

### Install ngx-intl-tel-input
[ngx-intl-tel-input](https://www.npmjs.com/package/ngx-intl-tel-input), an Angular package for entering and validating international telephone numbers.

$ npm install ngx-intl-tel-input --save

### Install dependencies
```bash
$ npm install intl-tel-input@14.1.0 google-libphonenumber ngx-intl-tel-input --save
+ intl-tel-input@14.1.0
+ google-libphonenumber@3.2.7
+ ngx-intl-tel-input@2.3.1
$ $ npm i typescript@3.5 --save
+ typescript@3.5.3
$ ng add ngx-bootstrap --component dropdowns
$ npm i @angular/animations@8
+ @angular/animations@8.2.14
```

In order to make it working I need to add some commands not referenced on official docs:

- First, I upgrade typescript to v3.5.x to prevent error "Cannot read property 'kind' of undefined" when I add `ngx-bootstrap`.
- Then I add `@angular/animations` to prevent `Cannot find module '@angular/animations'` errors on compilation.

https://valor-software.com/ngx-bootstrap/#/dropdowns



npm install ngx-intl-tel-input --save
### Add Dependency Style

### Import modules

```ts
...
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    BsDropdownModule.forRoot(),
    NgxIntlTelInputModule,
  ],
...
```


# Furthermore
- [Javebratt: Firebase Phone Number Authentication](https://javebratt.com/firebase-phone-authentication/)
- [How to use phone authentication in angular and ionic?](https://medium.com/@sunnysyed007/how-to-use-phone-authentication-in-angular-and-ionic-b7584eaa3236)
- [How to perform fire-base phone authentication using web SDK?](https://stackoverflow.com/a/56590317/4982169)
- [github:issue: SMS Number verification using AngularFire2 instance. #1466](https://github.com/angular/angularfire/issues/1466)
- [fireship.io: Firebase Phone Authentication](https://fireship.io/lessons/firebase-phone-authentication-with-angular-4-tutorial/)
- [stackoverlfow: How to implement Firebase phone authentication with Ionic 4?](https://stackoverflow.com/a/59955876/4982169)
- [GitHub: Phone number authentication using angularfire](https://github.com/angular/angularfire/issues/1466#issuecomment-375044361)
- [stackoverflow: Perform phone authentication with signInWithCredential](https://stackoverflow.com/a/56590317/4982169)
- [How to use phone authentication in angular and ionic?](https://medium.com/@sunnysyed007/how-to-use-phone-authentication-in-angular-and-ionic-b7584eaa3236)

[Node.js]: <https://nodejs.org/en/download/>
[Git]: <http://git-scm.com/download>
[Ionic]: <https://ionicframework.com/>
[Cordova]: <https://cordova.apache.org/>
[AngularFirestore]: <https://github.com/angular/angularfire#cloud-firestore>
[Angular]: <https://angular.io/>
[Firebase]: <https://firebase.google.com/>
[Firestore]: <https://firebase.google.com/products/firestore/>
[Firebase Authentication]: <https://firebase.google.com/docs/auth>
[Firebase Analytics]: <https://firebase.google.com/docs/analytics>
[Firebase Cloud Messaging]: <https://firebase.google.com/docs/cloud-messaging>
[AngularFireMessaging]: <https://github.com/angular/angularfire/blob/master/docs/messaging/messaging.md>