## Good Coding Rules for Good Apps

### Always unsubscribe
It is important that we unsubscribe from any subscriptions that we create in our Angular components to avoid memory leaks.

https://blog.strongbrew.io/rxjs-best-practices-in-angular/#avoiding-memory-leaks

### Don’t use nested subscriptions
There may be situations where you need to consume data from multiple observable streams. In those cases, you should generally try to avoid so called nested subscriptions. Nested subscriptions becomes hard to understand and may introduce unexpected side effects. We should instead use chainable methods like switchMap, forkJoin and combineLatest to condense our code.

https://blog.strongbrew.io/rxjs-best-practices-in-angular/#avoiding-nested-subscribes

### Use Safe Navigation Operator (?) in template
To be on the safe side we should always use the safe navigation operator while accessing a property from an object in a component’s template. If the object is null and we try to access a property, we are going to get an exception. But if we use the save navigation (?) operator, the template will ignore the null value and will access the property once the object is not the null anymore.

### trackBy with ngFor on templates
When using ngFor to loop over an array in templates, use it with a trackBy function which will return an unique identifier for each item.

https://www.freecodecamp.org/news/best-practices-for-a-clean-and-performant-angular-application-288e7b39eb6f/

### Subscribe in template
Avoid subscribing to observables from components and instead subscribe to the observables from the template. The subscription will terminate when the component gets destroyed, which makes subscription-handling easier and contributes to cleaner code.

### Avoid any; type everything;
Always declare variables or constants with a type other than any.

https://www.freecodecamp.org/news/best-practices-for-a-clean-and-performant-angular-application-288e7b39eb6f/

Consider setting “noImplicitAny”: true. In the tsconfig.json file of your app you can set a flag which tells the compiler to throw errors when types are not explicitly provided.

https://codeburst.io/angular-best-practices-4bed7ae1d0b7

### Small reusable components
Extract the pieces that can be reused in a component and make it a new one. Make the component as dumb as possible, as this will make it work in more scenarios. 

https://www.freecodecamp.org/news/best-practices-for-a-clean-and-performant-angular-application-288e7b39eb6f/

### Avoid logic in templates
If you have any sort of logic in your templates, even if it is a simple && clause, it is good to extract it out into its component.

https://www.freecodecamp.org/news/best-practices-for-a-clean-and-performant-angular-application-288e7b39eb6f/

### Strings should be safe
If you have a variable of type string that can have only a set of values, instead of declaring it as a string type, you can declare the list of possible values as the type.

https://www.freecodecamp.org/news/best-practices-for-a-clean-and-performant-angular-application-288e7b39eb6f/

### Avoiding manual subscribes in Angular
Angular has this super cool feature called the async pipe. It’s used to consume streams directly in the template, this means we don’t have to manually subscribe nor unsubscribe on component. Which cleans up the code a lot.

https://blog.strongbrew.io/rxjs-best-practices-in-angular/#avoiding-manual-subscribes-in-angular

### Sharing subscriptions
Since most streams are cold by default, every subscription will trigger the producer of these streams, a separate execution is created for the observable. The execution of the producer logic on every subscription, might not be what we want if we have multiple subscriptions.
In those cases we might want to share the subscriptions, using `share()` operator. Sharing a stream makes it hot. This means that if we subscribe after the value is produced, we will miss that value. In that case we might want to use `shareReplay(1)` instead of `share()`.

https://blog.strongbrew.io/rxjs-best-practices-in-angular/#sharing-subscriptions
More details on https://blog.strongbrew.io/how-share()-can-reduce-network-requests/
and good example on "Multiple executions" section https://dev.to/blacksonic/clarifying-rxjs-observables-under-5-minutes-2dh3
[Understanding RxJs multicast operators](https://netbasal.com/understanding-rxjs-multicast-operators-77b3f60af0a2)
https://github.com/angular/angular/issues/9641#issuecomment-298914994
https://medium.com/angular-in-depth/rxjs-how-to-use-refcount-73a0c6619a4e

### Naming boolean variables
There is a convention to prefix boolean variables and function names with "is" or "has". You know, something like isLoggedIn, hasAccess or things like that.
src/app/shared/header-logo/header-logo.component.ts

- Avoid
`desktop = this.platform.is('desktop');`
- Prefer
`isDesktop = this.platform.is('desktop');`  

https://dev.to/michi/tips-on-naming-boolean-variables-cleaner-code-35ig

## At the End of the Day
It is quite normal and common that everybody makes mistakes. Even experienced Angular Developers commit mistakes, however, all comes down to how the error is handled and negotiated. What developers can do best is that before attending to those errors, they can probably **make a note or record those mistakes and make sure they do not repeat the same again**.

## Furthermore
- [Best practices for a clean and performant Angular application](https://www.freecodecamp.org/news/best-practices-for-a-clean-and-performant-angular-application-288e7b39eb6f/)
- [Clean Code Checklist in Angular](https://itnext.io/clean-code-checklist-in-angular-%EF%B8%8F-10d4db877f74)
- [Angular Style Guide](https://angular.io/guide/styleguide)
- [Angular Development Best Practices](https://code-maze.com/angular-best-practices/)
- [RxJS best practices in Angular](https://blog.strongbrew.io/rxjs-best-practices-in-angular/)