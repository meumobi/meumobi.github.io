---
layout: post
title: Creating a shared module for Ionic App
categories: [Ionic]
tags: [tutorial, angular]
author:
  name: Victor Dias
  email: victor.dias@meumobi.com
  github: elbidone
  twitter: meumobi
  bio: Sharing mobile Experiences
  email_md5: 1cd012be2382e755aa763c66acc7cfa6
---

SharedModule contains code that will be used across your app and Feature Modules. You'll import this SharedModule into the specific Feature Modules as needed. You DO NOT import the SharedModule into your main AppModule.

Creating a 'SharedModule' is part of the [Angular Style Guide: Style 04-10](https://angular.io/styleguide#!#04-10). Create a feature module named SharedModule in a shared folder; for example, `app/shared/shared.module.ts`.

```javascript
import { NgModule } from '@angular/core';

import { SearchPipe } from '../pipes';
import { SafeUrlPipe } from '../pipes';

@NgModule({
  imports: [],
  declarations: [
    SearchPipe,
    SafeUrlPipe
  ],
  providers: [],
  exports: [
    SearchPipe,
    SafeUrlPipe
  ]
})
export class SharedModule { }
```

And import it on Feature module to use it, for example:

```javascript
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ContactDetailsPage } from './contact-details';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    ContactDetailsPage,
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(ContactDetailsPage),
  ],
})
export class ContactDetailsPageModule {}

```

SharedModule includes components, directives, and pipes that you use everywhere in your app. This module should consist entirely of declarations, most of them exported.

# Furthermore
- [Angular: Core vs Shared Modules](https://jing-chai.blogspot.fr/2017/03/angular-2-core-vs-shared-modules.html)
- [Ionic and Lazy Loading Pt 2](http://blog.ionic.io/ionic-and-lazy-loading-pt-2/)
- [Why UserService isn't shared](https://angular.io/guide/ngmodule#why-userservice-isnt-shared)