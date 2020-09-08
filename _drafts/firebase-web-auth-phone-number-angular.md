---
layout: post
title: Firebase Phone Authentication with Angular
categories: [Firebase]
tags: [Firebase, Ionic, Analytics, Authentication, Phone, Angular]
author:
  name: Victor Dias
  email: victor.dias@meumobi.com
  github: elbidone
  twitter: meumobi
  bio: Sharing mobile Experiences
  email_md5: 1cd012be2382e755aa763c66acc7cfa6
---

The aim of this tutorial is to show how to acheive user authentication by phone number, with [Firebase Authentication] and [Angular]. The user signs in using a one-time code contained in the SMS message.

We'll do it for **[web](https://firebase.google.com/docs/auth/web/phone-auth) and native apps** with [Ionic]. But, if you are only interested by web or native, no worry you can pick-up the service you want. We use [Factory Provider](https://angular.io/guide/dependency-injection-providers#factory-providers) to inject the right verifyNumber service according to App platform (cordova or not). We'll first develop the web service and later add the native one.
To integrate [Firebase Authentication], we use [AngularFire] for web and [cordova-plugin-firebasex](https://www.npmjs.com/package/cordova-plugin-firebasex) for native. 

As extra, we'll show how to **easily handle international phone numbers** with [ngx-intl-tel-input](https://www.npmjs.com/package/ngx-intl-tel-input).

Then, let's go!

## Repository & demo

All source code can be found on GitHub: [https://github.com/meumobi/mmb-demos.firebase-phone-authentication-angular](https://github.com/meumobi/mmb-demos.firebase-phone-authentication-angular)

## What you'll need
### Dev tools
We need to have [Node.js] and [Git] installed in order to install both [Ionic] and [Cordova].

```sh
$ npm install @ionic/cli cordova typescript @angular/cli -g
...
$ npm ls -g npm @ionic/cli cordova typescript @angular/cli --depth 0
/Users/vdias/.nvm/versions/node/v12.11.0/lib
├── @ionic/cli@6.2.0 
├── cordova@9.0.0 
├── npm@6.13.6 
├── phonegap@9.0.0
└── typescript@3.8.3
```

### Firebase account
If you don’t have yet, the first thing you’ll need to do is to create a Firebase account and then [create a Firebase project](https://firebase.google.com/docs/web/setup#create-firebase-project). Both are free.

## What you'll build

- Login form to type and **validate phone number** with [ngx-intl-tel-input](https://www.npmjs.com/package/ngx-intl-tel-input).
- **VerifyPhoneNumber Factory Provider** to handle web and native Apps
- **VerifyPhoneNumber-web** service with `@angular/fire/auth` to verify phone number ownership by sending a sms with verification code and confirm code.
- **VerifyPhoneNumber-native** service with `firebase-x`

## Implementation path

### Web version

1. Create a Ionic/Angular project
2. Connect web app to Firebase
3. Add login page
4. Create auth.service.provider and auth-web.service

### Native version

The native version follows steps of web, that means you should have complete previous tasks (except `Connect web app to Firebase` and `auth-web.service`) to proceed. 

1. Connect Native apps to Firebase
- download `google-services.json` and `GoogleService-info.plist`
1. Configure your app SHA-1 hash in the android app configuration in the Firebase console.
1. Install cordova-plugin-firebasex
1. Add auth-native.service

## Create a project

```
$ ionic start mmb-demos.firebase-phone-authentication-angular blank --type=angular --cordova
$ cd ./mmb-demos.firebase-phone-authentication-angular
```

Then open the `config.xml` and update the widget@id with your own. We'll use this id later to register the app on firebase.

## Connect web app to Firebase

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

## Add login page

```bash
$ ionic g page login
```

### Install ngx-intl-tel-input
[ngx-intl-tel-input](https://www.npmjs.com/package/ngx-intl-tel-input), an Angular package for entering and validating international telephone numbers.

#### Install dependencies
I've tried following [install instructions](https://www.npmjs.com/package/ngx-intl-tel-input#installation) but raise 2 errors, I fixed as described below:

- First, to prevent error "Cannot read property 'kind' of undefined" when I add `ngx-bootstrap`. I followed another method suggested by [official install instructions of ngx-bootstrap](https://valor-software.com/ngx-bootstrap/#/documentation#installation-instructions), and use npm command.
- Then I add `@angular/animations` to prevent `Cannot find module '@angular/animations'` errors on compilation. Need to choose a version compatible with your angular version, v8 here.

So the results was:

```bash
$ npm install intl-tel-input@14.1.0 google-libphonenumber ngx-bootstrap bootstrap --save
+ ngx-bootstrap@5.5.0
+ google-libphonenumber@3.2.7
+ intl-tel-input@14.1.0
$ npm i @angular/animations@8
+ bootstrap@4.4.1
+ @angular/animations@8.2.14
```

#### Add Dependency Style
Add following styles on your angular.json, for build and test:

```
"./node_modules/bootstrap/dist/css/bootstrap.min.css",
"./node_modules/ngx-bootstrap/datepicker/bs-datepicker.css",
"./node_modules/intl-tel-input/build/css/intlTelInput.css",
```

#### Install library
And finally, install the `ngx-intl-tel-input` lib.

```bash
$ npm install ngx-intl-tel-input --save
+ ngx-intl-tel-input@2.3.1
```

### Import modules
Add `BsDropDownModule` and `NgxIntlTelInputModule` to your module, for example on `src/app/app.module.ts`:

```ts
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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

## Sign-in service for web
[AngularFire](https://www.npmjs.com/package/@angular/fire) provides [AngularFireAuth](https://github.com/angular/angularfire/blob/master/docs/auth/getting-started.md) service to dynamically import the firebase/auth library and provide a promisified version of the [Firebase Auth SDK (firebase.auth.Auth)](https://firebase.google.com/docs/reference/js/firebase.auth.Auth).

In our component we can then dependency inject AngularFireAuth and make calls against the SDK:

vdias$ ng g service core/auth/signin-web --skip-tests
CREATE src/app/core/auth/signin-web.service.ts (138 bytes)


```ts
import { AngularFireAuth } from '@angular/fire/auth';

constructor(afAuth: AngularFireAuth) {
  
}
```

## Sign-in service for native

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
[AngularFire]:<https://github.com/angular/angularfire>