# Android: adb logcat

https://www.thepolyglotdeveloper.com/2014/12/debugging-android-source-code-adb/

`adb -s <DEVICEID> logcat CordovaLog:D \*:S`
	
'-s' addresses a specific device if you have multiple devices connected to your computer (find the id with 'adb devices').
Obs: Maybe should to remove the '\' from '\*:S'

## Android device does not show up in adb list

1.turn on developer options in android phone. 
2.enable check box for stay awake.
3.enable check box for USB debugging.
do all the above steps after connecting mobile to usb.

4.open cmd
5.got to platform tools like D:\adt-bundle-windows-x86_64-20140702\adt- bundle-windows-x86_64-20140702\sdk\platform-tools.
5. adb kill-server
6. adb start-server
7. adb devices
Now we can see attached devices .
Source: http://stackoverflow.com/questions/21170392/android-device-does-not-show-up-in-adb-list

## adb Android device unauthorized

It's likely that the device is no longer authorized on ADB for whatever reason. If the device is shown as unauthorized, go to the developer options on the phone and click "Revoke USB debugging authorization" (tested with JellyBean & Samsung GalaxyIII). The device will ask if you are agree to connect the computer id

Source: http://stackoverflow.com/questions/23081263/adb-android-device-unauthorized