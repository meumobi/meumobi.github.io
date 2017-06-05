---
layout: post
title: Add entry to iOS .plist on Cordova Project 
categories: [Tips and tricks]
tags: [iOS, Cordova]
author:
  name: Victor Dias
  email: victor.dias@meumobi.com
  github: elbidone
  twitter: meumobi
  bio: Sharing mobile Experiences
  email_md5: 1cd012be2382e755aa763c66acc7cfa6
---

Today I've faced the challenge to update the iOS plist of my Cordova project. When you are a "Native" developer it should sounds stupid but when you use Cordova it's not straight forward.
![plist]({{ site.BASE_PATH }}/assets/media/xcode/plist.png)
So after few hours I've found two pretty nice and so different solutions:

- Cordova plugin
- Cordova hook 

# Create simple (very simple!) plugin

See an example [cordova-plugin-itunesfilesharing](https://github.com/christianjunk/cordova-plugin-itunesfilesharing) for enabling iTunes file sharing

[File sharing](https://www.raywenderlich.com/1948/itunes-tutorial-for-ios-how-to-integrate-itunes-file-sharing-with-your-ios-app) (UIFileSharingEnabled) allows an application to expose its Documents directory to the user through iTunes. The user can then move files back and forth between their devices and their computers.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<plugin xmlns="http://apache.org/cordova/ns/plugins/1.0"
        id="io.phasr.cordova.plugin.itunesfilesharing"
        version="0.0.1">

    <name>cordova-plugin-itunesfilesharing</name>
    <description>Cordova/PhoneGap plugin for enabling iTunes file sharing</description>
    <license>Apache 2.0 License</license>
    <platform name="ios">
        <config-file target="*-Info.plist" parent="UIFileSharingEnabled">
            <true/>
        </config-file>
    </platform>
</plugin>
```

Or set the value on build using [variable](https://cordova.apache.org/docs/en/latest/config_ref/#variable) on cli:


	<preference name="CALENDAR_USAGE_DESCRIPTION" default=" " />
    <config-file target="*-Info.plist" parent="NSCalendarsUsageDescription">
      <string>$CALENDAR_USAGE_DESCRIPTION</string>
    </config-file>

By this way you can dynamically set value when adding plugin:

`cordova plugin add cordova-plugin-calendar --variable CALENDAR_USAGE_DESCRIPTION="This app uses your calendar"`

Find [here](https://github.com/EddyVerbruggen/Calendar-PhoneGap-Plugin/commit/6dca5e49c15ce31c4d8e7a7a253d27b3103dc730) a good example of usage

See section [config-file](http://cordova.apache.org/docs/en/latest/plugin_ref/spec.html#config-file) of plugin.xml documentation for more details. And if you'd like to go further I recommend this good tutorial [PhoneGap Lab: Using Plugins End to End](http://phonegap.com/workshop-plugins/index.html).

# Use Cordova Hook and plist npm package

Here's a Node.js implementation of [Cordova Hook](http://cordova.apache.org/docs/en/latest/guide/appdev/hooks/) using the [plist](https://www.npmjs.com/package/plist) NPM package:

```javascript
var fs    = require('fs');     // nodejs.org/api/fs.html
var plist = require('plist');  // www.npmjs.com/package/plist

var FILEPATH = 'platforms/ios/.../...-Info.plist';

module.exports = function (context) {

    var xml = fs.readFileSync(FILEPATH, 'utf8');
    var obj = plist.parse(xml);

    obj.GDLibraryMode = 'GDEnterpriseSimulation';

    xml = plist.build(obj);
    fs.writeFileSync(FILEPATH, xml, { encoding: 'utf8' });

};
```

Choose a hook type, and then add the hook to your config.xml file:

```xml
<platform name="ios">
    <hook type="after_prepare" src="scripts/my-hook.js" />
</platform>
```

Source [http://stackoverflow.com/questions/22769111/add-entry-to-ios-plist-file-via-cordova-config-xml](http://stackoverflow.com/questions/22769111/add-entry-to-ios-plist-file-via-cordova-config-xml)