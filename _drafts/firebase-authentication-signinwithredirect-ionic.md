Firebase auth to sign-in with redirect (OAuth)
Ionic 4 Firebase Auth signInWithRedirect()
Cordova Oauth Google SignInWithRedirect


[Authenticate Using OAuth Providers with Cordova](https://firebase.google.com/docs/auth/web/cordova)


> There is a known issue in some iOS versions where if Cordova uses localhost instead of a file environment to serve the files, it stops working. The reason is because for localhost it is treated as a regular browser app, whereas in a file environment with cordova enabled, it relies on the Cordova plugins documented. This is likely the reason why this is happening. To get it to work at the moment, you need to make sure your Cordova app serves from a file:// environment instead of localhost. You may need to downgrade to an older version until this is fixed.

This was an issue for iOS only. It seems like Android now uses localhost too for some new versions of Cordova/Ionic.

[firebaseui-web/issues#521](https://github.com/firebase/firebaseui-web/issues/521)


> Add on config.xml `<allow-navigation href="http://*" />`
Add on config.xml `<preference name="CordovaWebViewEngine" value="CDVUIWebViewEngine" />`

Source: https://stackoverflow.com/questions/48314299/firebase-social-login-not-redirected-to-the-app-ionic-3-ios/53566771#53566771


> It appears that Ionic Webview has changed and it's not possible to use signInWithRedirect on Android as it's now serving content from an integrated http server, at http://localhost:8080 instead of using file:// as previously. 

Source: https://github.com/firebase/firebase-js-sdk/issues/1244

https://stackoverflow.com/a/57035022/4982169

> It happens because the app should watch the link redirected. Because the signInWithRedirect method redirect to link registered at the Firebase console. So, you'll need a trick to watch the browser if the current URL is the redirect_uri registered.

The way to that is explained here. Basically you should install the Universal Links and some other Cordova Plugins.

Source: https://stackoverflow.com/a/53917269/4982169

https://angularfirebase.com/lessons/ionic-google-login-with-firebase-and-angularfire/