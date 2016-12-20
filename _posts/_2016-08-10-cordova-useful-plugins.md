---
layout: post
title: Most Useful Cordova Plugins for mobile App 
categories: [Cordova]
tags: [plugins, phonegap]
author:
  name: Victor Dias
  email: victor.dias@meumobi.com
  github: elbidone
  twitter: meumobi
  bio: Sharing mobile Experiences
  email_md5: 1cd012be2382e755aa763c66acc7cfa6
---

# cordova-open
[cordova-open](https://www.npmjs.com/package/cordova-open): Open audio, video, images and more with applications installed on the user's device.

```javascript
// Get full path of file as param
// ex: file:/storage/sdcard/DCIM/Camera/1404177327783.jpg
function openMedia(media) {
	deviceReady(function() {
		var open = cordova.plugins.disusered.open;
		var path = null;



		var success = function(fileEntry) {
			$log.debug("window.resolveLocalFileSystemURL Success");
			$log.debug(fileEntry);
			open(fileEntry.nativeURL, function(e) {console.log(e)}, openError);
		}
		
		var error = function(e) {
			$log.debug(e);
			// TODO : disclaimer
		}
		
		var openError = function(code) {
			if (code === 1) {
				$log.debug('No file handler found');
			} else {
				$log.debug('Undefined error');
			}
		}
		window.resolveLocalFileSystemURL(media.path, success, error);
	});
}
```


# cordova-plugin-apprate

## Setup and call
```javascript
AppRate.preferences.storeAppURL = {
  ios: '<my_app_id>',
  android: 'market://details?id=<package_name>'
};

AppRate.promptForRating();
```

## Set custom language

```javascript
AppRate.preferences.useLanguage = '<lang>';
```

# cordova-plugin-x-socialsharing
It's recommended to use shareWithOptions as it's the most feature rich way to share stuff cross-platform. It will also tell you if sharing to an app completed and which app that was (if that app plays nice, that is).

```javascript
// this is the complete list of currently supported params you can pass to the plugin (all optional)
var options = {
  message: 'share this', // not supported on some apps (Facebook, Instagram)
  subject: 'the subject', // fi. for email
  files: ['', ''], // an array of filenames either locally or remotely
  url: 'https://www.website.com/foo/#bar?a=b',
  chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
}

var onSuccess = function(result) {
  console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
  console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
}

var onError = function(msg) {
  console.log("Sharing failed with message: " + msg);
}

window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);
```

# cordova-plugin-x-toast
Show a native Toast (a little text popup) on iOS and Android.

```javascript
var toast = window.plugins && window.plugins.toast;
if (toast) {
  toast.showLongBottom(message,
  	function(resp) {
  		if (success) {
  			success(resp);
  		}
  	},
  	function(err) {
  		if (fail) {
  			fail(err);
  		}
  	}
  );
}
```

# cordova-plugin-dialogs
This plugin provides access to some native dialog UI elements via a global navigator.notification object.

## Methods

navigator.notification.alert
navigator.notification.confirm
navigator.notification.prompt
navigator.notification.beep