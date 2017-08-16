---
layout: post
title: Managing environment variables in Ionic
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

Developing Ionic 2.x Apps you certainly face the need to use an external configuration file, and/or several files for different configuration values for different environments. For example, different backend API URLs for development and production. It's a common topic on Ionic and Angular forums: 

- [What is best way to load json settings from the server? (angular issue)](https://github.com/angular/angular/issues/9047)
- [Configuration file](https://forum.ionicframework.com/t/configuration-file/46275)
- [Passing Initialization Data to Angular 2 (stackoverflow)](https://stackoverflow.com/questions/42379540/passing-initialization-data-to-angular-2/42409679#42409679)
- [Reading data before application startup in Angular](https://gist.github.com/fernandohu/122e88c3bcd210bbe41c608c36306db9)
- [Managing environment variables in Ionic 2](https://medium.com/@hin556/managing-environment-variables-in-ionic-2-43506f49acfb)

# Reading configuration files before the application starts
The best pratice we've found use the Angular const [APP_INITIALIZER](https://angular.io/api/core/APP_INITIALIZER) to read configuration files before App start. Our approach is inspired by [Reading data before application startup in Angular 2](https://gist.github.com/fernandohu/122e88c3bcd210bbe41c608c36306db9):

- Create env and config files
- Create ./src/app/config/app.config.ts to load files
- Update app.module.ts, use APP_INITIALIZER to call init function
- Create or update copy.config.js in your ./config dir
- Edit package.json to overwrite ionic_copy
- Call config in any Angular2 class

## Config files

- Create env file `./src/app/config/env.json` setting `env` key.

```json
{
    "env": "development"
}
```

- Create config file `./src/app/config/config.<ENV>.json` (ie. /config.development.json)

```json
{
    "api": {
        "host": "localhost"
    }
}
```

## Service to load config

`./src/app/config/app.config.ts`

{% gist elbidone/bf0b949b162e7b721f5a6a2f9f07a37c app.config.ts %}

## Update app.module.ts

Open your existing module and add the following two lines to your list of providers an initConfig function.

{% gist elbidone/bf0b949b162e7b721f5a6a2f9f07a37c app.module.ts %}

## Copy config files to build dir

If you previously have copied the default `@ionic/app-scripts/config/copy.config.js` from Ionic update it, adding `copyEnvConfig` key/value (see below), else copy it to `./config/copy.config.js`.

{% highlight javacript %}
module.exports = {

...

    copyEnvConfig: {
        src: ['{{SRC}}/app/config/**/*.json'],
        dest: '{{WWW}}/app/config'
    }
}
{% endhighlight %}

## Edit package.json to overwrite ionic_copy

And edit the package.json to consider your own copy script instead of ionic one. 

{% highlight json %}

{
	"name": "my-app",
	"version": "0.0.1",
	...
	
	"config": {
		"ionic_copy": "./config/copy.config.js"
	},
	
	...
}
{% endhighlight %}

## In Any Angular2 class

And finally to get config values on any Angular class, import `app.config.ts` and enjoy it!

``` typescript
import { AppConfig } from '../../app/config/app.config';

export class NewsPage {

    constructor(private config: AppConfig) {}
    
    myMethodToGetHost() {
        // will print 'localhost'
        let host:string = config.get('api.host');
    }
    
    myMethodToGetCurrentEnv() {
        // will print 'development'
        let env: string = config.getEnv('env');
    }
}
```

# Furthermore

If you prefer a smaller and straight forward solution I recommend this [solution](https://stackoverflow.com/a/39577841/4982169). Less job for smaller project.

Another solid way use [Webpack’s built in EnvironmentPlugin](https://webpack.js.org/plugins/environment-plugin/) to expose Ionic’s IONIC_ENV environment variable to our code, see roblouie post [here](http://roblouie.com/article/296/ionic-2-environment-variables-the-best-way/). By this way the env vars are loaded on build, different of loading them on App start.