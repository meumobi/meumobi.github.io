---
layout: post
title: JavaScript: Passing parameters to a callback function
categories: [javascript]
tags: [javascript, js]
author:
  name: Victor Dias
  email: victor.dias@meumobi.com
  github: elbidone
  twitter: meumobi
  bio: Sharing mobile Experiences
  email_md5: 1cd012be2382e755aa763c66acc7cfa6
---

http://pastie.org/10391863
http://stackoverflow.com/questions/3458553/javascript-passing-parameters-to-a-callback-function


function SomeFunction(name) {
    this.name = name;
}
function tryMe(param1, param2) {
    console.log(this.name + ":  " + param1 + " and " + param2);
}
function tryMeMore(param1, param2, param3) {
    alert("oi");
    console.log(this.name + ": " + param1 + " and " + param2 + " and even " + param3);
}
function callbackTester(callback, callbackContext) {
    callback.apply(callbackContext, Array.prototype.splice.call(arguments, 2));
}
callbackTester(tryMe, new SomeFunction("context1"), "hello", "goodbye");
callbackTester(tryMeMore, new SomeFunction("context2"), "hello", "goodbye", "hasta la vista");
}