---
layout: post
title: How to use Ionic Native Deeplinks and OneSignal
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
Since we started to live a "double life", producing Native and Progressive Web Apps, we have this goal, to use the same code between platforms. 
In our case, we want to send a push (web or native) to our users about an specific content on our app. 
With webpush is quite easy, just passing the content url (like **https//my.amazing.app/content/123**) as a parameter to a push service (we use Onesignal so far). 
Our mission is have this same behavior into an ionic native app. 
To do this we will break it in some steps.
## Steps ~~to Success~~ 
1. Open Native APP through an URL
2. Open Native APP into on a spefic content through an URL
3. Open Native APP into on a spefic content through an Push Notification


## Checklist
### Base project
For this tutorial we used a web master-detail. You can found it [here](https://github.com/meumobi/meu-starter.master-detail.ionic-v4). Feel free to clone/fork.
```bash
$ git clone https://github.com/meumobi/meu-starter.master-detail.ionic-v4.git mdv4
$ cd mdv4
$ npm i
$ ionic serve //just to check if everything is ok
```
### Android App
```bash
$ ionic cordova platform add android
```
## 1. Open Native APP through an URL
To open an app by an URL it should notify the OS that it can handle some links, like Youtube app can handle youtube.com URLs.
For this we need a native plugin ([ionic-plugin-deeplinks](https://github.com/ionic-team/ionic-plugin-deeplinks#ionic-deeplinks-plugin))
But before we need define a host name. We got a real host name on firebase hosting **https://my-amazing.web.app/**.
Then use it when install the plugin
```bash
$ ionic cordova plugin add ionic-plugin-deeplinks --variable URL_SCHEME=myapp --variable DEEPLINK_SCHEME=https --variable DEEPLINK_HOST=my-amazing.web.app
```
```bash
$ ionic cordova build android
```
### Test
If we check app info it shows what links it can handle.  
![App Info]({{ site.BASE_PATH}}/assets/media/deep/1.png)  
Clicking on link you will be prompted either web or app will open  
![Prompt]({{ site.BASE_PATH}}/assets/media/deep/2.png)  
Voilà  
![App]({{ site.BASE_PATH}}/assets/media/deep/3.png)  

## 2. Open Native APP into on a spefic content through an URL
The ionic team released a wrapper to handle the URLs which opened the app
```
$ npm install @ionic-native/deeplinks --save
```
Import **app.module.ts**
```js
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
...
@NgModule({
  ...
  providers: [
    Deeplinks,
    ...
  ],
  ...
})
export class AppModule {}
```
On Component we will get the url and use Angular Route to redirect to it.
On **app.component.ts**
```ts
import { Router } from '@angular/router';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    ...
    private router: Router,
    private deeplinks: Deeplinks,
  ) {
    this.initializeApp();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      ...
      this.deeplinks.route({
        '/home': HomePage,
      }).subscribe(match => {
        this.router.navigate([match.$link.path]);
      }, nomatch => {
        console.log('Got a deeplink that didn\'t match', nomatch);
      })
    });
  }
}
```


