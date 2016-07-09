## Which UI Framework ?
# Mobile Web
[ionic 1.2] marks the first release where we actively recommend Ionic for those looking to build a mobile website (not just an app for the app store). 

# Native Scroll
By default, [ionic 1.2] will use native scrolling on all platforms.
To force Javascript scrolling, use `<ion-content overflow-scroll="false">`. Note: collection repeat still uses Javascript scrolling which we will phase out in 1.3.

[ionic 1.2]: http://blog.ionic.io/announcing-ionic-1-2/

# Native transitions

[ionic-native-transitions]: https://www.npmjs.com/package/ionic-native-transitions
http://www.gajotres.net/handling-native-view-animations-with-ionic-framework/

## Pull to refresh

## Infinite Scroll

## Transitions
http://gonehybrid.com/how-to-animate-your-ionic-app-with-animate-css-and-nganimate/
https://daneden.github.io/animate.css/
ngAnimate is already included in the Ionic bundle, so we don't need to install anything for it.
[angular-animate](https://docs.angularjs.org/api/ngAnimate)
http://cases.azoft.com/iphonestyle-web-page-transitions-angularjs-css/

```xml
<ion-nav-view animation="slide-left-right"></ion-nav-view>
```
http://www.bennadel.com/blog/2935-enable-animations-explicitly-for-a-performance-boost-in-angularjs.htm
http://codepen.io/calendee/pen/IcCbn

## What Web View ?
# iOS WKWebView Web view
This new Web View comes with a beefier javascript engine and more modern Web API support. 

# Android Crosswalk Web view
The Crosswalk WebView allows for much better performance in Android applications by replacing the native WebView.

The only drawback I’ve seen so far is that it makes your application size fairly large (adds about 20mb). If this isn’t an issue for you, it’s definitely worth using.
http://scottbolinger.com/4-ways-to-make-your-ionic-app-feel-native/

# Performance
## One-time binding
http://julienrenaux.fr/2015/08/24/ultimate-angularjs-and-ionic-performance-cheat-sheet/

```javascript
{{::user.first_name}}
```
You can prefix every expressions with ::, even the ones in ngIf or ngClass:

```javascript
<div ng-if="::(user.isSomething && user.isSomethingElse)"></div>
<div ng-class="::{classNameFoo: user.isSomething}"></div>
```
Actually, the code simply checks that the two first characters in the expression are : in order to activate the one-time binding (and then removes them, thus the parenthesis aren't even needed). 

you can also one-time binding a function, for example, {{::makeDonut( latestDate, key, true, "myId"+$index )}

## Track by
http://julienrenaux.fr/2015/08/24/ultimate-angularjs-and-ionic-performance-cheat-sheet/

```javascript
ng-repeat="user in users track by user.id"
```

or
```javascript
ng-repeat="contact in vm.contacts | filter:query track by contact.id"
```
## Logs
### gulp-strip-debug
[gulp-strip-debug](https://www.npmjs.com/package/gulp-strip-debug) 
Strip console and debugger statements from JavaScript code

### AngularJS Service $log
AngularJS has a built in service that just does that: $log. It can be switched off using the $logProvider provider.
The $log service has several log levels .info .debug and .error.

## Caching
https://github.com/jmdobry/angular-cache

## Loops
The “cached for loop” tend to be the best alternative across browsers. 
http://julienrenaux.fr/2015/08/24/ultimate-angularjs-and-ionic-performance-cheat-sheet/
```javascript
// cached for loop
var i = 0,
  len = arr.length
for (; i < len; ++i) {
  arr[i];
};
```

## Select in array
“cached for loop”
http://jsperf.com/javascript-array-filter-versus-loop/13
# Using an AngularJS Factory to Interact with a RESTful Service
http://weblogs.asp.net/dwahlin/using-an-angularjs-factory-to-interact-with-a-restful-service

# WordPress Hybrid Client
http://wphc.julienrenaux.fr/

# Splashscreens and Icons

```bash
// generate both icons and splashscreens
ionic resources
```

# Introduction
What we expect ?
- website and App
  - fallbacks + responsive
- Feel native
  - Smooth scroll
	- Native transitions
	- Native Dialogs
- Offline Content
- dev environment
  - no unit tests yet but scripts to check, clean and compile

PhoneGap Settings
- Splash Screen
  - hide on device Ready
- Status Bar
  - style lightcontent
- white list

Customize Look & Feel of UI Framework

Our App will manage a set of items:
- display list
	- media object
	http://ionicframework.com/docs/components/#item-thumbnails
  - pull to refresh
  - infinite scroll
		http://julienrenaux.fr/2015/08/24/ultimate-angularjs-and-ionic-performance-cheat-sheet/#Infinite_Scroll
	- slide-left animation when select item
- show details
  - swipe navigation to next/previous
	- Share on social networks

# Setup Environment
- install PhoneGap
- install Mobile Angular UI / Ionic
-- include AngularJS

header and footer fixed
* items/list, items/show
* infinite scroll
* slide animation on click
* swipe navigation
AngularJS Factory to consum RESTful API
* pull to refresh
Cache
* Share
Download and Open files
Add to calendar
Authenticate
Contact Form
	- Validation Form
	- http://sebastien.saunier.me/blog/2014/04/15/you-do-not-need-a-database-for-your-contact-form.html
Alternatives Web views
carousel
play audio/video
multi-language
Push Notification
Image Caching
Use Native Dialogs: confirm, alert and prompt
http://developer.telerik.com/featured/adding-native-touches-hybrid-app/
Analytics
Active links


# Features
## Latest news: list/show
### Master Detail UI Pattern
- display category
- Suggest articles, from same category
### Actions
- share
## Events list / show
### Actions
- add 2 calendar
- share
- going (=> add to calendar ?) / can't go
## Contacts list / show
- click to call/mail/share (incl. mail ?)
## Polls list / show
## Files list / show
- download, read & share
## Services list / show
- click to call/mail/direction/share
## Contact form

## Account settings
### Change password
### Edit details
- Contact fields
- Image profile
### Choose language => site layer

### Choose Push Categories

## Contextual information
https://lmjabreu.com/post/communication-skills-for-apps/
## Push Notification

## Analytics

## Multi-language

## Log In / Sign Up
http://www.scriptscoop.net/t/79e2da4fe623/drag-page-content-view-make-a-blank-screen-on-ios-8-mobile-app.html
## Full-Page Mobile Swipe 
https://about.zoosk.com/en/engineering-blog/creating-full-page-mobile-swipe-with-angularjs/
https://about.zoosk.com/en/engineering-blog/tuning-mobile-swipe-60fps-part-1/
http://codepen.io/calendee/pen/vaksD
http://www.gajotres.net/ionic-framework-series-13-touch-gestures/
https://blog.nraboy.com/2014/11/using-slide-boxes-tabs-ionic-framework-apps/
http://www.smashingmagazine.com/2012/06/play-with-hardware-accelerated-css/
https://github.com/Stereobit/dragend
## OTP

Backlog
- like news/events
- filter news by category

## hot code push
https://github.com/nordnet/cordova-hot-code-push
-------------------------------------------------
# ui-Employee
## Page Navigation
### Routing framework
Angular ngRoute module

### Changing page
```javascript
$location.path('/view/1')
```
## Animate page transition
animate.css and SharedState

## Master Detail + Tab bar Patterns

https://lmjabreu.com/post/why-and-how-to-avoid-hamburger-menus/

## Consum RESTful API
AngularJS Factory to consum RESTful API


# ion-Employee
## Page Navigation
### Routing framework
AngularUI [ui-router](https://github.com/angular-ui/ui-router)
Unlike the $route service in the Angular ngRoute module, which is organized around URL routes, UI-Router is organized around states, which may optionally have routes, as well as other behavior, attached.
### Changing page

```javascript
$state.go('view', {id:1})
```
## Animate page transition
Directives `nav-transition` and `nav-direction`
http://www.gajotres.net/ionic-framework-tutorial-8-page-navigation/

## UX

> The key is not to hide navigation, allow direct access, don’t conflict with navigation gestures, and present feedback on the icon it’s related to.
Source: https://lmjabreu.com/post/why-and-how-to-avoid-hamburger-menus/

## Navigation bar

## Tab bar

## Master Detail Pattern
http://www.gajotres.net/ionic-framework-tutorial-5-master-detail-pattern/


## Consum RESTful API
AngularJS Factory to consum RESTful API


http://www.gajotres.net/ionic-framework-tutorial-4-mixing-ui-patterns/2/
http://plnkr.co/edit/35wTi7?p=preview
http://www.gajotres.net/ionic-framework-tutorial-5-master-detail-pattern/
http://www.gajotres.net/speed-up-your-ionic-application-using-these-techniques/2/
http://cordova.apache.org/blog/
https://github.com/apache/cordova-plugin-wkwebview-engine
https://developer.mozilla.org/en/docs/Web/API/Document/getElementsByClassName
https://ccoenraets.github.io/ionic-tutorial/ionic-facebook-integration.html
http://julienrenaux.fr/2015/08/24/ultimate-angularjs-and-ionic-performance-cheat-sheet/
http://cases.azoft.com/iphonestyle-web-page-transitions-angularjs-css/
https://code.angularjs.org/1.5.0-rc.0/docs/api/ngAnimate/service/$animateCss
http://weblogs.asp.net/dwahlin/using-an-angularjs-factory-to-interact-with-a-restful-service
http://julienrenaux.fr/2015/08/24/ultimate-angularjs-and-ionic-performance-cheat-sheet/
http://scottbolinger.com/4-ways-to-make-your-ionic-app-feel-native/
http://ionicframework.com/docs/api/
http://gonehybrid.com/how-to-animate-your-ionic-app-with-animate-css-and-nganimate/