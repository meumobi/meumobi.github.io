---
layout: post
title: Open File in PhoneGap/Cordova App 
categories: [PhoneGap]
tags: [Cordova, plugins]
author:
  name: Victor Dias
  email: victor.dias@meumobi.com
  github: elbidone
  twitter: meumobi
  bio: Sharing mobile Experiences
  email_md5: 1cd012be2382e755aa763c66acc7cfa6
---

If you've tried once to open file or play media on Cordova/PhoneGap App you certainly have faced "strange" issues or behaviors. The web is full of [bad experiences](https://www.raymondcamden.com/2016/06/26/linking-to-pdfs-in-cordova-apps/) looking for a "simple way" to open file. Seems standard but it's not, and there's none quick and ready solution or lib to achieve it.
I'll resume on this post the issues I've faced and how I've done to make it happen, from the the download of remote file till opening it on device.

# File API
First of all is the File API introduced by [cordova-plugin-file]. This plugin implements a File API allowing read/write access to files residing on the device. This plugin is based on several specs, including : The [HTML5 File API](http://www.w3.org/TR/FileAPI/). 

This plugin defines global cordova.file object.
Although in the global scope, it is not available until after the deviceready event.

I recommend you to read [CORDOVA FILE PLUGIN EXAMPLES](https://www.neontribe.co.uk/cordova-file-plugin-examples/) to dive deeper on File API, but to resume I'll share below the main piece of code you'll need to handle a File on your device FileSystem:

```javascript
window.resolveLocalFileSystemURL(
  path, 
  function (entry) {
    ...
  }, 
  function (err) {
    $log.debug(err);
  }
);
```

# Get mime-type
Before open file you'd probably like to know its mime-type, to play an audio or video on its html5 element within your App for example. You can also choose to display different labels or icons for pdf, audio, excel, etc.
Then, to do it with File API it's easy as described below: 

```javascript
window.resolveLocalFileSystemURL(
  path, 
  function (entry) {
    entry.file(function(file) {
      var s = "";
      s += "<b>name:</b> " + file.name + "<br/>";
      s += "<b>localURL:</b> " + file.localURL + "<br/>";
      s += "<b>type:</b> " + file.type + "<br/>";
      s += "<b>lastModifiedDate:</b> " + (new Date(file.lastModifiedDate)) + "<br/>";
      s += "<b>size:</b> " + file.size + "<br/>"; 
      document.querySelector("#status").innerHTML = s;
    });
  }, 
  function (err) {
    $log.debug(err);
  }
);
```

As you can see, same function return several useful properties, as size, name and type.
The example above has been published on [Raymond Camden previous post](https://www.raymondcamden.com/2014/08/18/PhoneGapCordova-Example-Getting-File-Metadata-and-an-update-to-the-FAQ/).

It's **important to mention that API only provide mime-type as result if file has an extension**. Without extension it should returns `null`.
 
# Open File
## Available Plugins

||iOS|Android|Local File|Remote File|Observation|
|---|---|---|---|---|
|[cordova-plugin-file-opener2]|[UIDocumentInteractionController](https://developer.apple.com/reference/uikit/uidocumentinteractioncontroller) presentOptionsMenu|||mime-type required|
|[DocumentHandler]|[Quick Look preview]|||
|[cordova-open]|[Quick Look preview]||extension required|

* [DocumentHandler]: A phonegap plugin to handle documents loaded from a URL. The plugin exposes one method on the window object: `handleDocumentWithURL(successHandler, failureHandler, url)`
* [cordova-open]: Open audio, video, images and more with applications installed on the user's device. The plugin exposes the following methods: `cordova.plugins.disusered.open(file, success, error, trustAllCertificates)`
* [cordova-plugin-file-opener2]: open a file on your device file system with its default application.


[DocumentHandler]: https://github.com/ti8m/DocumentHandler
[cordova-open]: https://www.npmjs.com/package/cordova-open
[Quick Look preview]: https://developer.apple.com/reference/quicklook/qlpreviewcontroller#overview 
[cordova-plugin-file-opener2]: https://www.npmjs.com/package/cordova-plugin-file-opener2
[cordova-plugin-file]: https://www.npmjs.com/package/cordova-plugin-file