# Why wkwebview is a big deal
http://developer.telerik.com/featured/why-ios-8s-wkwebview-is-a-big-deal-for-hybrid-development/


# Install: cordova-plugin-wkwebview-engine
https://shazronatadobe.wordpress.com/
https://github.com/apache/cordova-plugin-wkwebview-engine
http://devgirl.org/2016/01/11/a-faster-hybrid-app-for-the-new-year

# Cordova WKWebView Polyfill Plugin
> Will hopefully cease to exist soon (when Apple releases a fixed WKWebView so Cordova can use it without the hacks I needed to apply).
[Cordova WKWebView Polyfill Plugin](https://www.npmjs.com/package/cordova-plugin-wkwebview)
http://devgirl.org/2014/11/10/boost-your-ios-8-mobile-app-performance-with-wkwebview/
http://plugins.telerik.com/cordova/plugin/wkwebview

# cordova-plugin-wkwebview-engine, how it works with Ionic 1.2
https://gist.github.com/mlynch/c63205f114def01ed0b9

# Limitations
If you are upgrading from UIWebView, please note the limitations of using WKWebView as outlined in our [issue tracker](https://issues.apache.org/jira/browse/CB-9982?jql=project%20%3D%20CB%20AND%20labels%20%3D%20wkwebview-known-issues)

# Compare
http://blog.initlabs.com/post/100113463211/wkwebview-vs-uiwebview

# Detect if page is loaded inside WKWebView in JavaScript 
the only HTML5 feature difference is IndexedDB support.
```javascript
if (window.indexedDB) { alert('WKWebView'); } else { alert('UIWebView'); }
``

http://stackoverflow.com/a/30495399/4982169
http://stackoverflow.com/questions/36477450/even-basic-ionic-project-with-cordova-wkwebview-engine-plugin-produces-white-scr

http://www.initlabs.com/projects/webview-app