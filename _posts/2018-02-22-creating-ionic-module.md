---
layout: post
title: Creating a Ionic Module and sharing through NPM
categories: [Ionic]
tags: [tutorial,ionic,npm]
author:
  name: Daniel Antonio Conte
  email: danconte72@gmail.com
  github: danconte72
  twitter: danielconte
  bio: Life, Universe, Everything
  email_md5: 8200df29874231d4d8c2c7beae170b31
---
![Ionic logo]({{ site.BASE_PATH}}/assets/media/ionic/ionic.jpg)

Sometimes you found yourself writing same code to solve same problems. To avoid this situation a lot o frameworks allow to produce independent and re-usable modules. And ionic allows too.
So let's do it.

I did a FilesProvider to manipulate files in an app and now we will start a simple module to share this service between all our ionic apps.

# To-do
- Copy Ionic Module Template;
- Overwrite template files with our code;
- Setup npm config files and dependencies;
- Publish our module on npm;

## Copying Template
The easyest way is just clone the git repository.
```bash
$ git clone https://github.com/ionic-team/ionic-module-template.git ionic-meumobi-utils
```

![Ionic Module Structure]({{ site.BASE_PATH}}/assets/media/ionic/module-folder1.png)

## Coding
I already have my code done from another project so now is just copy and paste.
For this project I only used a provider, but you can use to share components too.
![Ionic Module Structure Updated]({{ site.BASE_PATH}}/assets/media/ionic/module-folder2.png)

### Show me the code
**src/index.ts**
```typescript
export * from './ionic-meumobi-utils.module';
export * from './providers/files';
```
**src/ionic-meumobi-utils.module.ts.ts**
```typescript
import { Observable } from 'rxjs';
import { NgModule, ModuleWithProviders } from '@angular/core';
//My Components/Providers
import { FilesProvider } from './providers/files';
@NgModule({
  declarations: [ 
      //Here you need to add your components if you want  
  ],
  exports: [    
      //Here you put all components released to devs
  ]
})
export class IonicMeumobiUtils {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: IonicMeumobiUtils, 
      providers: [ FilesProvider ], //providers ;)
    };
  }
}
```
Inside src folder you can work as a src folder in a regular ionic project.  
My tip: Just follow the pattern and you will be fine.

## Setup
- For each module you project it depends. Run:
```bash
$ npm install --save <module-name>[@version]
```
- Update README.md file (explaining how to use your library);
- Update this fields on **package.json**
```json
{
  "name": "ionic-meumobi-utils", //name
  "version": "0.0.6", //version
  "description": "A package to share generic modules between ionic apps", //this too
  "main": "./dist/index.js",
  "typings": "./dist/index.d.ts",
  "files": [
    "dist"
  ], //put into brackets 
  "scripts": {
    "ngc": "ngc",
    "build": "rm -rf aot dist && npm run ngc",
    "publishPackage": "npm run build && npm publish"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/meumobi/ionic-meumobi-utils.git" //where the project is available
  },
  "keywords": ["ionic", "files", "angular2"], //to index your library
  "author": "meumobi.com",
  "license": "MIT", //license 
  "bugs": {
    "url": "https://github.com/meumobi/ionic-meumobi-utils/issues" //to report bugs
  },
  "homepage": "https://github.com/meumobi/ionic-meumobi-utils#readme", //your readme file
  "devDependencies": {
    ... //updated by npm install --save
  },
  "dependencies": {
    ... //updated by npm install --save
  }
}
```
- Create a **npm** account [here](https://www.npmjs.com/signup);

## Deploy
```bash
$ npm login
$ npm run build
$ npm publish
```
You can build for one version a lot of times, but each version can be published only one time.

To use your module in another project. 
```bash
$ npm install <my-module-name>
```
```typescript
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

// Import your module
import { MyModule } from 'ionic-module-template';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    MyModule // Put your module here
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: []
})
export class AppModule {}
```


# Furthermore
- [How to create a angular library](http://www.dzurico.com/how-to-create-an-angular-library/);
- [Ionic Module Template](https://github.com/ionic-team/ionic-module-template);
- [Ionic MeuMobi Utils on npm](https://www.npmjs.com/package/ionic-meumobi-utils);
- [How to Publish a Custom Ionic Module With NPM](https://devdactic.com/custom-ionic-module-npm/)







