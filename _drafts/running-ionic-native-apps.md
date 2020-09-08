## Create a project

```
$ ionic start demoApp blank --type=angular --cordova --package-id=com.meumobi.demoapp
$ cd ./mmb-demos.firebase-native-push-ionic
```

OBS: Android package name can't use dash (hyphen), and iOS not allows underscore.

## Run & deploy the application
### Prepare platform
```
$ ionic cordova prepare android
> cordova platform add android --save
...
> ng run app:ionic-cordova-build --platform=android
...
> cordova prepare android
...
```

- [cordova platform add](https://cordova.apache.org/docs/en/latest/reference/cordova-cli/#cordova-platform-command) install plugin and add them on package.json
- `ng run app:ionic-cordova-build` Generate ES5 bundles
- [cordova prepare](https://cordova.apache.org/docs/en/latest/reference/cordova-cli/#cordova-prepare-command) copy files into platform(s) for building, `google-services.json` for ex. is copied to `platforms/android/app/google-services.json``

You only need to run prepare platform the 1st time, for next builds only run app as described below.

### Run App
```
$ ionic cordova run android
> ng run app:ionic-cordova-build --platform=android
...
> cordova build android --device
...
> native-run android --app platforms/android/app/build/outputs/apk/debug/app-debug.apk --device
...
``

## Reset platform

```
$ ionic cordova platform rm android
> cordova platform remove android
Removing platform android from config.xml file...
Removing android from cordova.platforms array in package.json
$ rm -rf plugins/
```

## Update a cordova plugin
The config of the plugin is saved on package.json, if we want to update the config and re-install it then

$ cordova plugin rm cordova-plugin-firebasex --nosave
$ cordova prepare

The --nosave flag prevents deleting specified plugin from the package.json file.
[Plugins are automatically restored from package.json](https://cordova.apache.org/docs/en/latest/platform_plugin_versioning_ref/#restoring-plugins) and config.xml when executing the cordova prepare command.

## Generate resources
[WARN] cordova-res was not found on your PATH. Please install it globally:
       
       npm i -g cordova-res
       
[WARN] Cannot generate resources without cordova-res installed.
       
       Once installed, you can generate resources with the following command:
       
       ionic cordova resources android --force

## cordova config.xml vs package.json
The apps get version value from config.xml and not package.json

> Cordova 9.0.0 has decided to stop syncing the config.xml and package.json files now. So the package.json is the primary location for platform/plugin info

Source: https://stackoverflow.com/a/55752850/4982169

## Upgrade a Cordova plugin version
It is recommended to re-install plugin, means remove and install.

```
$ ionic cordova plugin remove cordova-plugin-firebasex
> cordova plugin remove cordova-plugin-firebasex
Uninstalling 2 dependent plugins.
Uninstalling cordova-plugin-androidx from android
Uninstalling cordova-plugin-androidx-adapter from android
Uninstalling cordova-plugin-firebasex from android
Subproject Path: CordovaLib
Subproject Path: app
Removing "cordova-plugin-firebasex"
Removing cordova-plugin-firebasex from package.json
$
$ ionic cordova plugin add cordova-plugin-firebasex@latest
> cordova plugin add cordova-plugin-firebasex@latest
Installing "cordova-plugin-firebasex" for android
Installing "cordova-plugin-androidx" for android
Installing "cordova-plugin-androidx-adapter" for android
Subproject Path: CordovaLib
Subproject Path: app
Adding cordova-plugin-firebasex to package.json
```

No need to add option `save` on cli, package.json is automatically updated.

## Live reload
$ ionic cordova run ios -l --address=0.0.0.0 --consolelogs
$ ionic cordova run android -l
> ng run app:ionic-cordova-serve --host=localhost --port=8100 --platform=android
> cordova build android --device
> native-run android --app platforms/android/app/build/outputs/apk/debug/app-debug.apk --device --forward 8100:8100

$ ionic cordova run android
> ng run app:ionic-cordova-build --platform=android
> cordova build android --device
> native-run android --app platforms/android/app/build/outputs/apk/debug/app-debug.apk --device

$ ionic cordova run ios
> ng run app:ionic-cordova-build --platform=ios
> cordova build ios --device
> $ native-run ios --app platforms/ios/build/device/mmb-demos.firebase-native-push-ionic4.ipa --device

$ ionic cordova platform remove android
> cordova platform remove android

$ rm -rf plugins/

$ adb devices -l
$ adb install -r platforms/android/build/outputs/apk/android-debug.apk
=============



$ ionic cordova prepare ios
> cordova platform add ios --save


Running command: pod install --verbose
Failed to install 'cordova-plugin-firebasex': Error: pod: Command failed with exit code 31

$ cd platforms/ios
$ rm Podfil.lock
$ vi Podfile (set all firebase same version)
$ cd ../..


https://ionicframework.com/docs/building/ios


$ ionic cordova platform rm ios
> cordova platform remove ios
Removing platform ios from config.xml file...
Removing ios from cordova.platforms array in package.json

$ rm -rf plugins/

$ ionic cordova plugin add cordova-plugin-firebasex --save
> cordova plugin add cordova-plugin-firebasex
Adding cordova-plugin-firebasex to package.json

$ ionic cordova platform add ios@5.1.1
> cordova platform add ios@5.1.1
Using cordova-fetch for cordova-ios@5.1.1
Adding ios project...
Creating Cordova project for the iOS platform:
	Path: platforms/ios
	Package: com.meumobi.infomobi2
	Name: infomobi
iOS project created with cordova-ios@5.1.1
Installing "cordova-plugin-firebasex" for ios
Installing "cordova-plugin-androidx" for ios
Installing "cordova-plugin-androidx-adapter" for ios


$ cordova plugin list 
cordova-plugin-androidx 1.0.2 "cordova-plugin-androidx"
cordova-plugin-androidx-adapter 1.1.0 "cordova-plugin-androidx-adapter"
cordova-plugin-device 2.0.3 "Device"
cordova-plugin-firebase-dynamiclinks 4.0.3 "FirebaseDynamicLinksPlugin"
cordova-plugin-firebasex 7.0.2 "Google Firebase Plugin"
cordova-plugin-ionic-keyboard 2.2.0 "cordova-plugin-ionic-keyboard"
cordova-plugin-ionic-webview 4.1.3 "cordova-plugin-ionic-webview"
cordova-plugin-splashscreen 5.0.3 "Splashscreen"
cordova-plugin-statusbar 2.4.3 "StatusBar"
cordova-plugin-whitelist 1.3.4 "Whitelist"
cordova-plugin-x-socialsharing 5.6.2 "SocialSharing"
es6-promise-plugin 4.2.2 "Promise"
ionic-plugin-deeplinks 1.0.20 "Ionic Deeplink Plugin"

pod repo update in platforms/ios? Then run pod install again

https://github.com/dpa99c/cordova-plugin-firebasex/issues/102#issuecomment-575157993

Out of date pods
https://github.com/dpa99c/cordova-plugin-firebasex#out-of-date-pods




$ ionic cordova plugin rm cordova-plugin-firebasex
> cordova plugin remove cordova-plugin-firebasex
Uninstalling 2 dependent plugins.
Uninstalling cordova-plugin-androidx from android
Uninstalling cordova-plugin-androidx-adapter from android
Uninstalling cordova-plugin-firebasex from android
Subproject Path: CordovaLib
Subproject Path: app
Uninstalling 2 dependent plugins.
Uninstalling cordova-plugin-androidx from ios
Uninstalling cordova-plugin-androidx-adapter from ios
Uninstalling cordova-plugin-firebasex from ios
Running command: pod install --verbose
Removing "cordova-plugin-firebasex"
Removing plugin cordova-plugin-firebasex from config.xml file...
Removing cordova-plugin-firebasex from package.json



-<ion-avatar tappable routerLink="/profiles/edit/{{ profile.id }}">
+https://cocoapods.org/
+$ sudo gem install cocoapods
+
+$ ionic cordova prepare ios
+> cordova platform add ios --save