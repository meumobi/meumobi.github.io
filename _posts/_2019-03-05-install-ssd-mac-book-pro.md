---
layout: post
title: 'How to install an SSD with OS X El Capitan on a MacBook Pro'
categories: [macOS]
tags: [SSD, MacBook]
author:
  name: Victor Dias
  email: victor.dias@meumobi.com
  github: elbidone
  twitter: meumobi
  bio: Sharing mobile Experiences
  email_md5: 1cd012be2382e755aa763c66acc7cfa6
---

## Create a bootable installer

You can use an external drive or secondary volume as a startup disk from which to install the Mac operating system.

MacBook Pro (13-inch, Mid 2009)
Processor 2.26 GHz Intel Core 2 Duo
Memory 6 GB 1067 MHz DDR3
Graphics NVIDIA GeForce 9400M 256 MB

### Download a macOS installer

[OS X El Capitan](https://itunes.apple.com/app/os-x-el-capitan/id1147835434?ls=1&mt=12) remains available for Mac computers that can't upgrade to macOS Mojave, High Sierra, or Sierra, or that need to upgrade to El Capitan first.

- [Check compatibility with OS X El Capitan](https://support.apple.com/en-us/HT206886#requirements)
- [Check compatibility with OS X Mojave](https://support.apple.com/en-us/HT201475)
- [Check compatibility with OS X High Sierra](https://support.apple.com/en-us/HT208969)

When the macOS installer opens, quit it without continuing installation.
Find the installer in your Applications folder as a single ”Install OS X El Capitan” file.

### Format USB Flash drive as OS X Extended

1. Connect a USB flash drive or other volume you're using for the bootable installer. Make sure that it has at least 12GB of available storage
1. Open 'Disk Utility'.
2. Click on 'Erase' and select 'OS X Extended (journaled)' as 'Format', then click on 'Erase' button

### Use the 'createinstallmedia' command in Terminal
1. Open Terminal, which is in the Utilities folder of your Applications folder.
2. Type or paste following command in Terminal. This assume that the installer is still in your Applications folder, and MyVolume is the name of the USB flash drive or other volume you're using. If it has a different name, replace `MyVolume` accordingly.

`sudo /Applications/Install\ OS\ X\ El\ Capitan.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume --applicationpath /Applications/Install\ OS\ X\ El\ Capitan.app`

3. Press Return after typing the command.
4. When prompted, type your administrator password and press Return again. Terminal doesn't show any characters as you type your password.
5. When prompted, type Y to confirm that you want to erase the volume, then press Return. Terminal shows the progress as the bootable installer is created.  

```
$ sudo /Applications/Install\ OS\ X\ El\ Capitan.app/Contents/Resrces/createinstallmedia --volume /Volumes/
GoogleDrive/        Install el Capitan/ Macintosh HD/       
victors-MBP-2:ion-employee victor$ sudo /Applications/Install\ OS\ X\ El\ Capitan.app/Contents/Resources/createinstallmedia --volume /Volumes/Install\ el\ Capitan/ --applicationpath /Applications/Install\ OS\ X\ El\ Capitan.app/
Password:
Ready to start.
To continue we need to erase the disk at /Volumes/Install el Capitan/.
If you wish to continue type (Y) then press return: y
Erasing Disk: 0%... 10%... 20%... 30%...100%...
Copying installer files to disk...
Copy complete.
Making disk bootable...
Copying boot files...
Copy complete.
Done.
$
```

6. When Terminal says that it's done, the volume will have the same name as the installer you downloaded, such as Install macOS Mojave. You can now quit Terminal and eject the volume.

## Use the bootable installer

I recommend to connect to internet (wifi, ethernet or any other), this should make updates required, incl. datetime.
If raises "This copy of the Install OS X El Capitan application can't be verified. It may have been corrupted or tampered with during downloading" then check [here](https://apple.stackexchange.com/questions/216730/this-copy-of-the-install-os-x-el-capitan-application-cant-be-verified-it-may-h) how to solve it.


https://www.youtube.com/watch?v=hcLnUptxmec

- [How to create a bootable installer for macOS](https://support.apple.com/en-us/HT201372)
