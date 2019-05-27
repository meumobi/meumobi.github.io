---
layout: post
title: Handling Catch in Promises chain
categories: [Javascript]
tags: [promise]
author:
  name: Victor Dias
  email: victor.dias@meumobi.com
  github: elbidone
  twitter: meumobi
  bio: Sharing mobile Experiences
  email_md5: 1cd012be2382e755aa763c66acc7cfa6
---

you actually don't need a catch statement after every function. You can chain all your thens together, and then close the whole thing off with a single catch. Something like this:

getSession(sessionId)
  .then(function (session) {
    return getUser(session.user_id);
  })
  .then(function (user) {
    req.user = user;
    next();
  })
  .catch(function(error){
    /* potentially some code for generating an error specific message here */
    next(error);
  });
Assuming the error messages tell you what the error is, it's still possible to send an error specific message like 'session not found' or 'user not found', but you'll just have to look into the error message to see what it gives you.

Source: http://stackoverflow.com/questions/24619444/chaining-promises-with-then-and-catch

Or using another way, implement the all logic in one place and the decision of how to handle errors to the client is all in one place and they don't clutter each other.

```js
function changePassword(queryDataEtc){ 
    return repository.Query(getAccountByIdQuery)
                     .then(convertDocumentToModel)
                     .then(verifyOldPassword)
                     .then(changePassword);
}
```

```js
 changePassword(params).
 catch(NoSuchAccountError, function(e){
     res.status(404).send({ error: "No account found with this Id" });
 }).catch(AuthenticationError, function(e){
     res.status(406).send({ OldPassword: error });
 }).error(function(e){ // catches any remaining operational errors
     res.status(500).send({ error: "Unable to change password" });
 }).catch(function(e){
     res.status(500).send({ error: "Unknown internal server error" });
 });
``` 

 Source http://stackoverflow.com/questions/26076511/handling-multiple-catches-in-promise-chain
 
 You have a central place where all exceptions are logged in a nice way, and the higher level code only has to deal with the human way of explaining that something went wrong.
 
```js
 let fetcher = (url) => {
   // this function might be more advanced
   // and do other fancy things
   return fetch(url)
   .catch((exception) => {
     console.error('oh noes! on:', url, 'exception:', exception)
     throw exception
   })
 }

 // 1st
 fetcher('http://example.com/crap')
 .then((response) => {
   document.querySelector('#result').textContent = response
 })
 .catch(() => {
   document.querySelector('#result-error').style['display'] = 'block'
 })

 // 2nd
 fetcher('http://example.com/other')
 .then((response) => {
   document.querySelector('#other').textContent = response
 })
 .catch(() => {
   document.querySelector('#other-error').style['display'] = 'block'
 })
 ```
 
 Source: https://www.peterbe.com/plog/chainable-catches-in-a-promise
 
 http://ramkulkarni.com/blog/using-javascript-promises-with-cordova/
 

unlike ES6 behavior, an exception thrown in the [$q](https://docs.angularjs.org/api/ng/service/$q) constructor function will NOT implicitly reject the promise.

Promise constructor with reject call vs throwing error
http://stackoverflow.com/questions/28703241/promise-constructor-with-reject-call-vs-throwing-error

AngularJS - Promises rethrow caught exceptions
http://stackoverflow.com/questions/23324942/angularjs-promises-rethrow-caught-exceptions

