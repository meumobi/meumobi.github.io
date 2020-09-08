https://github.com/angular/angular-cli/wiki/stories-rc.0-update#one-tsconfig-per-app

https://www.typescriptlang.org/docs/handbook/tsconfig-json.html

- `[PROJECT_PATH]/src/tsconfig.app.json`: configuration for the Angular app.
- `src/tsconfig.spec.json`: configuration for the unit tests.
- `e2e/tsconfig.e2e.json`: configuration for the e2e tests.
- an additional root-level `tsconfig.json` that is used for IDE integration.

On Ionic 4

[PROJECT_PATH]/
  tsconfig.app.json
  tsconfig.json
  tsconfig.spec.json
  e2e/
    tsconfig.json
  
All tsconfig inherit `[PROJECT_PATH]/tsconfig.json`
  
[PROJECT_PATH]/
  src/
    tsconfig.app.json
    tsconfig.spec.json
  tsconfig.json
  e2e/
    tsconfig.e2e.json

```bash
$ ng --version
Angular CLI: 9.0.6
$ ng new angular-tour-of-heroes
CREATE angular-tour-of-heroes/tsconfig.json (489 bytes)
CREATE angular-tour-of-heroes/tsconfig.app.json (210 bytes)
CREATE angular-tour-of-heroes/tsconfig.spec.json (270 bytes)
CREATE angular-tour-of-heroes/e2e/tsconfig.json (214 bytes)
...
$ cat e2e/tsconfig.json 
{
  "extends": "../tsconfig.json",
  "compilerOptions": {
    "outDir": "../out-tsc/e2e",
    "module": "commonjs",
    "target": "es5",
    "types": [
      "jasmine",
      "jasminewd2",
      "node"
    ]
  }
}
$ cat angular-tour-of-heroes/tsconfig.json 
{
  "compileOnSave": false,
  "compilerOptions": {
    "baseUrl": "./",
    ...
  }
}
```

```bash
$ ionic --version
6.5.0
$ ionic start myApp blank --type=angular --no-git --no-deps
$ ls -al myApp | grep tsconfig
-rw-r--r--   1 vdias  staff   210 Apr 10 18:03 tsconfig.app.json
-rw-r--r--   1 vdias  staff   546 Apr 10 18:03 tsconfig.json
-rw-r--r--   1 vdias  staff   295 Apr 10 18:03 tsconfig.spec.json
$ ls -al myApp/e2e/tsconfig.json 
-rw-r--r--  1 vdias  staff  214 Apr 10 18:03 myApp/e2e/tsconfig.json
$ cat myApp/tsconfig.json 
{
  "compileOnSave": false,
  "compilerOptions": {
    "baseUrl": "./",
    "outDir": "./dist/out-tsc",
...
}
$ cat myApp/tsconfig.app.json 
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/app",
    "types": []
  },
  "include": [
    "src/**/*.ts"
  ],
  "exclude": [
    "src/test.ts",
    "src/**/*.spec.ts"
  ]
}
```

> Another workaround you can apply @angular/cli without adding new files is to remove the "baseUrl" property from tsconfig.app.json and tsconfig.spec.json and add to the root tsconfig.json the property "baseUrl": "./src/", as they both extend it and refer to the same directory (tested with @angular/cli@1.4.4).

https://github.com/Microsoft/vscode/issues/24362#issuecomment-334934143


- compilation succeed but VSCode shows error
https://stackoverflow.com/questions/55214681/paths-is-not-working-in-tsconfig-app-json-as-expected
- whats's difference between tsconfig and tsconfig.app?
https://stackoverflow.com/questions/54898013/difference-between-tsconfig-json-and-tsconfig-app-json-files-in-angular
- https://stackoverflow.com/questions/50931904/how-to-resolve-alias-in-tsconfig-app-json-for-multiple-source-directories-in-web
- https://stackoverflow.com/questions/53173306/visual-studio-code-cant-resolve-angulars-tsconfig-paths