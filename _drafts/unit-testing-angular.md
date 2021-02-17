
## Execute only one test spec
[ng test command](https://angular.io/cli/test) has an `--include` option where you can specify a directory of `*.spec.(ts|tsx)` files or just a single `.spec.(ts|tsx)` file itself.

How to execute only one test spec with angular-cli
Each of your .spec.ts file have all its tests grouped in describe block like this:
describe('SomeComponent', () => {...}
You can easily run just this single block, by prefixing the describe function name with f:
fdescribe('SomeComponent', () => {...}
If you have such function, no other describe blocks will run. Btw. you can do similar thing with it => fit and there is also a "blacklist" version - x. So:

- fdescribe and fit causes only functions marked this way to run
- xdescribe and xit causes all but functions marked this way to run

https://stackoverflow.com/a/40683791/4982169
https://stackoverflow.com/a/64934822/4982169

```sh
$ ng test --include src/app/test-component/test-component.component.spec.ts
$ ng test --include projects/nfmb-utils/src/lib/validators.spec.ts --project nfmb-utils
$ ng test --include src/**/*.spec.ts
```

https://stackoverflow.com/a/63088940/4982169


## How to test my logic with a try catch block
force error and expect toThrow()

```ts
it('Transform ISO 8601 datetime to default format', () => {
  expect(() => pipe.transform('1994-12-01T14:32:02.135-02:00', 'zz1')).toThrow();
});
```

https://codecraft.tv/courses/angular/unit-testing/overview/

## Component testing scenarios

https://angular.io/guide/testing-components-scenarios

## Furthermore

https://angular.io/guide/testing-services