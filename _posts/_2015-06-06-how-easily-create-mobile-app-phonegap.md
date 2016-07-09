---
layout: post
title: How to easily create mobile App with PhoneGap
categories: [PhoneGap]
tags: [simulator, Hybrid App, phonegap, cordova]
author:
  name: Victor Dias
  email: victor.dias@meumobi.com
  github: elbidone
  twitter: meumobi
  bio: Sharing mobile Experiences
  email_md5: 1cd012be2382e755aa763c66acc7cfa6
---

[PhoneGap] is an open source solution for building cross-platform mobile apps with standards-based Web technologies like HTML, JavaScript, CSS.  

**What's an hybrid-app?**  
Each mobile platform has an API to invoke a *web view*, which is basically a browser you use within a native app. Hybrid apps run within the context of these web view APIs. PhoneGap is the most popular framework to develop Hybrid-app.  

**Why would you use PhoneGap versus going native?**  
One of the biggest benefits of using an hybrid-app is that the **same code can be deployed on different platforms**. A PhoneGap app can be built without any native code (Java, Objective-C, etc). Instead, web technologies are used, and they are hosted in the app itself locally. Native resources, like Push Notification, Contacts and Calendar integration are available through Plugins.  
This is perfect for small teams since there is only one code base to be maintained. If we went native we would have to manage two code bases, iOS and Android. That means every bug fix, every feature added, every change would have to be done twice.
![phonegap-factory]({{ site.BASE_PATH }}/assets/media/phonegap-factory.png)

Also, **since the amount of code is reduced, development time can be reduced in comparison to the time it would take writing two or more native apps**. Not to mention that if the application is to be deployed on both Android and iOS, the team will not have to know both Objective-C and Java.  
You also get the added benefit of being able to **share some of the code with the application’s web site**.

But, of course all is not perfect on PhoneGap world and after reading [Pros](http://davidrs.com/wp/should-you-build-phonegap-or-native/) you need to know [Cons](http://roadfiresoftware.com/2014/04/when-to-use-phonegap-versus-developing-a-native-ios-app/).  
My point of view is it depends on your skills and objectives. Hybrid web apps are notoriously associated with performance problems, and it’s not without reason. But during last year a lot improvements have been made to reduce these issues, [fastclick](http://palomoduarte.com/blog/2013/08/10/apply-fast-click-for-ios-to-your-website.html) and [WKWebView](http://developer.telerik.com/featured/why-ios-8s-wkwebview-is-a-big-deal-for-hybrid-development/) contribute to improve time response and consequently the UX. But not all Apps are "performance sensitive", and it exists a lot of tips and tricks to reduce performance issues
**If you already use web technologies (HTML, JavaScript, CSS) and want to develop a mobile App, I recommend to spend few hours to try PhoneGap and decide after running your first App.**

**What's the difference between [Apache Cordova] and [PhoneGap] ?**  
If you pretend working with PhoneGap you'll always read about Cordova, then you need to understand the relation between both packages:

> PhoneGap is a distribution of [Apache Cordova]. You can think of Apache Cordova as the engine that powers PhoneGap, similar to how WebKit is the engine that powers Chrome or Safari.

Source: [difference between Apache Cordova and PhoneGap?](http://phonegap.com/2012/03/19/phonegap-cordova-and-what%E2%80%99s-in-a-name/)

PhoneGap provides a powerfull Command Line Interface to manage App Projects, the majority of commands are aliases to cordova ones. Check this post if you are interested on [deep details about the PhoneGap Story](http://blog.devgeeks.org/post/73789983750/cordova-vs-phonegap-an-update).

**Why PhoneGap as cross-platform tool ?**  
While evaluating the potential solutions for creating cross-platform mobile apps, majority of developers prefer to use PhoneGap due to its advanced features and advantages:

- Large (and growing) community
- Thriving plugin ecosystem
- Complete Development Environment

# Installing PhoneGap

## Common Requirements
Ok, then now you are convinced to create your first PhoneGap App we'll see how to setup the required environment.  
PhoneGap command-line tool is distributed as an npm package in a ready-to-use format. It is not necessary to compile it from source. You should have npm and git installed in your machine to follow this tutorial:

- [Node.js] - Following installation, you should be able to invoke node and npm on your command line.
- [git] - used in the background by the CLI to download assets. It comes pre-installed on some operating systems, to see if you already have it installed, type git from the command line.

Before running any command-line tools, you need to install SDKs for each platform you wish to target.  
To add support or rebuild a project for any platform, you need to run the command-line interface from the same machine that supports the platform's SDK. On this tutorial we'll focus only on iOS and Android. The CLI supports the following combinations:

- iOS (Mac)
- Android (Mac, Linux, Windows)

## iOS Requirements
To install apps onto a device, you must also be a member of Apple's [iOS Developer Program](https://developer.apple.com/programs/), which costs $99 per year. This guide shows how to deploy apps to the iOS emulator, for which you don't need to register with the developer program.

Download [Xcode from the App Store](https://itunes.apple.com/us/app/xcode/id497799835?mt=12), available by searching for "Xcode" in the App Store application.

## Android Requirements
Download [android SDK].

$ javac -version

## Install Steps
Packages can be installed in command line mode.

```sh
$ sudo npm install -g phonegap
```
*[Prefix command by sudo](https://docs.npmjs.com/getting-started/fixing-npm-permissions) only if necessary.*  

Test to ensure the PhoneGap CLI is properly installed by typing phonegap on the command line. You should see the help text output displayed.

```bash
$ phonegap version
5.3.8
```

# Create the App
Go to the directory where you maintain your source code, and run [create command](http://docs.phonegap.com/references/phonegap-cli/create/) such as the following:

```bash
$ phonegap create Employee
Creating a new cordova project.
$ cd Employee
```
The argument "Employee" specifies a directory to be generated for your project. This directory should not already exists, PhoneGap will create it for you.

Use help option on command line if needed, for example:

```
phonegap help             Displays the full help text
phonegap help <command>   Displays help text for a specific command
```
# Serve the App
The [serve command](http://docs.phonegap.com/references/phonegap-cli/serve/) is used to start up a local web server to host the application for the PhoneGap 
Developer app (or any browser) to consume.

```bash
$ phonegap serve
[phonegap] starting app server...
[phonegap] listening on 192.168.0.5:3000
[phonegap] 
[phonegap] ctrl-c to stop the server
[phonegap]
```

# Directory Structure

## Basic Resources
All PhoneGap Projects follow same directory structure, as created with `phonegap create` command:

```bash
$ ls 
config.xml	hooks		platforms	plugins		www
```

## www/ folder
You can consider this folder as the webapp of your App. This folder is loaded by App and run the index.html as a browser do. So, if you want to update the app you should update www files as you should do for a Web project.

You can try updating index.html and observe updates on browser through `phonegap serve`.

# Add Platforms
Then now your environment is up, you've created the PhoneGap project and tested it on browser, it's time to create the App package to install on supported devices. You'll need to build an App for each targeted platform, for example for ios:

```bash
$ phonegap platform add ios
Adding ios project...

Running command: /Users/victor/.cordova/lib/npm_cache/cordova-ios/3.9.2/package/bin/create /Users/victor/Dvpt/PROJECTS/HelloWorld/platforms/ios com.phonegap.helloworld "Hello World" --cli

iOS project created with cordova-ios@3.9.2

Discovered plugin "cordova-plugin-whitelist" in config.xml. Installing to the project

Fetching plugin "cordova-plugin-whitelist@1" via npm

Installing "cordova-plugin-whitelist" for ios


This plugin is only applicable for versions of cordova-android greater than 4.0. If you have a previous platform version, you do *not* need this plugin since the whitelist will be built in.

$
```

You can obtain list of available platforms with following command:

```bash
$ phonegap platform ls
Installed platforms: ios 3.9.2
Available platforms: amazon-fireos, android, blackberry10, browser, firefoxos, osx, webos
```

## Known Issue
If it returns 
```
Failed to fetch platform ios
Probably this is either a connection problem, or platform spec is incorrect.
```
Try this

```bash
rm -rf ~/.cordova
```
Source: [Add platform ios failed for cordova-ios@3.9.2](https://forum.ionicframework.com/t/add-platform-ios-failed-for-cordova-ios-3-9-2/36164/9)
# Build the App and launch on Simulator

## iOS App

```sh
$ phonegap run ios --verbose --devicetype iPhone-6
```

[ios-sim](https://github.com/phonegap/ios-sim) 
The ios-sim tool is a command-line utility that launches an iOS application on the iOS Simulator. This allows for niceties such as automated testing without having to open Xcode.
allows to choose the devicetype to emulate. To list devicetypes run the showdevicetypes command or list-emulator-images, both return same result

```sh
$ ios-sim showdevicetypes
$ ios-sim launch --devicetypeid iPhone-6 platforms/ios/build/emulator/InfoMobi.app
...

$ ./platforms/ios/cordova/lib/list-emulator-images 
iPhone-4s, 9.1
iPhone-5, 9.1
iPhone-5s, 9.1
iPhone-6, 9.1
iPhone-6-Plus, 9.1
iPhone-6s, 9.1
iPhone-6s-Plus, 9.1
iPad-2, 9.1
iPad-Retina, 9.1
iPad-Air, 9.1
iPad-Air-2, 9.1
iPad-Pro, 9.1
Apple-TV-1080p, tvOS 9.0
Apple-Watch-38mm, watchOS 2.0
Apple-Watch-42mm, watchOS 2.0
```

```
$ cat platforms/ios/cordova/lib/run.js |more
...
    // validate target device for ios-sim
    // Valid values for "--target" (case sensitive):
    var validTargets = ['iPhone-4s', 'iPhone-5', 'iPhone-5s', 'iPhone-6-Plus', 'iPhone-6',
        'iPad-2', 'iPad-Retina', 'iPad-Air', 'Resizable-iPhone', 'Resizable-iPad'];
...
$ phonegap run ios --emulator --target="iPad-Retina" --verbose

http://www.raymondcamden.com/2014/07/21/Targetting-a-device-type-with-Cordova-Emulate

Et voila!!
![helloworld-simulator]({{ site.BASE_PATH }}/assets/media/helloworld-simulator.png)

## Android

```sh
$ ./platforms/android/cordova/lib/list-emulator-images
```

# Deploy specified app package to connected device

$ ./platforms/ios/cordova/lib/list-devices

# Command line tools to help deploy your Cordova application to your users.
https://github.com/jbavari/cordova-deploy
http://hockeyapp.net/pricing/

how to do it with ContentSync and meumobi Apps

https://github.com/danwilson/google-analytics-plugin/issues/123

## Cordova iOS
Cordova iOS is an iOS application library that allows for Cordova-based projects to be built for the iOS Platform.

## Cordova Android
Cordova Android is an Android application library that allows for Cordova-based projects to be built for the Android Platform.

## Cordova cli
Pinned Platform and Plugin Versions
https://cordova.apache.org/news/2016/01/28/tools-release.html

> Cordova has recently introduced the notion of pinned plugin versions for core plugins ([apache/cordova-lib@b704e78](https://github.com/apache/cordova-lib/commit/b704e7870a8a3af413fbf2db3e6f9d83d1677abd)). This specifies the versions of plugins that a Cordova release has been tested with. 

# Going further
- http://code.tutsplus.com/tutorials/an-introduction-to-cordova-example--cms-25328
- http://code.tutsplus.com/tutorials/an-introduction-to-cordova-basics--cms-25146
- https://ccoenraets.github.io/cordova-tutorial/create-cordova-project.html
- http://readwrite.com/2015/02/27/native-vs-web-apps-ceasefire

Create PhoneGap App
https://www.jetbrains.com/webstorm/help/using-phonegap-cordova.html
http://cordova.apache.org/docs/en/5.0.0/guide_cli_index.md.html#The%20Command-Line%20Interface
http://docs.phonegap.com/getting-started/2-install-mobile-app

Debug PhoneGap App
http://www.tricedesigns.com/2013/01/18/my-workflow-for-developing-phonegap-applications/
http://wildermuth.com/2013/4/30/Debugging_PhoneGap_with_the_Android_Console

Debug tools: chrome://inspect/#devices

# Build Android
cordova platform add android

cordova platform remove android 
then
cordova platform add android

## check if cordova finds all the requirements
`$ platforms/android/cordova/check_reqs`

cordova platform build android

/!\ See http://cordova.apache.org/announcements/2015/12/08/cordova-ios-4.0.0.html
install ios-sim and ios-deploy
Check http://devgirl.org/2014/11/07/cordovaphonegap-version-confusion/
https://unbot.wordpress.com/2016/02/01/how-cordova-and-phonegap-releases-work/


There are known stability issues in [Android Studio](http://developer.android.com/intl/pt-br/sdk/installing/index.html?pkg=tools) on Mac when using JDK 1.8. Until these issues are resolved, you can improve stability by downgrading your JDK to an older version (but no lower than JDK 1.6).

[How do I uninstall Java (7.0, 8.0) on my Mac?](http://www.java.com/en/download/help/mac_uninstall_java.xml)

```bash
sudo rm -fr /Library/Internet\ Plug-Ins/JavaAppletPlugin.plugin 
sudo rm -fr /Library/PreferencePanes/JavaControlPanel.prefpane
```



[Node.js]: http://nodejs.org
[ios-sim]: https://github.com/phonegap/ios-sim#installation
[git]: http://git-scm.com
[android SDK]: http://developer.android.com/sdk/installing/index.html?pkg=tools
[PhoneGap]: http://phonegap.com
[Apache Cordova]: http://cordova.apache.org
[Ionic]: http://ionicframework.com