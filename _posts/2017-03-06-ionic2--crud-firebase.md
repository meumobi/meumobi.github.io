---
layout: post
title: Create a Ionic2 App with Firebase Cloud DB
categories: [Ionic, Firebase]
tags: [hybrid]
author:
  name: Victor Dias
  email: victor.dias@meumobi.com
  github: elbidone
  twitter: meumobi
  bio: Sharing mobile Experiences
  email_md5: 1cd012be2382e755aa763c66acc7cfa6
---

The first thing you’ll do is to make sure you have [node.js](https://nodejs.org/en/) installed.
If you've previously installed it, check if it's latest version, compare `node --version` with.
## How to upgrade Node.js on Mac OS X
If you already have Node.js installed on your Mac the simplest way to upgrade Node.js from the Terminal is to use the [n](https://www.npmjs.com/package/n) version manager:

```
$ npm install -g n
$ npm cache clean -f
```

Simply execute `n <version>` to install a version of node. If <version> has already been installed (via n), n will activate that version.
```
$ sudo n stable
$ npm update -g
```


# Retrieve the specific record

```
import { ReplaySubject } from 'rxjs/ReplaySubject';

const userSubject = new ReplaySubject(1);

const userQuery$ = af.database.list('/users', {query: {
  orderByChild: 'uid',
  equalTo: userSubject
}});

userQuery$.subscribe(users => console.log(users)); //=> [{name: 'Jim' ... }]

// submit a query using user id
userSubject.next('shamrozwarraich@gmail.com');
```

Alternatively, if your users are required to sign in, and you store them using an auth id:

```
// Firebase
{
  users: {
    [authentication id]: {
      name: 'Jim',
      meta: {...}
    }
}
```

```
af.database.object(`/users/${auth.id}`)
  .subscribe(user => console.log(user)); //=> {name: 'Jim' ... }
```

Source: https://github.com/angular/angularfire2/issues/396

# Index your data
console show me warning:

`FIREBASE WARNING: Using an unspecified index. Consider adding ".indexOn": "user" at /textItems to your security rules for better performance`

https://firebase.google.com/docs/database/security/indexing-data

# Display posts in descending posted order

> Unfortunately, Firebase does not have a facility to sort in reverse order. You will have to query and get elements in ascending order and then reverse the list. Or another option would be to, as you receive elements, to push them at the beginning of some list rather then the end. Anyways, you get the point — you have to do this yourself somehow.

https://medium.com/@mvuksano/advanced-queries-in-firebase-a50f563179dd

`myFirebaseRef.orderByChild("highScore").limitToLast(4)`

Source: https://stackoverflow.com/questions/25611356/display-posts-in-descending-posted-order

# Remove a node

```javascript
var ref = firebase.database().ref('reports');
ref.remove()
  .then(function() {
    console.log("Remove succeeded.")
  })
  .catch(function(error) {
    console.log("Remove failed: " + error.message)
  });
 ```
 
Source: https://firebase.google.com/docs/reference/js/firebase.database.Reference#remove

# Remove the results that match a query

```javascript
var eventContactsRef = firebase.database().ref('events-contacts'); 
var query = eventContactsRef.orderByChild('eventContactId').equalTo(eventContactId); query.on('child_added', function(snapshot) {
snapshot.ref.remove(); 
})

firebase().database().ref('reports').orderByChild('date').equalTo('2017-07-25').on('child_added', function (snapshot) {
    snapshot.ref.remove();
})

```
Source: https://stackoverflow.com/a/39491507/4982169

# Do you need to hide your Firebase API keys for Ionic apps?
https://javebratt.com/hide-firebase-api/

# firebase-admin
https://firebaseadmin.com

# Furthermore
here are some good resources to get up to speed:
[Youtube Firebase Email Login/Authentication](https://www.youtube.com/watch?v=aNW444SpFNs)
[How to sync Lists from Firebase](https://javebratt.com/firebase-list-ionic-2/)
[Master Detail Example](https://github.com/javebratt/get-news-fast/blob/master/src/pages/article-detail/article-detail.ts)
[Angular docs](https://angular.io/)
[Victor Savkin's blog](https://vsavkin.com/) 
[Thoughtram's Angular 2 blog](https://blog.thoughtram.io/categories/angular-2/)

https://www.codementor.io/yurio/all-you-need-is-react-firebase-4v7g9p4kf
[Official Blog of firebase](https://firebase.googleblog.com/)
[Official Docs](https://firebase.google.com/docs/database/web/start)
[Firebase Hosting](https://medium.com/google-cloud/google-firebase-can-host-your-website-and-single-page-application-4e9c9e0c6a95)