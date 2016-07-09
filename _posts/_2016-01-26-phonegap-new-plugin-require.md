Cordova has replaced the window.plugins with the function cordova.require() You need to look for the namespace in which the plugin is defined. For pushwoosh it's: "com.pushwoosh.plugins.pushwoosh.PushNotification"

So instead of:

var PushNotification = window.plugins.PushNotification;
try this:

var PushNotification = cordova.require("com.pushwoosh.plugins.pushwoosh.PushNotification");
