
angular.isDefined(obj) doesn't work if “obj” is undefined

[`angular.isDefined` throws `Uncaught ReferenceError: xxx is not defined` exception](https://github.com/angular/angular.js/issues/5225)

Accessing a truly undefined variable in any way in Javascript, except tyepof throws an error. You can only use Angular.isDefined with properties. E.g, this would work fine:

Angular.isDefined(window.obj);
Because obj is an undefined propery of window.

```js
var foo;
var bar = 42;

typeof foo !== 'undefined'; // false
typeof bar !== 'undefined'; // true
typeof baz !== 'undefined'; // false

angular.isDefined(foo); // false
angular.isDefined(bar); // true
angular.isDefined(baz); // ReferenceError
```

Source: http://stackoverflow.com/questions/24191531/angular-isdefinedobj-doesnt-work-if-obj-is-undefined

Here is the source:

function isDefined(value) {return typeof value !== 'undefined';}

# Why does typeof foo === "undefined" not suffice?
