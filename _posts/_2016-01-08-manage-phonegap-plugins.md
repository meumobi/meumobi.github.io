---
layout: post
title: Manage PhoneGap / Cordova Plugins
categories: [PhoneGap]
tags: [plugins, phonegap, cordova]
author:
  name: Victor Dias
  email: victor.dias@meumobi.com
  github: elbidone
  twitter: meumobi
  bio: Sharing mobile Experiences
  email_md5: 1cd012be2382e755aa763c66acc7cfa6
---



# Fetch and Install Plugins

On build, phonegap check the config.xml, fetch and install required plugins.
If you update the config.xml to change a version of plugin, you should update it manually.
I recommend to read a great post published by Raymond Camden about [platform and plugin updates in your Cordova Project](http://www.raymondcamden.com/2015/11/04/checking-for-platform-and-plugin-updates-in-your-cordova-project)

# how you can check your platforms and plugins for updates
Type cordova platforms to get a list of installed and available platforms. 

```bash
$ cordova platforms
Installed platforms: 
Available platforms: amazon-fireos, android, blackberry10, browser, firefoxos, ios, webos
```

# Save already installed Cordova plugins to config.xml

```bash
$ cordova plugin save
```
This will save all previously installed plugins into your project’s config.xml.

## Add, Remove and Fetch Plugin
### Edit config.xml and 'platform update' command

Add new plugin on config.xml and update platform

```xml
<plugin name="cordova-plugin-file" spec="~3.0.0" />
```

```bash
$ phonegap platform update ios
```

### Install with 'plugin add' command

$ phonegap plugin list
cordova-plugin-file 3.0.0 "File"
cordova-plugin-whitelist 1.2.0 "Whitelist"

$ phonegap plugin add cordova-plugin-x-toast@latest --save
Fetching plugin "cordova-plugin-x-toast@latest" via npm

Installing "cordova-plugin-x-toast" for ios

Saved plugin info for "cordova-plugin-x-toast" to config.xml


$ phonegap plugin list
cordova-plugin-file 3.0.0 "File"
cordova-plugin-whitelist 1.2.0 "Whitelist"
cordova-plugin-x-toast 2.2.3 "Toast"

$

### Uninstall with 'plugin remove' command
$ phonegap plugin remove cordova-plugin-x-toast --save
Uninstalling cordova-plugin-x-toast from ios

Removing "cordova-plugin-x-toast"

config.xml entry for cordova-plugin-x-toast is removed

victors-MacBook-Pro:HelloWorld victor$

TODO: Using --save flag results in Saving ios@^3.8.0 into config.xml file.

# git-backed public plugins on PhoneGap Build
http://phonegap.com/blog/2016/02/16/git-plugins/

# Unable to update plugin because of dependency 
Scripts based on processing the list of installed plugins may not work as there are dependencies between installed plugins (e,g, cordova-plugin-file and cordova-plugin-file-transfer).

In the example, the script will find the file plugin first, then it will try to remove it and we'll get an error as file-transfer requires it. Therefore, we shall have

You don't need remove, just add again.

$ sudo cordova plugin rm cordova-plugin-file 
Error: The plugin 'cordova-plugin-file' is required by (cordova-plugin-file-transfer, cordova-plugin-media-capture, cordova-plugin-media, cordova-open), skipping uninstallation.

cordova plugin add https://github.com/apache/cordova-plugin-camera

# Hacks to update plugins
A quick hack to update all the Cordova plugins used in a Cordova project (unix shell required):
http://nocurve.com/cordova-update-all-plugins-in-project/

A CLI tool to check for updates / manage updating plugins in Cordova/Phonegap projects.
https://github.com/dpa99c/cordova-check-plugins


# Going further
http://www.raymondcamden.com/2015/11/04/checking-for-platform-and-plugin-updates-in-your-cordova-project

Pinned Platform and Plugin Versions
https://cordova.apache.org/news/2016/01/28/tools-release.html

> Cordova has recently introduced the notion of pinned plugin versions for core plugins ([apache/cordova-lib@b704e78](https://github.com/apache/cordova-lib/commit/b704e7870a8a3af413fbf2db3e6f9d83d1677abd)). This specifies the versions of plugins that a Cordova release has been tested with. 