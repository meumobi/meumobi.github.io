---
layout: post
title: Render AngularJS directive after async http.get call is done
categories: [AngularJS]
tags: [directive, async, resolve, ngRoute]
author:
  name: Victor Dias
  email: victor.dias@meumobi.com
  github: elbidone
  twitter: meumobi
  bio: Sharing mobile Experiences
  email_md5: 1cd012be2382e755aa763c66acc7cfa6
---

http://stackoverflow.com/questions/20068526/angularjs-directive-does-not-update-on-scope-variable-changes
http://stackoverflow.com/questions/21177582/directive-is-being-rendered-before-promise-is-resolved
http://www.ngroutes.com/questions/AUy0YBGmJGEimGEpEtZT/load-html-template-after-async-http-get-call-is-done.html
> You don't need another $watch, scope: { walks: '=walkmap' } is already watching.
http://www.ngroutes.com/questions/AUuAE7-Sa5vEqxqlLCWm/angularjs-directive-how-to-refresh-template-after-async-data-load.html

- Use ngRoute's (or UiRouter's) resolve method, and inject its data into a controller.
- Use ngIf on an ancestor element of the directive needing data, and make the data request within a controller (ngIf will automatically engage the target directive once the expression it's observing becomes truthy).
```
<div ng-if="my.data"> <div foo="my.data"></div> </div>
````
https://github.com/angular/angular.js/issues/2095#issuecomment-45448581


https://medium.com/opinionated-angularjs/advanced-routing-and-resolves-a2fcbf874a1c

http://www.johnpapa.net/route-resolve-and-controller-activate-in-angularjs/