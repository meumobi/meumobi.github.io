# Shared libraries
## Models
### Create library
https://angular.io/guide/creating-libraries
$ $ ng g library helpers
CREATE projects/helpers/README.md (995 bytes)
CREATE projects/helpers/karma.conf.js (1023 bytes)
CREATE projects/helpers/ng-package.json (156 bytes)
CREATE projects/helpers/package.json (137 bytes)
CREATE projects/helpers/tsconfig.lib.json (549 bytes)
CREATE projects/helpers/tsconfig.spec.json (246 bytes)
CREATE projects/helpers/tslint.json (247 bytes)
CREATE projects/helpers/src/public-api.ts (159 bytes)
CREATE projects/helpers/src/test.ts (670 bytes)
CREATE projects/helpers/src/lib/helpers.module.ts (231 bytes)
CREATE projects/helpers/src/lib/helpers.component.spec.ts (635 bytes)
CREATE projects/helpers/src/lib/helpers.component.ts (259 bytes)
CREATE projects/helpers/src/lib/helpers.service.spec.ts (338 bytes)
CREATE projects/helpers/src/lib/helpers.service.ts (136 bytes)
UPDATE angular.json (8377 bytes)
UPDATE package.json (1962 bytes)
UPDATE tsconfig.json (1022 bytes)
npm WARN The package @angular/compiler is included as both a dev and production dependency.

audited 18006 packages in 18.736s
found 0 vulnerabilities


Update dist path on ng-package.json
"dest": "./dist",
### Create models
$ ng generate class item --type model --project models --skipTests
CREATE projects/models/src/lib/item.model.ts (22 bytes)

$ ng generate class profile --type model --project models --skipTests
CREATE projects/models/src/lib/profile.model.ts (25 bytes)

Delete useless files.
### Export
On public-api
export * from './lib/item.model';
export * from './lib/profile.model';

### Build
$ cd projects/models
$ ng build models
Notice that the builder (defined on angular.json), among other things, ensures that the library is always built with the AoT compiler, without the need to specify the --prod flag.

###Creating and publishing npm package
$ cd projects/models
projects/models$ npm init --scope=meumobi
entry point: (karma.conf.js) public-api.ts

Edit generated file after build with following informations

"name": "@meumobi/nfmb-data-modeling",
...
"repository": {
  "type" : "git",
  "url" : "https://github.com/meumobi/nfmb-web.git",
  "directory": "projects/models"
}

Re-build the library
$ cd ../..
$ ng build models

projects/models$ cd dist
projects/models/dist$ npm publish --access public
https://docs.npmjs.com/creating-and-publishing-scoped-public-packages

### Unpublishing or deprecating npm package

In order to permanently remove a package (or package version) from the npm registry, as a package owner or collaborator, you can [unpublish](https://docs.npmjs.com/unpublishing-packages-from-the-registry) it from the the command line within 72 hours of the initial publish.

`$ npm unpublish <package-name> -f`

After 72 hours have passed we’d recommend [deprecating](https://docs.npmjs.com/cli/deprecate) it:

`$ npm deprecate @meumobi/nfmb-data-modeling "Package no longer supported"`

### Typescript path mapping

      "@nfmb/data-modeling": [
        //"dist/models"
        "node_modules/@meumobi/nfmb-data-modeling"
      ],

Allow to switch easily between library for dev and published npm package, without updating imports on code.

###Install package
On root path of project
$ npm i --save @meumobi/nfmb-data-modeling

## Dependencies
WARNING: Distributing npm packages with 'dependencies' is not recommended. Please consider adding @meumobi/nfmb-data-modeling to 'peerDependencies' or remove it from 'dependencies'.

ERROR: Dependency @meumobi/nfmb-data-modeling must be explicitly whitelisted.
An unhandled exception occurred: Dependency @meumobi/nfmb-data-modeling must be explicitly whitelisted.
See "/private/var/folders/8m/2sjpyvx52ysfkc_jwx5sdxm80000gn/T/ng-GeO2qE/angular-errors.log" for further details.

ng-package.json
"whitelistedNonPeerDependencies": ["."],
  
https://github.com/ng-packagr/ng-packagr/blob/master/docs/dependencies.md
https://github.com/ng-packagr/ng-packagr/issues/716#issuecomment-435208978
https://blog.angularindepth.com/npm-peer-dependencies-f843f3ac4e7f

## Furthermore
- [Tomek Sułkowski: How to build a library for Angular apps?](https://medium.com/@tomsu/how-to-build-a-library-for-angular-apps-4f9b38b0ed11)

