---
layout: post
title: ngx-translate
categories: [Ionic]
tags: []
author:
  name: Victor Dias
  email: victor.dias@meumobi.com
  github: elbidone
  twitter: meumobi
  bio: Sharing mobile Experiences
  email_md5: 1cd012be2382e755aa763c66acc7cfa6
---

[NGX-Translate] is an internationalization library for Angular 2+. It lets you define translations for your content in different languages and switch between them easily.

# Setup Application
If you’re not already familiar with Ionic, I’d recommend reading [Getting Started with Ionic]({% post_url 2017-08-15-getting-started-ionic %}) to understand the basic concepts.

## Prerequisites
We need to have [Node.js] and [Git] installed in order to install both [Ionic] and [Cordova].

```
$ npm install cordova ionic typescript -g
...
$ npm ls -g cordova ionic npm typescript --depth 0
/usr/local/lib
├── @angular/cli@1.7.4
├── ionic@4.0.0-rc.5 
├── npm@6.0.0 
├── npm-check-updates@2.14.2
├── phonegap@8.0.0
├── typescript@2.8.3 
└── typings@2.1.1
```

## Starting a project with Ionic CLI

```
$ ionic start meu-starter sidemenu
✔ Creating directory ./meu-starter - done!
✔ Downloading and extracting sidemenu starter - done!

? Would you like to integrate your new app with Cordova to target native iOS and Android? (y/N)

**Yes** we'd like to target native iOS and Android.
```

# Install
```
$ npm i --save @ngx-translate/core @ngx-translate/http-loader
```

./src/app/app.module.ts
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
...
export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
..
imports: [
...
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    }),
...
]

./src/app/app.component.ts
import { TranslateService } from '@ngx-translate/core';

constructor(
  private translate: TranslateService,
  ...
){

}
initializeApp() {
    this.translate.setDefaultLang('en');
    this.translate.use(this.translate.getBrowserLang());
    console.log(this.translateService.currentLang);

./src/assets/i18n/pt.json
{
    "Settings": "Configuração"
}

./src/app/app.html
{{'Settings' | translate}}

   [Node.js]: <https://nodejs.org/en/download/>
   [Git]: <http://git-scm.com/download>
   [Ionic]: <https://ionicframework.com/>
   [Cordova]: <https://cordova.apache.org/>
   [Ionic PWA toolkit]: <https://ionicframework.com/pwa>
   [Gulp]: <https://gulpjs.com/>
   [ngx-translate]: <http://www.ngx-translate.com/>