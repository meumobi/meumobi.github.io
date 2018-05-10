---
layout: post
title: Managing Aliases and environment variables in Ionic v3... preparing Ionic v4
categories: [Ionic]
tags: [config]
author:
  name: Victor Dias
  email: victor.dias@meumobi.com
  github: elbidone
  twitter: meumobi
  bio: Sharing mobile Experiences
  email_md5: 1cd012be2382e755aa763c66acc7cfa6
---

[It was a trending topic](http://meumobi.github.io/ionic/2017/08/09/managing-environment-ionic.html) during long months on Ionic community. A lot of ways were explored and issues open to add it natively on Ionic framework. Finally the Ionic team decided to [migrate to angular-cli on v4](https://github.com/ionic-team/ionic-app-scripts/issues/762#issuecomment-351907363) and re-use the [angular-cli native solution to manage environment variables]((https://medium.com/beautiful-angular/angular-2-and-environment-variables-59c57ba643be)).

So, we wanted to have environment variables work in Ionic v3 exactly like how they do in Angular CLI, whilst also supporting Karma and Protractor tests. [more details](https://github.com/ionic-team/ionic-app-scripts/issues/762#issuecomment-367862651)


# Aliases vs relative paths

Aliases and environment variables are both handled by webpack. It's why we introduce them together.

The main purpose of aliases is instead of using relative paths when importing like so:

```
import Utility from '../../utilities/utility';
```

thanks to webpack [resolve.alias](https://webpack.js.org/configuration/resolve/#resolve-alias), you can use the alias:

```
import Utility from 'Utilities/utility';
```

# Configuring TypeScript

Open your `tsconfig.json` and add something like the following snippet to your `compilerOptions` object (this is obviously just a part of my own configuration, so YMMV):

```json
"moduleResolution": "node",
"baseUrl": "src",
"paths": {
  "@app/*": [ "app/*" ],
  "@assets/*": [ "assets/*" ],
  "@env": [ "environments/environment" ],
  "@pages/*": [ "pages/*" ],
  "@services/*": [ "services/*" ],
  "@tests/*": [ "./*" ],
  "@theme/*": [ "theme/*" ]
},
```

Here is what you need to know about it:

- The `moduleResolution` defaults to `classic` but nowadays we can safely use `node`
- the `baseUrl` is relative to the directory where your `tsconfig.json` resides
- you can only use one asterisk in the paths (nothing like the `somedir/**/*` we sometimes use somewhere else)
- you can even alias one single file, and not a directory (like I do in the api example)
Now you can rename your module paths in your `import`s using those aliases, run your build script and TypeScript won’t even blink.

Remember also to restart Visual Studio Code once you’ve finished with your `tsconfig.json`, or the Intellisence won’t find the modules.

Source: [How to use module path aliases in Visual Studio Code, TypeScript](https://medium.com/@caludio/how-to-use-module-path-aliases-in-visual-studio-typescript-and-javascript-e7851df8eeaa)

# Custom Webpack configuration for Ionic
Ionic uses Webpack, and we can specify our own Webpack configuration file. But if we do, the next time we update `@ionic/app-scripts` Ionic might stop working because we are missing some new configuration detail.

Instead we keep the official configuration, and expand it.

Add the following block to your `/package.json`:

```json
"config": {
    "ionic_webpack": "./config/webpack.config.js"
},
```

Create `/config/webpack.config.js` and paste this code in it:

```js
const chalk = require("chalk");
const fs = require('fs');
const path = require('path');
const useDefaultConfig = require('@ionic/app-scripts/config/webpack.config.js');

/*
  If needed could get env from cli argument
  const env = require('minimist')(process.argv.slice(2)).env || process.env.IONIC_ENV || 'dev';
*/

const env = process.env.IONIC_ENV || 'dev';

console.log(chalk.yellow.bgBlack('\nUsing ' + env + ' environment variables.\n'));

useDefaultConfig[env].resolve.alias = {
  "@app": path.resolve('./src/app/'),
  "@assets": path.resolve('./src/assets/'),
  "@env": path.resolve(environmentPath()),
  "@pages": path.resolve('./src/pages/'),
  "@services": path.resolve('./src/services/'),
  "@tests": path.resolve('./src/'),    
  "@theme": path.resolve('./src/theme/')
};

function environmentPath() {

  let filePath = './src/environments/environment.' + env + '.ts';

  if (!fs.existsSync(filePath)) {
    console.log(chalk.red('\n' + filePath + ' does not exist!'));
  } else {
    return filePath;
  }
}

module.exports = function () {
  return useDefaultConfig;
};
```

Create default env config `src/environments/environment.ts`, and dev, prod config, resp. `src/environments/environment.dev.ts` and `src/environments/environment.prod.ts`:

```
export const ENV = {
  production: true,
  isDebugMode: false
};
```

Import your environment variables wherever you need:

```js
import { ENV } from '@env'
```

Note: Remember to ignore your environment files in your `.gitignore`

```
# Environment Variables
./src/environments/*
!./src/environments/environment.ts
```