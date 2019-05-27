Mostly we use ngOnInit for all the initialization/declaration and avoid stuff to work in the constructor. The constructor should only be used to initialize class members but shouldn't do actual "work".

So you should use constructor() to setup Dependency Injection and not much else. ngOnInit() is better place to "start" - it's where/when components' bindings are resolved.

https://stackoverflow.com/questions/35845554/angular-2-component-constructor-vs-oninit/35846307#35846307
https://stackoverflow.com/questions/35763730/difference-between-constructor-and-ngoninit/35763811#35763811
https://www.dev6.com/ngOnInit-and-constructor-in-Angular2
https://toddmotto.com/angular-constructor-ngoninit-lifecycle-hook
http://blog.ionic.io/navigating-lifecycle-events/