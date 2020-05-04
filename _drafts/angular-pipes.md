A [pipe](https://angular.io/guide/pipes) takes in data as input and transforms it to a desired output.

## Built-in pipes

Angular comes with a stock of [build-in pipes](https://angular.io/api?type=pipe) such as DatePipe, UpperCasePipe, LowerCasePipe, CurrencyPipe, and PercentPipe. They are all available for use in any template.

There will be one additional argument to the transform method for each parameter passed to the pipe.

## Custom pipe
You can write your own custom pipes.

```ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'helloWorld'})
export class HelloWorldPipe implements PipeTransform {
  transform(name: string, gender?: string): string {
    return `Hello ${gender} ${name}`;
  }
}
```

Now you need a component to demonstrate the pipe.

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-introduction',
  template: `
    <h2>Introduction</h2>
    <p>{{ 'Victor' | helloWorld: 'Mr'}}</p>
  `
})
export class AppIntroductionComponent { }
```

Note the following:

- You must include your pipe in the declarations array of your NgModule
- If you choose to inject your pipe into a class, you must provide it in the providers array of your NgModule.

## Parameterizing a pipe

A pipe can accept any number of optional parameters to fine-tune its output. To add parameters to a pipe, follow the pipe name with a colon ( : ) and then the parameter value (such as currency:'EUR'). If the pipe accepts multiple parameters, separate the values with colons (such as slice:1:5)

