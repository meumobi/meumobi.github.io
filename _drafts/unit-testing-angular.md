
## Execute only one test spec
[ng test command](https://angular.io/cli/test) has an `--include` option where you can specify a directory of `*.spec.(ts|tsx)` files or just a single `.spec.(ts|tsx)` file itself.

## How to test my logic with a try catch block
force error and expect toThrow()

```ts
it('Transform ISO 8601 datetime to default format', () => {
  expect(() => pipe.transform('1994-12-01T14:32:02.135-02:00', 'zz1')).toThrow();
});
```

https://codecraft.tv/courses/angular/unit-testing/overview/