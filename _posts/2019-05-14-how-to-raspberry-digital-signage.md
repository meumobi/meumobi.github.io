---
layout: post
title: How to setup Chromium on Raspberry for Digital Signage
categories: [How To]
tags: [tutorial,raspberry,chromium,digital-signage,tv]
author:
  name: Daniel Antonio Conte
  email: danconte72@gmail.com
  github: danconte72
  twitter: danielconte
  bio: Life, Universe, Everything
  email_md5: 8200df29874231d4d8c2c7beae170b31
---

We’ve been working with Raspberry Pi in order to offer a TV extension of our services.
This post is one of a series which shows how we did.

## What do you need? ##

- Raspberry Pi Board - 2 or 3
  - Wired Network Connection for 2
  - Wireless/Wired Network Connection for 3
- Micro SD Card - class 10 or faster
- USB Keyboard
- HDMI Cable and a Monitor/TV
- PC with SD Card reader
- Curiosity :p

## Install OS ##

We just want instal the bare necessary to works so we choose Raspbian Lite:
1. Download Image - [here](https://www.raspberrypi.org/downloads/raspbian/)
2. Download Etcher - [here](https://www.balena.io/etcher/)
3. Use Etcher to flash Image on SD

## Setup Auto Login ##

Assemble all pieces and turn it on!
Log in.
Login: pi 
Password: raspberry
```bash
$ sudo raspi-config
```
- Boot Options > Desktop / CLI > Console Autologin 
- Select Finish, and Reboot the pi.

## Setup SSH (optional) ##

The following instructions can be put either raspberry directly or SSH. I do prefer SSH because is easier to copy/paste commands.
```bash
$ sudo raspi-config
```
- Interfacing Options > SSH > Yes
```bash
$ ifconfig
```
Get ip address and access through ssh from another PC 
```bash
$ ssh pi@[rasp.ip.add.ress]
```

## Install Chromium ##
```bash
$ sudo apt-get update
$ sudo apt-get upgrade
$ sudo apt-get install --no-install-recommends xserver-xorg x11-xserver-utils xinit openbox
$ sudo apt-get install --no-install-recommends chromium-browser
```

## Config Kiosk ##
```bash
$ nano /etc/xdg/openbox/autostart
```
> /etc/xdg/openbox/autostart
```
xset s off
xset s noblank
xset -dpms

# Allow quitting the X server with CTRL-ATL-Backspace
setxkbmap -option terminate:ctrl_alt_bksp

# Start Chromium in kiosk mode
sed -i 's/"exited_cleanly":false/"exited_cleanly":true/' ~/.config/chromium/'Local State'
sed -i 's/"exited_cleanly":false/"exited_cleanly":true/; s/"exit_type":"[^"]\+"/"exit_type":"Normal"/' ~/.config/chromium/Default/Preferences
chromium-browser --disable-infobars --kiosk 'https://mmb-lottie-performance.stackblitz.io/'
```
Test
```bash
startx -- -nocursor
```

## Config autostart ##
```bash
...
```



