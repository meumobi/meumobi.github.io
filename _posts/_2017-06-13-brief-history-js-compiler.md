# JiT vs AoT
https://github.com/johnpapa/angular-tour-of-heroes
https://en.wikipedia.org/wiki/Just-in-time_compilation
# Redux
https://en.wikipedia.org/wiki/Redux_(JavaScript_library)

SystemJS
RollUp
Transpiler
# Babel
[Babel](https://babeljs.io/)

> Babel provided a way for developers to use the latest JavaScript syntax while allowing them to not worry about how to make it backwards compatible for their users by translating it.

# WebPack
https://medium.com/webpack/brief-introduction-to-scope-hoisting-in-webpack-8435084c171f

# [Browserify](http://browserify.org/)
http://nicholasjohnson.com/blog/building-angular-with-browserify/

http://www.syntaxsuccess.com/viewarticle/angular-production-builds
[webpack and code splitting](https://www.youtube.com/watch?v=mK_D_LMXzVQ&index=12&list=PLWbHc_FXPo2ivlIjzcaHS9N_Swe_0hWj0)


JavaScript Patterns for 2017 - Scott Allen: https://www.youtube.com/watch?v=hO7mzO83N1Q&index=19#t=522.617786

https://medium.freecodecamp.com/you-need-a-javascript-starter-kit-ff12d90ed8c5
https://angular.io/guide/aot-compiler

# Building Angular 2 Applications with Redux
Redux is a library that helps manage the state of your application using a flux-inspired unidirectional data flow.
https://rangle.io/resources/angular-camp-july-2016/

# Angular 2 Modules (NgModule)

> Angular Modules help organize an application into cohesive blocks of functionality.

https://www.youtube.com/watch?v=L0XXoPqSphs
https://angular.io/guide/ngmodule
http://masteringionic.com/blog/2017-04-15-using-angular-modules-in-ionic-applications/
https://formationjavascript.com/comprendre-les-modules-angular-ngmodule/

# Angular 2 Component Communication
https://rangle.io/resources/angular2-component-communication/

# Shared Modules and Dependency Injection

Create a shared NgModule that will have all common Component/Service/Pipe. By doing so you will avoid code duplication. It will make code modularize, plug-able & testable.

In order to use AddressComponent & EmailComponent in other modules, you need to export them from the shared module:

Code

```
@NgModule({
   imports: [CommonModule],
   declarations: [AddressComponent, EmailComponent],
   providers: [MySharedService],
   exports: [AddressComponent, EmailComponent],
})
export class SharedModule() { }
```

While Consuming SharedModule, all you have to do is import SharedModule

```
@NgModule({
   imports: [CommonModule, SharedModule, ... ],
   providers: [..]
})
export class CustomersModule() { }
```

SharedModule should be the only one declaring the component(s). And consumers only need to import SharedModule.

https://angular-2-training-book.rangle.io/handout/modules/shared-modules-di.html
https://stackoverflow.com/questions/40358415/in-angular2-i-have-a-pipe-that-is-use-in-two-components-and-would-like-to-know-h
https://jing-chai.blogspot.fr/2017/03/angular-2-core-vs-shared-modules.html

# Angular 2 for Angular 1 Developers
https://medium.com/@jrwebdev/angular-2-for-angular-1-developers-ca8de3c1d3b4

# How to publish a library for Angular 2 on npm
https://medium.com/@OCombe/how-to-publish-a-library-for-angular-2-on-npm-5f48cdabf435
https://dzone.com/articles/create-an-angular-2-component-library-and-consume

# Angular 2 Series: Components
https://pascalprecht.github.io/2014/10/25/integrating-web-components-with-angularjs/
http://blog.ionic.io/angular-2-series-components/
https://css-tricks.com/modular-future-web-components/

# Moving from ES3/ES5 to ES6 JavaScript classes
https://andywalpole.me/blog/144451/moving-es3es5-es6-javascript-classes

# Angular’s new observable-based http object
http://coenraets.org/blog/2017/04/dreamhouse-sample-application-ionic3-angular4/