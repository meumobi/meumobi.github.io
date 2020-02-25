---
layout: post
title: How to optimize performance of Ionic 3.x PWA
categories: [Ionic]
tags: [ionic, angular, pwa]
author:
  name: Victor Dias
  email: victor.dias@meumobi.com
  github: elbidone
  twitter: meumobi
  bio: Sharing mobile Experiences
  email_md5: 1cd012be2382e755aa763c66acc7cfa6
---

Thanks to latest releases it's easy now with [Ionic v3.x to build a PWA](http://meumobi.github.io/ionic/pwa/2018/03/26/using-ionic-app-sources-as-pwa.html). But as shown on [Lighthouse tool](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk), out of the box performance is not extraordinary. 
![Ionic PWA Bad Performance]({{ site.BASE_PATH}}/assets/media/ionic/Lighthouse_Report-ionic v3 PWA.png)

## Measure performance
Performance is one of the most important points on the [PWA checklist](https://developers.google.com/web/progressive-web-apps/checklist). To understand and improve performance we've decided to work on popular ionic starter blank. We'll not add any feature, but follow some best pratices to try to reach better lighthouse performance rating.
To not influence results with our local environment we'll use lighthouse provided by cloud service [webpagetest.org](https://www.webpagetest.org/)

![WebPagetest meu-starter]({{ site.BASE_PATH}}/assets/media/ionic/WebPagetest_meu-starter.png)

### Runtime environment

We've selected the `Mobile Regular 3G` test configuration corresponding to runtime environment described below:

- User agent: Mozilla/5.0 (Linux; Android 6.0.1; Moto G (4) Build/MPJ24.139-64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.126 Mobile Safari/537.36
- Device Emulation Nexus 5X: Disabled
- Network Throttling 562.5ms RTT, 1.4Mbps down, 0.7Mbps up: Disabled
- CPU Throttling 4x slowdown: Disabled


On this post we'll create a new Ionic project from blank starter and measure benefits of each tips recommended to improve performance.
These tips could significantly improve 1st load time, reducing css or main.js, but for next loads performance is driven by the use of service-workers responsible for cache.

## Setup project

### local env

I've upgraded the cli to next major release Ionic v4, some commands could be slightly different on v3.

```
$ ionic info
cli packages: (/usr/local/lib/node_modules)

   @ionic/cli-utils  : 2.0.0-rc.5
   ionic (Ionic CLI) : 4.0.0-rc.5

local packages:

   @ionic/app-scripts : 3.1.9
   Ionic Framework    : ionic-angular 3.9.2
```

### Start blank project

```
$ ionic start meu-starter.ionic-v3
? Project type: ionic-angular
? Starter template: blank
? Would you like to integrate your new app with Cordova to target native iOS and Android: No
? Install the free Ionic Pro SDK and connect your app: No
```

## Setup PWA

### Remove cordova.js and enable service worker
Update `src/index.html` 

```
  <!-- cordova.js required for cordova apps (remove if not needed) 
  <script src="cordova.js"></script> -->

  <!-- un-comment this code to enable service worker -->
  <script>
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('service-worker.js')
        .then(() => console.log('service worker installed'))
        .catch(err => console.error('Error', err));
    }
  </script>
```

And finally run the build with ionic cli `$ ionic build --prod` and deploy the app on firebase hosting to test it with Lighthouse.

### Lighthouse audit report

|Ionic v3: PWA Performance|
|---|
|![Ionic v3: PWA Performance]({{ site.BASE_PATH}}/assets/media/ionic/Lighthouse_Report-ionic v3 PWA.png)|

```
$ ls -slh www/build| awk '{print $6,$10}'
 
420K main.css
5.4K main.js
95K polyfills.js
15K sw-toolbox.js
528K vendor.js
$ du -ach www/assets/fonts | grep total
2.2M	total
```

## Optimization-1: Build for one platform only

Ionic uses [modes](https://ionicframework.com/docs/theming/platform-specific-styles/) to customize the look of components. Each platform has a default mode, but this can be overridden. For example, an app being viewed on an Android platform will use the `md` (Material Design) mode. The `<ion-app>` will have `class="md"` added to it by default and all of the components will use Material Design styles:

```html
<ion-app class="md">
```

When building a PWA you use only one mode for all web browser, then no need to import all modes.

Open src/app/app.module.ts and replace:

```
IonicModule.forRoot(MyApp)
```

by:

```
IonicModule.forRoot(MyApp, {
  mode: 'md' // 'md' | 'ios' | 'wp'
})
```

Make a copy of `@ionic/app-scripts/config/sass.config.js` and update it to exclude ios and wp styles.

```
$ mkdir config
$ cp node_modules/\@ionic/app-scripts/config/sass.config.js config/.
$ vi config/sass.config.js

...
excludeFiles: [
  /\.(wp|ios).(scss)$/i,
],
...

```

And add this new config file to package.json

```
  "config": {
    "ionic_sass": "./config/sass.config.js"
  },
```

|www/build optimization-1|www/build starter blank|
|---|---|
|236K main.css<br/>5.4K main.js<br/>95K polyfills.js<br/>15K sw-toolbox.js<br/>528K vendor.js|420K main.css<br/>5.4K main.js<br/>95K polyfills.js<br/>15K sw-toolbox.js<br/>528K vendor.js|

## Optimization-2: Remove iOS fonts
Open `src/theme/variables.scss` and remove `@import "noto-sans";`

And add this new config file to package.json

```
  "config": {
    "ionic_sass": "./config/sass.config.js",
    "ionic_copy": "./config/copy.config.js"
  },
```

|www/build optimization-1+2|www/build starter blank|
|---|---|
|235K main.css<br/>5.4K main.js<br/>95K polyfills.js<br/>15K sw-toolbox.js<br/>528K vendor.js<br/>1016K www/assets/fonts|420K main.css<br/>5.4K main.js<br/>95K polyfills.js<br/>15K sw-toolbox.js<br/>528K vendor.js<br/>2.2M www/assets/fonts|

## Optimization-3: Custom icons
Build custom icons lib with only the icons you need.
To remove default [ionicons](https://ionicframework.com/docs/ionicons/)
open `src/theme/variables.scss` and remove `@import "ionic.ionicons";`

[HOW TO USE CUSTOM ICONS ON IONIC 3](https://yannbraga.com/2017/06/28/how-to-use-custom-icons-on-ionic-3/)

```
$ ls -slh www/build| awk '{print $6,$10}'
 
195K main.css
5.4K main.js
95K polyfills.js
15K sw-toolbox.js
528K vendor.js
```

## Optimization-4: Remove useless CSS
A lot of styles on css bundle are for [components](https://github.com/ionic-team/ionic/tree/master/core/src/components) that we do not even use.

Open `sass.js` and modify the `excludeFiles` section once again with the following:

```
excludeFiles: [
  /\.(wp|ios).(scss)$/i,
  /(action-sheet|alert|backdrop|badge|button|card|checkbox|chip|datetime|fab|grid|icon|img|infinite-scroll|input|item|label|list|loading|menu|modal|note|picker|popover|radio|range|refresher|searchbar|segment|select|show-hide-when|slides|split-pane|spinner|tabs|toast|toggle|virtual-scroll|cordova)/i,
],
```

For the `blank` app we only need to keep: `app`, `content` and `toolbar` but of course in a more advanced app you will need more.

|www/build optimization-1+2+3+4|www/build starter blank|
|---|---|
|86K main.css<br/>5.4K main.js<br/>95K polyfills.js<br/>15K sw-toolbox.js<br/>528K vendor.js<br/>1016K www/assets/fonts|420K main.css<br/>5.4K main.js<br/>95K polyfills.js<br/>15K sw-toolbox.js<br/>528K vendor.js|

## Remove unused $colors

Remove all unused colors from the $colors array in `src/theme/variables.scss`. Ideally you will only have one or two colors left.

```scss
$colors: (
  primary:    #488aff,
  secondary:  #32db64
);
```

|www/build optimization-1+2+3+4|www/build starter blank|
|---|---|
|65K main.css<br/>5.4K main.js<br/>95K polyfills.js<br/>15K sw-toolbox.js<br/>528K vendor.js<br/>1016K www/assets/fonts|420K main.css<br/>5.4K main.js<br/>95K polyfills.js<br/>15K sw-toolbox.js<br/>528K vendor.js|

## Optimization-5:  run purify-css

```
$ npm install purify-css -g
$ purifycss www/build/main.css www/build/*.js --info --min --out www/build/main.css 

    ________________________________________________
    |
    |   PurifyCSS has reduced the file size by ~ 53.5%  
    |
    ________________________________________________
```

|www/build optimization-1+2+3+4+5|www/build starter blank|
|---|---|
|30K main.css<br/>5.4K main.js<br/>95K polyfills.js<br/>15K sw-toolbox.js<br/>528K vendor.js<br/>1016K www/assets/fonts|420K main.css<br/>5.4K main.js<br/>95K polyfills.js<br/>15K sw-toolbox.js<br/>528K vendor.js|

## Optimization-6: Removing Cordova plugins

```
$ npm uninstall --save @ionic-native/core @ionic-native/splash-screen @ionic-native/status-bar

```

Remove import and providers declarations from src/app/app.module.ts:

```
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

providers: [
    StatusBar,
    SplashScreen,
	...
]

```

Do same job on src/app/app.component.ts

```
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
```

|www/build optimization-1+2+3+4+5+6|www/build starter blank|
|---|---|
|30K main.css<br/>5.3K main.js<br/>95K polyfills.js<br/>15K sw-toolbox.js<br/>514K vendor.js<br/>1016K www/assets/fonts|420K main.css<br/>5.4K main.js<br/>95K polyfills.js<br/>15K sw-toolbox.js<br/>528K vendor.js|

## Optimization-7: Add lazy-loading

[Ionic and Lazy Loading Pt 1](https://blog.ionicframework.com/ionic-and-lazy-loading-pt-1/)
[Ionic and Lazy Loading Pt 2](https://blog.ionicframework.com/ionic-and-lazy-loading-pt-2/)


|www/build optimization-1+2+3+4+5+6+7|www/build starter blank|
|---|---|
|5.0K 0.js<br/>30K main.css<br/>3.8K main.js<br/>95K polyfills.js<br/>15K sw-toolbox.js<br/>514K vendor.js<br/>1016K www/assets/fonts|420K main.css<br/>5.4K main.js<br/>95K polyfills.js<br/>15K sw-toolbox.js<br/>528K vendor.js|

## Conclusion

![Lighthouse results after optimizing]({{ site.BASE_PATH}}/assets/media/ionic/Lighthouse_Report-optimized v3.png)

>  this issue is going to be solved without having to do any of the build magic that Julien was doing. In a future release of Ionic-Angular every component will lazy load only the css needed at that time. So if its on an Android device or on the web as a PWA it will only lazy-load the css needed for MD mode, and none of the other mode's css will get loaded. Also, as i said, its going to be lazy loaded per component, so you are only ever loading the css needed specifically for the components on that page. So, while this is a very cool setup, in the near future it will not be needed anymore.

Source: [github.com/ionic-team/ionic-app-scripts](https://github.com/ionic-team/ionic-app-scripts/issues/1134#issuecomment-316755306)

## Furthermore

- [Optimized Ionic-Angular CSS Bundle for PWA](https://julienrenaux.fr/2017/07/20/optimized-ionic-angular-css-bundle-for-pwas/)
- [CASE STUDY: STONE FEST 21 – PWA](https://chrisgriffith.wordpress.com/2017/08/24/case-study-stone-fest-21-pwa/)