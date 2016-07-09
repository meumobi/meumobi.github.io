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

# What is Push

# PushWoosh Service

# How to add PushWoosh Plugin to your PhoneGap App


# Conditional Dependency Injection with AngularJS
http://phonegap-tips.com/articles/conditional-dependency-injection-with-angularjs.html

[cordova-plugin-device]: https://www.npmjs.com/package/cordova-plugin-device
This plugin defines a global device object, which describes the device's hardware and software. Although the object is in the global scope, it is **not available until after the deviceready event**.

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
		var string = device.platform;
		console.log(device.platform);
}


Base of Impl: http://jsfiddle.net/chico1198/uxjvsafq/11/

# Deep-link
If App is open on foreground
[phonegap] [console.log] { vib: '0',
  title: 'Teste Push 2',
  pri: '',
  collapse_key: 'do_not_collapse',
  pw_msg: '1',
  p: '6v',
  onStart: false,
  foreground: true }

If App is open on background, I click on notification
[phonegap] [console.log] { pri: '',
  title: 'Teste Push 2',
  vib: '0',
  collapse_key: 'do_not_collapse',
  pw_msg: '1',
  p: '6g',
  onStart: true,
  foreground: false }

If App is closed, I click on notification
[phonegap] [console.log] { pri: '',
  title: 'Teste Push 2',
  vib: '0',
  collapse_key: 'do_not_collapse',
  pw_msg: '1',
  p: '6t',
  onStart: true,
  foreground: false }

[phonegap] [console.log] { title: 'lorem ipsum, lorem ipsum, lorem ipsum, lorem ipsum, lorem ipsum, lorem ipsum, lorem ipsum, lorem ipsum, lorem ipsum, lorem ipsum, lorem ipsum, lorem ipsum, lorem ipsum, lorem ipsum, lorem ipsum, lorem ipsum, lorem ipsum,',
  pri: '0',
  userdata: { category_id: 40, item_id: 390080 },
  u: '{"category_id":40,"item_id":390080}',
  vib: '0',
  collapse_key: 'do_not_collapse',
  b: 'http://comunique-se.meumobilesite.com/uploads/items/6886091.png',
  pw_msg: '1',
  p: '6p',
  ci: 'http://comunique-se.meumobilesite.com/uploads/site_apple_touch_icon/6886051.png',
  onStart: false,
  pw_badges: '0',
  foreground: true }

==== iOS
[phonegap] [console.log] { aps: { sound: 'default', alert: 'oi' },
  p: '73',
  onStart: false }
	
[phonegap] [console.log] { aps: { sound: 'default', alert: 'oi' },
  p: '74',
  onStart: true }
	
			pushNotification.getLaunchNotification(function(payload) {
				$log.info(payload);
			})
			
			EQUIV.
			
			document.addEventListener('push-notification', function(event) {
				var notification = event.notification;

				$log.info(notification);

			});

# Devices limit
http://docs.pushwoosh.com/docs/createmessage
"devices":[                  // Optional. Not more than 1000 tokens in an array. If set, message will only be delivered to the devices in the list. Ignored if the applications group is used. Only lower case for iOS
               "dec301908b9ba8df85e57a58e40f96f523f4c2068674f5fe2ba25cdc250a2a41"
            ],

# Android custom icon, badge and banner
"android_custom_icon": "http://example.com/image.png", // Optional. Full path URL to the image file
            "android_banner": "http://example.com/banner.png", // Optional. Full path URL to the image file
            "android_badges":

# Going further
- http://www.rahuljiresal.com/2014/02/ios-push-notifications-from-rails-app-on-heroku/
- http://www.raywenderlich.com/32960/apple-push-notification-services-in-ios-6-tutorial-part-1
- https://rawgit.com/Pushwoosh/pushwoosh-phonegap-3.0-plugin/master/Documentation/files/PushNotification-js.html#PushNotification.startLocationTracking
- http://developer.android.com/design/patterns/notifications.html
- http://www.accengage.com/push-notification-formats/