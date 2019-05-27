---
layout: post
title: How to query the Firebase Database
categories: [firebase]
tags: []
author:
  name: Victor Dias
  email: victor.dias@meumobi.com
  github: elbidone
  twitter: meumobi
  bio: Sharing mobile Experiences
  email_md5: 1cd012be2382e755aa763c66acc7cfa6
---

I've tried to use firebase-admin, but this app is unstable and doesn't work properly, I mean I didn't achieve to work with.

[Official firebase.database.Query Doc](https://firebase.google.com/docs/reference/js/firebase.database.Query)

[Retrieving data](https://firebase.google.com/docs/database/admin/retrieve-data)

There is no built-in querying functionality in the Firebase Console. Most developers use a local node.js script/REPL (such as in this [video tutorial explaining Firebase Queries](https://www.youtube.com/watch?v=GVUHx8AQgjg)) or set up a jsfiddle/jsbin (such as [this one](http://jsbin.com/lexaciy/3/edit?html,js) for [this question](https://stackoverflow.com/questions/38343810/firebase-web-group-by-child-records-by-date-month-year)).


> answer:
http://stackoverflow.com/questions/28589092/firebase-query-find-item-with-child-that-contains-string
http://stackoverflow.com/questions/22506531/how-to-perform-sql-like-operation-on-firebase
you can use all your programming skills to manipulate data once you get from firebase. Also, as per me structuring data in firebase is foremost key to get an effective solution if you think that data will grow with time in significant way.

Source: https://github.com/angular/angularfire2/issues/430

# Furthermore
[firebase/flashlight](https://github.com/firebase/flashlight)

