
Example file download and open in Cordova inAppBrowser
https://gist.github.com/devgeeks/4982983

file-opener doesn't support iOS
http://community.phonegap.com/nitobi/topics/file_download_not_working_properly_on_ios
https://github.com/pwlin/cordova-plugin-file-opener2


Use QuickLook to handle Documents on iOS
	https://build.phonegap.com/plugins/696
	https://www.youtube.com/watch?v=rzJgfhiVLzY
	https://developer.apple.com/library/ios/documentation/NetworkingInternet/Reference/QLPreviewController_Class/index.html#//apple_ref/occ/cl/QLPreviewController
	http://fr.slideshare.net/robby_brown/quick-look-for-s

HazelnutOpen(url, filename, successCallback, errorCallback)

"On iOS when you use _system, it try to open the url you pass with safari. As iOS have sandbox access limitations, safari can't open the url because it's inside your app sandbox."
http://stackoverflow.com/questions/26377829/opening-a-local-file-with-inappbrowser-under-ios-doesnt-work

app/directives/downloadFile.js
app/services/downloadFiles.js

app/controllers/files_controller.js