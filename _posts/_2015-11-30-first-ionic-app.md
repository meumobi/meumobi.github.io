> Ionic also automatically detects the device OS an app is running on and styles its UI elements to fit the look, feel, and design guidelines of that platform

Source: https://www.neumob.com/create-robust-hybrid-mobile-apps-qa-alex-muramoto-ionic

$ ionic start meuConference
******************************************************
 Dependency warning - for the CLI to run correctly,      
 it is highly suggested to install/upgrade the following:     

 Install ios-deploy to deploy iOS applications to devices. `npm install -g ios-deploy` (may require sudo)
 
$ sudo npm install -g ios-deploy --unsafe-perm
https://github.com/phonegap/ios-deploy/issues/186

******************************************************
Creating Ionic app in folder /Users/victor/Dvpt/PROJECTS/meuConference based on tabs project
Downloading: https://github.com/driftyco/ionic-app-base/archive/master.zip
[=============================]  100%  0.0s
Downloading: https://github.com/driftyco/ionic-starter-tabs/archive/master.zip
[=============================]  100%  0.0s
Updated the hooks directory to have execute permissions
Update Config.xml
Initializing cordova project
Adding in iOS application by default
Added ios platform

Your Ionic project is ready to go! Some quick tips:

 * cd into your project: $ cd meuConference

 * Setup this project to use Sass: ionic setup sass

 * Develop in the browser with live reload: ionic serve

 * Add a platform (ios or Android): ionic platform add ios [android]
   Note: iOS development requires OS X currently
   See the Android Platform Guide for full Android installation instructions:
   https://cordova.apache.org/docs/en/edge/guide_platforms_android_index.md.html

 * Build your app: ionic build <PLATFORM>

 * Simulate your app: ionic emulate <PLATFORM>

 * Run your app on a device: ionic run <PLATFORM>

 * Package an app using Ionic package service: ionic package <MODE> <PLATFORM>

For more help use ionic --help or ionic docs

Visit the Ionic docs: http://ionicframework.com/docs


Create an ionic.io account to send Push Notifications and use the Ionic View app?
(Y/n): Y
+---------------------------------------------------------+
+ New Ionic Updates for November 2015
+
+ The View App just landed. Preview your apps on any device
+ http://view.ionic.io
+
+ Invite anyone to preview and test your app
+ ionic share EMAIL
+
+ Generate splash screens and icons with ionic resource
+ http://ionicframework.com/blog/automating-icons-and-splash-screens/
+
+---------------------------------------------------------+
victors-MacBook-Pro:PROJECTS victor

$ sudo npm install -g ios-deploy --unsafe-perm

How to create a new meumobi Project form Ionic
Create Ionic Project
$ ionic start meuConference
$ cd meuConference/

Import Project on Gitub
$ git init
$ git add .
$ git commit -m "First commit"
$ git remote add origin https://github.com/meumobi/meuMagazine.git

Run Default Ionic App on Emulator
$ ionic platform add ios
$ ionic run ios
Run Default Ionic App on Browser
$ ionic serve

ConferenceTracker/$ git --work-tree=../tmp/ checkout -- www/

$ mv www src
$ mv scss src/scss

# Going further
- http://www.annertech.com/blog/create-news-reader-app-drupal-ionic-framework
- http://blog.pluralsight.com/ionic-framework-on-mac-and-windows
- http://docs.ionic.io/docs/io-quick-start