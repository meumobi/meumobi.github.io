---
layout: post
title: How to optimize Chromium on Raspberry for Digital Signage
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
![Raspberry PI Assembled]({{ site.BASE_PATH}}/assets/media/rasp2-sidesblurred.jpg)
We’ve been working with Raspberry Pi in order to offer a TV extension of our services.
This post is one of a series which shows how we did.

In this article we will point some settings who can improve rendering performance on Chromium. 


## What do you need? ##
- A raspberry with chromium installed. [How to :)](http://meumobi.github.io/how%20to/2019/05/14/how-to-raspberry-digital-signage.html)

## How to mesure ##
In order to check if our hacks are working we need metrics.
We use these:
- [Monitoring Raspberry PI with RPi-Monitor](https://www.filipeflop.com/blog/monitorando-raspberry-pi-com-rpi-monitor/)
- [Analyzing Runtime Performance](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/)   
- [FPS Meter of rendering settings](https://developer.chrome.com/devtools/docs/rendering-settings#show-fps%20meter)

## Improvements ##
### Enable Hardware Acceleration ###
- Access `chrome://settings/` 
- On Advanced>System set [Use hardware acceleration when available](https://www.lifewire.com/hardware-acceleration-in-chrome-4125122) 
- And click on `Restart`

### GPU Rasterization ###
- Access `chrome://flags/` 
- Set [GPU Rasterization](chrome://flags/#enable-gpu-rasterization) to `Force-enabled for all layers`
- And click on `Relaunch Now`

## Tests ##
Routine
1. Access [https://mmb-lottie-performance.stackblitz.io/](https://mmb-lottie-performance.stackblitz.io/).
2. Turn on [FPS Meter](https://developer.chrome.com/devtools/docs/rendering-settings#show-fps%20meter)
3. Select Modern with Fonts
4. Toggle Play/Stop
5. Wait to complete first loop
6. Start [Record profile](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/) when second loop starts
7. Stop [Record profile](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/)
8. Save Profile...

The results are
### Before Improvements ###
[Profile](https://drive.google.com/open?id=1n4prcSys4z86R3GNEtAEa0YYZOmtaJIC)
![Before]({{ site.BASE_PATH}}/assets/media/before.png )
### After Improvements ###
[Profile](https://drive.google.com/open?id=1e7pK8ZiVYYRb293qJFcZoW4sXqHz8bK6)
![After]({{ site.BASE_PATH}}/assets/media/after.png)

## Furthermore ##
We've tested the following tips, but for our case, with a lot of SVG animations, to force Rasterization brougth to us the best performance.
- [How to Turn Hardware Acceleration On and Off in Chrome](https://www.lifewire.com/hardware-acceleration-in-chrome-4125122)
- [[HowTo!] Smooth youtube 1080p in Chromium](https://www.raspberrypi.org/forums/viewtopic.php?t=199543#p1316451)
- [How to enable hardware graphics acceleration on RPi 2 and RPi 3](https://docs.eltechs.com/install-and-configure-exagear-desktop/hardware-graphics-acceleration-on-rpi)
- [Trying out OpenGL on Raspberry Pi 3](http://www.raspberryconnect.com/gamessoftware/item/314-trying_out_opengl_on_raspberry_pi_3)
