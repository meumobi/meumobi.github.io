---
layout: post
title: How to use and optimize Pi Signage
categories: [How To]
tags: [tutorial,raspberry,pi-signage,digital-signage]
author:
  name: Daniel Antonio Conte
  email: danconte72@gmail.com
  github: danconte72
  twitter: danielconte
  bio: Life, Universe, Everything
  email_md5: 8200df29874231d4d8c2c7beae170b31
---
We've testing some solutions to use Raspberry Pi boards for digital Signage.
So far [Pi-Signage](https://github.com/colloqi/piSignage) became a good anwser for our case. The goal is show a webpage with Content on a TV with remote management.

## Setup
### On raspberry
1. Download the image [here](https://drive.google.com/file/d/1auC4LcO-z9md4XtdfXOiDS-atF3jZYkd/view)
2. Burn into your SD using [etcher](https://www.balena.io/etcher/)
3. Assemble SD, HDMI, Powere supply and turn it on! (It will restart sometimes)
4. There will be showed a **Player Id** (it is unique based on your hardware)
#### Network
Connect your board do the network
1. Wired - plug the cable and play
2. Wireless -  plug a keyboard, press F6 and follow the prompt instructions

### On pi-signage platform
1. Create/Login on [pisignage.com](https://pisignage.com/)
2. On Groups, create a Group
3. On Players, Register a Player using the **Player Id** got and set the Group you have created
4. On Assets, add a new Asset->Add a Link, choose Type->Web Link, and set your Content URL
5. On Playlists, create a new, then on Assets list check the asset created before, set how many seconds the item will be show on the screen, I've set 7200 (two hours)
6. On Playlists, click on deploy, chose the group then on Deploy
7. Done! Your web will be showed on your tv screen

## Optimizing
In order to control the device remotely, Pisignage allows SSH access for players.
Just go to Players and click on **">_"** button on players list. You can Execute terminal commands, take snapshots, and turn On/Off the tv.
For our case we got a better performance reseting the config.txt. To do this, execute `$ sudo mv /boot/config.txt.orig /boot/config.txt | sudo reboot`

Pisignage use chromium-browser to show webpages, if you need set a chromium flag 
Edit the following file
`$ sudo nano /etc/chromium-browser/default`
Add the flag on *CHROMIUM_FLAGS=""*. I.e. `CHROMIUM_FLAGS="--ui-show-fps-counter"`
Save and reboot.

## Considerations
Pisignage is quite easy to setup, after this, it only needs to be conected.
So your client just need to plug the device on TV. All maitenance can be done remotely, as update Pisignage or modify content. Optimization and customization are not so easy, but possible. Set Wireless network is not user-friendly. 
The free plan allows to use 2 players, so you can test and validate easyly.
