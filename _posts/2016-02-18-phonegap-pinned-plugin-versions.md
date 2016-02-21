---
layout: post
title: PhoneGap - Pinned Plugin Versions
categories: [PhoneGap]
tags: [plugins]
author:
  name: Victor Dias
  email: victor.dias@meumobi.com
  github: elbidone
  twitter: meumobi
  bio: Sharing mobile Experiences
  email_md5: 1cd012be2382e755aa763c66acc7cfa6
---
One of the biggest problem when you use a lot of PhoneGap plugins is to identify which version you need. And do it for each plugin is annoying,...**WAS** annoying, Cordova has recently introduced the notion of pinned plugin versions for [Core Cordova plugins](https://github.com/apache?utf8=%E2%9C%93&query=cordova-plugin) ([apache/cordova-lib@b704e78](https://github.com/apache/cordova-lib/commit/b704e7870a8a3af413fbf2db3e6f9d83d1677abd)). This specifies the **versions of plugins that a Cordova release has been tested with**.  

[Cordova 6.0.0 announcement](https://cordova.apache.org/news/2016/01/28/tools-release.html) highlight following feature:

> Added default plugin pinning to cordova. This means that `cordova plugin add cordova-plugin-camera` will fetch the pinned version of the plugin instead of the always grabbing the latest. Users can still install any version of a plugin via `cordova plugin add cordova-plugin-camera@VERSION`.

# Install pinned version
Let us check how it works with `cordova-plugin-splashscreen`. The [latest cordova-plugin-splashscreen](https://www.npmjs.com/package/cordova-plugin-splashscreen) version is 3.2.0 but pinned version for [cordova-lib 6.0.0](https://github.com/apache/cordova-lib/blob/4328a39276a2ded4bcf1dba7c33bfb9d8f35cfd2/cordova-lib/package.json) is 3.1.0.

![Cordova-lib 6.0.0 package.json]({{ site.BASE_PATH }}/assets/media/cordova-lib_package_json.png)

If we update it, `cordova add cordova-plugin-splashscreen`, Cordova installs the pinned version and not the latest one.

```bash
$ cordova platforms
Installed platforms: android 4.1.1, ios 3.9.2
Available platforms: amazon-fireos, blackberry10, browser, firefoxos, osx, webos
$ cordova --version
6.0.0
$ cordova platform update ios@4.0.0
Updating ios project...
...
$ sudo npm view cordova-plugin-splashscreen version
3.2.0
$ sudo cordova plugin list |grep cordova-plugin-splashscreen
cordova-plugin-splashscreen 2.1.0 "Splashscreen"
$ sudo cordova plugin add cordova-plugin-splashscreen
Fetching plugin "cordova-plugin-splashscreen@~3.1.0" via npm
$ sudo cordova plugin list |grep cordova-plugin-splashscreen
cordova-plugin-splashscreen 3.1.0 "Splashscreen"
```

You can decide to force Cordova to install the latest, I recommend for this case because of [cordova-plugin-splashscreen bugs FIX](https://github.com/apache/cordova-plugin-splashscreen/blob/master/RELEASENOTES.md).

# Install latest version
Of course you can continue to include the plugin's version number, appended after an @ character. The latest version is an alias for the most recent version. For example:

```bash
$ sudo cordova plugin list |grep cordova-plugin-splashscreen
cordova-plugin-splashscreen 3.1.0 "Splashscreen"
$ sudo cordova plugin add cordova-plugin-splashscreen@latest
Fetching plugin "cordova-plugin-splashscreen@latest" via npm
Plugin "cordova-plugin-splashscreen" already installed on android.
Plugin "cordova-plugin-splashscreen" already installed on ios.
...
$ sudo cordova plugin list |grep cordova-plugin-splashscreen
cordova-plugin-splashscreen 3.2.0 "Splashscreen"
```

# Update your config.xml
If you want to use only pinned version you should update your config.xml and remove all `spec` attributes. I've decided to use the version 3.2.0 of `cordova-plugin-splashscreen`.

```xml
	<plugin name="cordova-plugin-battery-status" />
	<plugin name="cordova-plugin-camera" />
	<plugin name="cordova-plugin-console" />
	<plugin name="cordova-plugin-contacts" />
	<plugin name="cordova-plugin-device" />
	<plugin name="cordova-plugin-device-motion" />
	<plugin name="cordova-plugin-dialogs" />
	<plugin name="cordova-plugin-file" />	
	<plugin name="cordova-plugin-file-transfer" />
	<plugin name="cordova-plugin-geolocation" />
	<plugin name="cordova-plugin-globalization" />
	<plugin name="cordova-plugin-inappbrowser" />
	<plugin name="cordova-plugin-insomnia" />
	<plugin name="cordova-plugin-media" />
	<plugin name="cordova-plugin-media-capture" />
	<plugin name="cordova-plugin-network-information" />
	<plugin name="cordova-plugin-splashscreen" spec="3.2.0"/>
	<plugin name="cordova-plugin-statusbar" />
	<plugin name="cordova-plugin-vibration" />
	<plugin name="cordova-plugin-whitelist" />
```

# Conclusion
So, as you can see the pinned version allows Cordova to automatically update the Core Cordova plugins when needed and guarantee a minimum of tests of compatibility. But you should continue to be aware with major and minor releases of plugins to be sure you don't need updates.

Unfortunatly there's no `cordova plugins check` or `cordova plugins outdated` as it exists for [npm outdated]({% post_url 2015-11-11-useful-npm-commands %}). It should help us to know which plugins have a new version.