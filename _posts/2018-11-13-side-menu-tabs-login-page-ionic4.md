---
layout: post
title: 'Combine side menu, tabs and login page with Ionic 4'
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

If you ever tried to combine side menu, tabs and login page on Ionic, for sure you know how a mess it could represent. We've faced this challenge and would like to share with you how we acheive it and which docs/posts help us on the way.
![Combine side menu, tabs and login page with Ionic 4]({{ site.BASE_PATH}}/assets/media/tabs-sidemenu/Ionic_App-2.png)

## Application
We are going to create a demo App `meu-starter.tabs-sidemenu.ionic-v4`.

This App will implement following features:
- side menu with split pane (expand side menu on tablet/desktop)
- include tabs on main content area
- login page without side menu neither tabs
- highlight on side menu current url

We'll use the [latest tab implementation](https://blog.ionicframework.com/ionic-release-v4-beta-15-out-today/) of Ionic released on [4.0.0-beta.15](https://github.com/ionic-team/ionic/releases/tag/v4.0.0-beta.15).

## Setup

### Prerequisites
We need to have [Node.js] and [Git] installed in order to install both [Ionic] and [Cordova].

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

### Create a new Ionic v4 application

Create a New Ionic 4 and Angular 6 Application using `tabs` template (we could acheive same result using `sidemenu` template and adding tabs)

```
$ ionic start meu-starter.tabs-sidemenu.ionic-v4 tabs --type=angular
$ cd meu-starter.tabs-sidemenu.ionic-v4
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

Below I show the final file structure of the project. I don't list all files, only the main files related to this demo App.

```
./src
  /app
    /about
    /contact
    /home
    /tabs
      tabs.module.ts
      tabs.page.html
      tabs.page.scss
      tabs.page.spec.ts
      tabs.page.ts
      tabs.router.module.ts
    /components
      /menu-item
        menu-item.component.scss
        menu-item.component.html
        menu-item.component.spec.ts
        menu-item.component.ts
    app-routing.module.ts
    app.component.html
    app.component.spec.ts
    app.component.ts
    app.module.ts
```

## Split pane and side menu

We start with a basic implementation of
[ion-split-pane](https://beta.ionicframework.com/docs/api/split-pane/) and [ion-menu](https://beta.ionicframework.com/docs/api/menu/) extracted from official doc.


`src/app/app.component.html`

```
<ion-app>
  <ion-split-pane>
    <!--  our side menu  -->
    <ion-menu>
      <ion-header>
        <ion-toolbar>
          <ion-title>Menu</ion-title>
        </ion-toolbar>
      </ion-header>
    </ion-menu>
  
    <!-- the main content -->
    <ion-router-outlet main></ion-router-outlet>
  </ion-split-pane>
</ion-app>
```

![Split pane and side menu]({{ site.BASE_PATH}}/assets/media/tabs-sidemenu/Ionic_App-1.png)

## Login page and disable menu

```
$ ionic g page login
> ng generate page login
CREATE src/app/login/login.module.ts (538 bytes)
CREATE src/app/login/login.page.scss (0 bytes)
CREATE src/app/login/login.page.html (132 bytes)
CREATE src/app/login/login.page.spec.ts (684 bytes)
CREATE src/app/login/login.page.ts (252 bytes)
UPDATE src/app/app-routing.module.ts (385 bytes)
```

On login page we'd like to disable side menu, then we'll subscribe to `router.events` to get current url and compare with `/login`, if true then call `enable(false)` method of [MenuController](https://beta.ionicframework.com/docs/api/menu-controller).

`src/app/app.component.ts`
```
...
export class AppComponent implements OnInit {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menuCtrl: MenuController,
    private router: Router
  ) { }

  ngOnInit() {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd && event.url === '/login') {
        this.menuCtrl.enable(false);
      }
    });
  }
```

Could also use the `disabled` property on ion-menu to hide it on login, 
`<ion-menu [disabled]="!isLoggedIn"></ion-menu>`

## Add menu icon on pages

We add [ion-menu-button](https://beta.ionicframework.com/docs/api/menu-button/) on our pages to display the 'hamburguer' when sidemenu not visible on SplitPane.

`src/app/contact/contact.page.html`

```
<ion-header>
  <ion-toolbar>
    <ion-buttons slot="start">
      <ion-menu-button></ion-menu-button>
    </ion-buttons>
    <ion-title>
      Contact
    </ion-title>
  </ion-toolbar>
</ion-header>
...

```

## Highlight active link

We'll generate dynamic links on sidemenu and create a component `menu-item` to display the link on `ion-item` element. We do it because a new component allow us to setup a css where we add active item style.

The active link is marked on app.component.ts as `active` by comparing its url and current url. 

`src/app/app.component.ts`

```
export class AppComponent implements OnInit {

  pages = [
    {
      title: 'Login',
      url: '/login',
    },
    {
      title: 'Contact',
      url: '/tabs/(contact:contact)'
    },
    {
      title: 'About',
      url: '/tabs/(about:about)'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        this.pages.map( p => {
          return p['active'] = (event.url === p.url);
        });
      }
    });
  }
```

`src/app/app.component.html`

```
<ion-app>
  <ion-split-pane>
    <!--  our side menu  -->
    <ion-menu>
      <ion-header>
        <ion-toolbar>
          <ion-title>Menu</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list>
          <ion-menu-toggle auto-hide="false" *ngFor="let p of pages">
            <app-menu-item [link]="p"></app-menu-item>
          </ion-menu-toggle>
        </ion-list>
      </ion-content>
    </ion-menu>

    <!-- the main content -->
    <ion-router-outlet main></ion-router-outlet>
  </ion-split-pane>
</ion-app>
```

We set `auto-hide=false` because using `SpliPane` we don't want to auto hide menu when view is open on desktop.

```
$ $ ionic g component components/menu-item
> ng generate component components/menu-item
CREATE src/app/components/menu-item/menu-item.component.scss (0 bytes)
CREATE src/app/components/menu-item/menu-item.component.html (28 bytes)
CREATE src/app/components/menu-item/menu-item.component.spec.ts (643 bytes)
CREATE src/app/components/menu-item/menu-item.component.ts (281 bytes)
UPDATE src/app/app.module.ts (943 bytes)
[OK] Generated component!
```

`src/app/components/menu-item/menu-item.component.ts`

```
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {

  @Input() link: any;

  constructor() { }

  ngOnInit() {
  }

}
```

`src/app/components/menu-item/menu-item.component.scss`

```
.active-item {
  border-left: 8px solid var(--ion-color-primary);
}
```

`src/app/components/menu-item/menu-item.component.html`

```
<ion-item [href]="link.url" [class.active-item]="link.active" routerDirection="root">
  <ion-label>{{ link.title }}</ion-label>
</ion-item>

```

## Repository & Demo

All source code can be found on GitHub: [https://github.com/meumobi/meu-starter.tabs-sidemenu.ionic-v4](https://github.com/meumobi/meu-starter.tabs-sidemenu.ionic-v4)

## Furthemore

- Baljeet Singh: [Ionic 4 and Angular - Combining Tabs and Sidemenu Templates](https://www.youtube.com/watch?v=w0QTIlpo-Pg)
- Simon Grimm: [How to Add A Side Menu to Your Ionic 4 App](https://www.youtube.com/watch?v=Yx_xJ4m-JxE)

