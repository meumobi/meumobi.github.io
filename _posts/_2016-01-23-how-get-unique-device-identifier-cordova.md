---
layout: post
title: How to get unique device identifier with PhoneGap / Cordova
categories: [PhoneGap]
tags: [plugins, phonegap, cordova, uuid]
author:
  name: Victor Dias
  email: victor.dias@meumobi.com
  github: elbidone
  twitter: meumobi
  bio: Sharing mobile Experiences
  email_md5: 1cd012be2382e755aa763c66acc7cfa6
---
If your App needs an id of user's device, you should expect to use an unique id through your app lifestyle or device:

- unique id per application means it could change if app is remove and re-installed
- unique id per device means, no matter what occurs (re-install, update, OS upgrade) the id should remain the same. Something like a MAC address.

The common solution is to use the plugin cordova-plugin-device, but 

# Standard cordova-plugin-device: device.uuid
The standard [cordova-plugin-device] has the device.uuid method which .

See: https://github.com/apache/cordova-plugin-device#deviceuuid

Get the device's Universally Unique Identifier (UUID).

var string = device.uuid;

returns an unique identifier per application not per device which mean when user remove the app and install it again it generate another UUID
// iPhone: (Paraphrased from the UIDevice Class documentation)
//         Returns the [UIDevice identifierForVendor] UUID which is unique and the same for all apps installed by the same vendor. However the UUID can be different if the user deletes all apps from the vendor and then reinstalls it. Please see https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIDevice_Class/#//apple_ref/occ/instp/UIDevice/identifierForVendor

// Android: Returns a random 64-bit integer (as a string, again!)
//          The integer is generated on the device's first boot

What about App update ?

# UniqueDeviceID plugin 
https://github.com/Paldom/UniqueDeviceID

# MAC address
the mac address is just the simple way to do it. As you know the MAC address of any device can be spoofed especially if the device is rooted/jailbroken.

[cordova-plugin-device]: https://github.com/apache/cordova-plugin-device