[FileSystem API only available for Chrome and Opera](http://caniuse.com/#search=FileSystem)


It’s handy to open the filesystem: URL for the root DirectoryEntry of your app’s origin: `filesystem:http://0.0.0.0:8000/temporary/imgcache/`

chrome://settings/cookies
This page allows you to nuke the data stored for an origin. It’s an all or nothing thing. You can’t remove just one file or pieces of data.

https://developers.google.com/web/updates/2011/08/Debugging-the-Filesystem-API


http://answer199.diary.to/archives/1038961843.html

> Chrome DevTools now has support for the Filesystem API for viewing the files stored under an origin. To use that, you will need to enable the Developer Tools experiments in about:flags, restart, hit the gear in the devtools (lower right corner), and enable the 'FileSystem inspection' under the experimental tab.

I've tried but found it...

Google Chrome Extension: https://chrome.google.com/webstore/detail/html5-filesystem-explorer/chkmbbajnboncdmkigkgpjdhppcjhlcc


# Cordova File Plugin 1.0.0 introduces cdvfile: URL scheme
[org.apache.cordova.file@1.0.0](http://cordova.apache.org/news/2014/02/10/plugins-release.html) has been revamped to use a new URL scheme `cdvfile://localhost/<filesystemType>/<path to file>`. These URLs are generated by all file operations, and are passed over the bridge to native code. (This is in contrast to the previous version, which passed around absolute paths on the device filesystem).

Most of these changes are to bring us more in line with the HTML Filesystem standard, although they will also allow us to extend the filesystem abstraction to cover new kinds of storage, both internal and external to devices.

# iOS filesystem root location
There should be a single preference in config.xml for iOS persistent files. It can take one of two values (currently; additional values may be added later if we have better ideas)

```xml
<preference name="iosPersistentFileLocation" value="Compatibility" /> (Old location)

<preference name="iosPersistentFileLocation" value="Library" /> (New location)
```

"Library" will put persistent files under `<Application Library Path>/files` – the extra `/files` means that other filesystem plugins can register roots at different places under `<Application Library Path>` which will not be visible to one another.

Source: https://issues.apache.org/jira/browse/CB-5915

# Android filesystem root location

See http://developer.android.com/guide/topics/data/data-storage.html for a good explanation of the properties of various storage locations.
There should be a single preference in config.xml for Android persistent files. It can take one of two values (currently; additional values may be added later if we have better ideas)

```xml
<preference name="AndroidPersistentFileLocation" value="Compatibility" /> (Old location logic)

<preference name="AndroidPersistentFileLocation" value="Internal" /> (New location)
```

"`Internal`" will put persistent files under the user's application internal storage directory `Activity.getFilesDir() + "/files"` – the extra `/files` means that other filesystem plugins can register roots at different places under `getFilesDir()` which will not be visible to one another.

See https://issues.apache.org/jira/browse/CB-5916


From Cordova Android 4.x. The [whitelist plugin](https://cordova.apache.org/docs/en/6.x/reference/cordova-plugin-whitelist/) is mandatory to be able to connect to internet. 